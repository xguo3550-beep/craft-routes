import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServerClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id;
    const sessionId = session.metadata?.session_id;

    if (supabase && bookingId) {
      await supabase
        .from("bookings")
        .update({
          status: "paid",
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId);

      if (sessionId) {
        const { data: workshopSession } = await supabase
          .from("workshop_sessions")
          .select("spots_available, guests_count:bookings(guests_count)")
          .eq("id", sessionId)
          .single();

        if (workshopSession) {
          const guestsCount = parseInt(
            session.metadata?.guests_count ?? "1",
            10
          );
          await supabase
            .from("workshop_sessions")
            .update({
              spots_available: Math.max(
                0,
                workshopSession.spots_available - guestsCount
              ),
            })
            .eq("id", sessionId);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}

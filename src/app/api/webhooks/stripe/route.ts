import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase/server";
import { getSessionWithWorkshop } from "@/lib/data/workshops";
import { buildBookingEmailDetails } from "@/lib/email/build-booking-email";
import { sendBookingConfirmationEmail } from "@/lib/email/send-booking-confirmation";
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
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const bookingId = checkoutSession.metadata?.booking_id;
    const sessionId = checkoutSession.metadata?.session_id;
    const guestName = checkoutSession.metadata?.guest_name ?? "Guest";
    const guestEmail =
      checkoutSession.customer_email ??
      checkoutSession.customer_details?.email;
    const guestsCount = parseInt(
      checkoutSession.metadata?.guests_count ?? "1",
      10
    );

    if (supabase && bookingId) {
      await supabase
        .from("bookings")
        .update({
          status: "paid",
          stripe_payment_intent_id:
            typeof checkoutSession.payment_intent === "string"
              ? checkoutSession.payment_intent
              : checkoutSession.payment_intent?.id ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId);

      if (sessionId) {
        const { data: workshopSession } = await supabase
          .from("workshop_sessions")
          .select("spots_available")
          .eq("id", sessionId)
          .single();

        if (workshopSession) {
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

    if (sessionId && guestEmail && bookingId) {
      const sessionData = await getSessionWithWorkshop(sessionId);
      if (sessionData) {
        const { workshop, ...session } = sessionData;
        const details = buildBookingEmailDetails({
          bookingId,
          guestName,
          guestEmail,
          guestsCount,
          workshop,
          session,
          appUrl,
          paid: true,
        });
        await sendBookingConfirmationEmail(details);
      }
    }
  }

  return NextResponse.json({ received: true });
}

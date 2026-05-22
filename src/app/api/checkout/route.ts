import { NextRequest, NextResponse } from "next/server";
import { getSessionWithWorkshop } from "@/lib/data/workshops";
import { getStripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase/server";
import { buildBookingEmailDetails } from "@/lib/email/build-booking-email";
import { sendBookingConfirmationEmail } from "@/lib/email/send-booking-confirmation";

function successUrl(
  appUrl: string,
  params: Record<string, string>
): string {
  const qs = new URLSearchParams(params).toString();
  return `${appUrl}/booking/success?${qs}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, guestName, guestEmail, guestsCount } = body;

    if (!sessionId || !guestName || !guestEmail || !guestsCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sessionData = await getSessionWithWorkshop(sessionId);
    if (!sessionData) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const { workshop, ...session } = sessionData;

    if (session.spots_available < guestsCount) {
      return NextResponse.json(
        { error: "Not enough spots available" },
        { status: 400 }
      );
    }

    const totalCents = workshop.price_cents * guestsCount;
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
    const stripe = getStripe();
    const supabase = createServerClient();

    let bookingId = `mock-${Date.now()}`;

    if (supabase) {
      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          session_id: sessionId,
          workshop_id: workshop.id,
          guest_name: guestName,
          guest_email: guestEmail,
          guests_count: guestsCount,
          total_cents: totalCents,
          currency: workshop.currency,
          status: "pending",
        })
        .select("id")
        .single();

      if (error) {
        console.error("Booking insert error:", error);
      } else if (booking) {
        bookingId = booking.id;
      }
    }

    const emailDetails = buildBookingEmailDetails({
      bookingId,
      guestName,
      guestEmail,
      guestsCount: Number(guestsCount),
      workshop,
      session,
      appUrl,
      paid: false,
    });

    if (!stripe) {
      const emailResult = await sendBookingConfirmationEmail(emailDetails);

      return NextResponse.json({
        bookingId,
        emailSent: emailResult.sent,
        emailError: emailResult.error,
        url: successUrl(appUrl, {
          booking_id: bookingId,
          email: guestEmail,
          email_sent: emailResult.sent ? "true" : "false",
          payment: "demo",
          session_id: sessionId,
          guest_name: guestName,
          guests_count: String(guestsCount),
        }),
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: guestEmail,
      line_items: [
        {
          price_data: {
            currency: workshop.currency,
            product_data: {
              name: workshop.title,
              description: `Session on ${new Date(session.starts_at).toLocaleDateString("en-US", { timeZone: "Asia/Shanghai" })}`,
              images: [workshop.image_url],
            },
            unit_amount: workshop.price_cents,
          },
          quantity: guestsCount,
        },
      ],
      metadata: {
        booking_id: bookingId,
        session_id: sessionId,
        workshop_id: workshop.id,
        guests_count: String(guestsCount),
        guest_name: guestName,
      },
      success_url: successUrl(appUrl, {
        booking_id: bookingId,
        email: guestEmail,
        payment: "stripe",
        session_id: sessionId,
        guest_name: guestName,
        guests_count: String(guestsCount),
      }),
      cancel_url: `${appUrl}/workshops/${workshop.slug}`,
    });

    if (supabase && checkoutSession.id) {
      await supabase
        .from("bookings")
        .update({ stripe_checkout_session_id: checkoutSession.id })
        .eq("id", bookingId);
    }

    return NextResponse.json({ url: checkoutSession.url, bookingId });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSessionWithWorkshop } from "@/lib/data/workshops";
import { buildBookingEmailDetails } from "@/lib/email/build-booking-email";
import { sendBookingConfirmationEmail } from "@/lib/email/send-booking-confirmation";

/**
 * Sends (or re-sends) a booking confirmation email.
 * Used as backup after Stripe checkout when the webhook may still be processing.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      bookingId,
      sessionId,
      guestName,
      guestEmail,
      guestsCount,
    } = body;

    if (!bookingId || !sessionId || !guestName || !guestEmail || !guestsCount) {
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
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const details = buildBookingEmailDetails({
      bookingId,
      guestName,
      guestEmail,
      guestsCount: Number(guestsCount),
      workshop,
      session,
      appUrl,
      paid: body.paid === true,
    });

    const result = await sendBookingConfirmationEmail(details);

    return NextResponse.json({
      sent: result.sent,
      error: result.error,
    });
  } catch (err) {
    console.error("send-confirmation error:", err);
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}

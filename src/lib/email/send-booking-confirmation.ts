import { Resend } from "resend";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/brand";
import type { BookingEmailDetails } from "@/lib/email/types";

function buildHtml(details: BookingEmailDetails): string {
  const includesList = details.includes
    .map((item) => `<li>${item}</li>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #4a3728; max-width: 560px;">
  <h1 style="color: #166534;">Booking confirmed — ${SITE_NAME}</h1>
  <p>Hi ${details.guestName},</p>
  <p>Your spot is reserved for <strong>${details.workshopTitle}</strong>.</p>
  <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
    <tr><td style="padding: 8px 0; color: #6f5038;">Reference</td><td style="padding: 8px 0;"><strong>${details.bookingId}</strong></td></tr>
    <tr><td style="padding: 8px 0; color: #6f5038;">Date</td><td style="padding: 8px 0;">${details.sessionDate}</td></tr>
    <tr><td style="padding: 8px 0; color: #6f5038;">Time</td><td style="padding: 8px 0;">${details.sessionTime} (China time)</td></tr>
    <tr><td style="padding: 8px 0; color: #6f5038;">Location</td><td style="padding: 8px 0;">${details.workshopLocation}</td></tr>
    <tr><td style="padding: 8px 0; color: #6f5038;">Host</td><td style="padding: 8px 0;">${details.hostName}</td></tr>
    <tr><td style="padding: 8px 0; color: #6f5038;">Guests</td><td style="padding: 8px 0;">${details.guestsCount}</td></tr>
    <tr><td style="padding: 8px 0; color: #6f5038;">Total</td><td style="padding: 8px 0;"><strong>${details.totalFormatted}</strong></td></tr>
  </table>
  <h2 style="font-size: 16px; color: #166534;">What's included</h2>
  <ul>${includesList}</ul>
  <p style="margin-top: 24px;">We'll meet you at the location above. Bring comfortable clothes and your passport copy if required for registration.</p>
  <p>Questions? Reply to this email or contact <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
  <p style="color: #8b6544; font-size: 14px;">— ${SITE_NAME} · Dali & Sichuan experiences</p>
</body>
</html>`;
}

function buildText(details: BookingEmailDetails): string {
  return `Booking confirmed — ${SITE_NAME}

Hi ${details.guestName},

Your spot is reserved for ${details.workshopTitle}.

Reference: ${details.bookingId}
Date: ${details.sessionDate}
Time: ${details.sessionTime} (China time)
Location: ${details.workshopLocation}
Host: ${details.hostName}
Guests: ${details.guestsCount}
Total: ${details.totalFormatted}

What's included:
${details.includes.map((i) => `• ${i}`).join("\n")}

Questions? ${CONTACT_EMAIL}

— ${SITE_NAME}`;
}

export async function sendBookingConfirmationEmail(
  details: BookingEmailDetails
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? `${SITE_NAME} <onboarding@resend.dev>`;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping confirmation email");
    return { sent: false, error: "Email not configured" };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: details.guestEmail,
      subject: `Confirmed: ${details.workshopTitle} · ${details.sessionDate}`,
      html: buildHtml(details),
      text: buildText(details),
    });

    if (error) {
      console.error("Resend error:", error);
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    console.error("Email send failed:", err);
    return { sent: false, error: message };
  }
}

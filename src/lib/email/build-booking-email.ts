import type { Workshop } from "@/types";
import type { WorkshopSession } from "@/types";
import type { BookingEmailDetails } from "@/lib/email/types";
import { formatDate, formatPrice, formatTime } from "@/lib/format";

export function buildBookingEmailDetails(params: {
  bookingId: string;
  guestName: string;
  guestEmail: string;
  guestsCount: number;
  workshop: Workshop;
  session: WorkshopSession;
  appUrl: string;
  paid?: boolean;
}): BookingEmailDetails {
  const { bookingId, guestName, guestEmail, guestsCount, workshop, session, appUrl, paid } =
    params;

  return {
    bookingId,
    guestName,
    guestEmail,
    guestsCount,
    totalFormatted: formatPrice(workshop.price_cents * guestsCount, workshop.currency),
    workshopTitle: workshop.title,
    workshopLocation: workshop.location,
    hostName: workshop.host_name,
    sessionDate: formatDate(session.starts_at),
    sessionTime: formatTime(session.starts_at),
    durationHours: workshop.duration_hours,
    includes: workshop.includes,
    appUrl,
    paid,
  };
}

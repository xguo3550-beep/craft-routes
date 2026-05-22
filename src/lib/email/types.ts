export interface BookingEmailDetails {
  bookingId: string;
  guestName: string;
  guestEmail: string;
  guestsCount: number;
  totalFormatted: string;
  workshopTitle: string;
  workshopLocation: string;
  hostName: string;
  sessionDate: string;
  sessionTime: string;
  durationHours: number;
  includes: string[];
  appUrl: string;
  paid?: boolean;
}

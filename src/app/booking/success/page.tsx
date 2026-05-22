import { BookingSuccessContent } from "@/components/booking/BookingSuccessContent";

interface PageProps {
  searchParams: {
    booking_id?: string;
    session_id?: string;
    email?: string;
    email_sent?: string;
    email_error?: string;
    payment?: string;
    guest_name?: string;
    guests_count?: string;
  };
}

export default function BookingSuccessPage({ searchParams }: PageProps) {
  return (
    <BookingSuccessContent
      bookingId={searchParams.booking_id}
      email={searchParams.email}
      emailSentParam={searchParams.email_sent}
      emailError={searchParams.email_error}
      payment={searchParams.payment}
      sessionId={searchParams.session_id}
      guestName={searchParams.guest_name}
      guestsCount={searchParams.guests_count}
    />
  );
}

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
    workshop_title?: string;
    workshop_slug?: string;
    session_date?: string;
    session_time?: string;
    location?: string;
    region?: string;
    total?: string;
    host_name?: string;
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
      workshopTitle={searchParams.workshop_title}
      workshopSlug={searchParams.workshop_slug}
      sessionDate={searchParams.session_date}
      sessionTime={searchParams.session_time}
      location={searchParams.location}
      region={searchParams.region}
      total={searchParams.total}
      hostName={searchParams.host_name}
    />
  );
}

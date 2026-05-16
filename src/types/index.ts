export type Region = "dali" | "sichuan";

export type BookingStatus = "pending" | "paid" | "cancelled" | "refunded";

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  region: Region;
  location: string;
  duration_hours: number;
  max_participants: number;
  price_cents: number;
  currency: string;
  image_url: string;
  gallery_urls: string[];
  highlights: string[];
  includes: string[];
  host_name: string;
  host_bio: string;
  language: string;
  featured: boolean;
  created_at: string;
}

export interface WorkshopSession {
  id: string;
  workshop_id: string;
  starts_at: string;
  ends_at: string;
  spots_available: number;
  created_at: string;
}

export interface Booking {
  id: string;
  session_id: string;
  workshop_id: string;
  guest_name: string;
  guest_email: string;
  guests_count: number;
  total_cents: number;
  currency: string;
  status: BookingStatus;
  stripe_checkout_session_id: string | null;
  created_at: string;
}

export interface WorkshopWithSessions extends Workshop {
  sessions: WorkshopSession[];
}

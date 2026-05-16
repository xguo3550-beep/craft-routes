-- Workshops marketplace schema for Dali & Sichuan

create type region as enum ('dali', 'sichuan');
create type booking_status as enum ('pending', 'paid', 'cancelled', 'refunded');

create table workshops (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  long_description text not null,
  region region not null,
  location text not null,
  duration_hours integer not null,
  max_participants integer not null default 12,
  price_cents integer not null,
  currency text not null default 'usd',
  image_url text not null,
  gallery_urls text[] default '{}',
  highlights text[] default '{}',
  includes text[] default '{}',
  host_name text not null,
  host_bio text not null,
  language text not null default 'English',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table workshop_sessions (
  id uuid primary key default gen_random_uuid(),
  workshop_id uuid not null references workshops(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  spots_available integer not null,
  created_at timestamptz not null default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references workshop_sessions(id) on delete restrict,
  workshop_id uuid not null references workshops(id) on delete restrict,
  guest_name text not null,
  guest_email text not null,
  guests_count integer not null default 1 check (guests_count > 0),
  total_cents integer not null,
  currency text not null default 'usd',
  status booking_status not null default 'pending',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_workshops_region on workshops(region);
create index idx_workshops_slug on workshops(slug);
create index idx_sessions_workshop on workshop_sessions(workshop_id);
create index idx_sessions_starts_at on workshop_sessions(starts_at);
create index idx_bookings_session on bookings(session_id);
create index idx_bookings_stripe on bookings(stripe_checkout_session_id);

alter table workshops enable row level security;
alter table workshop_sessions enable row level security;
alter table bookings enable row level security;

create policy "Public read workshops"
  on workshops for select using (true);

create policy "Public read sessions"
  on workshop_sessions for select using (true);

create policy "Service role manages bookings"
  on bookings for all using (true);

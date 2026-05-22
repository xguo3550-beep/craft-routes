-- Profiles, host ownership, customer bookings

create type user_role as enum ('customer', 'host');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  role user_role not null,
  host_display_name text,
  host_bio text,
  created_at timestamptz not null default now()
);

alter table workshops add column host_user_id uuid references profiles(id) on delete set null;
alter table bookings add column customer_user_id uuid references profiles(id) on delete set null;
alter table bookings add column notes text;

create index idx_workshops_host on workshops(host_user_id);
create index idx_bookings_customer on bookings(customer_user_id);

-- Auto-create profile on signup (role from user metadata)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, host_display_name, host_bio)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'customer'),
    new.raw_user_meta_data->>'host_display_name',
    new.raw_user_meta_data->>'host_bio'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table profiles enable row level security;

create policy "Users read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update using (auth.uid() = id);

-- Workshops: public read; hosts manage their own
drop policy if exists "Public read workshops" on workshops;

create policy "Public read workshops"
  on workshops for select using (true);

create policy "Hosts insert own workshops"
  on workshops for insert
  with check (auth.uid() = host_user_id);

create policy "Hosts update own workshops"
  on workshops for update
  using (auth.uid() = host_user_id);

create policy "Hosts delete own workshops"
  on workshops for delete
  using (auth.uid() = host_user_id);

-- Sessions: public read; hosts manage via workshop ownership
drop policy if exists "Public read sessions" on workshop_sessions;

create policy "Public read sessions"
  on workshop_sessions for select using (true);

create policy "Hosts manage sessions"
  on workshop_sessions for all
  using (
    exists (
      select 1 from workshops w
      where w.id = workshop_id and w.host_user_id = auth.uid()
    )
  );

-- Bookings: customers see/update own; hosts see bookings for their workshops
drop policy if exists "Service role manages bookings" on bookings;

create policy "Customers read own bookings"
  on bookings for select
  using (auth.uid() = customer_user_id);

create policy "Hosts read workshop bookings"
  on bookings for select
  using (
    exists (
      select 1 from workshops w
      where w.id = workshop_id and w.host_user_id = auth.uid()
    )
  );

create policy "Anyone can insert booking"
  on bookings for insert
  with check (true);

create policy "Customers update own bookings"
  on bookings for update
  using (auth.uid() = customer_user_id);

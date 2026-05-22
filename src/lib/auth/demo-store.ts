import type { Booking, Workshop, WorkshopSession } from "@/types";
import type { SessionUser, UserRole } from "@/lib/auth/types";

interface DemoUser extends SessionUser {
  password: string;
}

type GlobalDemo = {
  users: Map<string, DemoUser>;
  workshops: Map<string, Workshop>;
  sessions: Map<string, WorkshopSession>;
  bookings: Map<string, Booking>;
};

function store(): GlobalDemo {
  const g = globalThis as unknown as { __crDemo?: GlobalDemo };
  if (!g.__crDemo) {
    g.__crDemo = {
      users: new Map(),
      workshops: new Map(),
      sessions: new Map(),
      bookings: new Map(),
    };
  }
  return g.__crDemo;
}

export function demoRegister(
  email: string,
  password: string,
  fullName: string,
  role: UserRole,
  hostDisplayName?: string,
  hostBio?: string
): { user?: SessionUser; error?: string } {
  const s = store();
  const key = email.toLowerCase();
  if (s.users.has(key)) {
    return { error: "An account with this email already exists" };
  }
  const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const user: DemoUser = {
    id,
    email: key,
    fullName,
    role,
    hostDisplayName,
    hostBio,
    password,
  };
  s.users.set(key, user);
  const { password: _, ...session } = user;
  return { user: session };
}

export function demoLogin(
  email: string,
  password: string
): { user?: SessionUser; error?: string } {
  const u = store().users.get(email.toLowerCase());
  if (!u || u.password !== password) {
    return { error: "Invalid email or password" };
  }
  const { password: _, ...session } = u;
  return { user: session };
}

export function demoGetUserById(id: string): SessionUser | null {
  for (const u of store().users.values()) {
    if (u.id === id) {
      const { password: _, ...session } = u;
      return session;
    }
  }
  return null;
}

export function demoHostWorkshops(hostId: string): Workshop[] {
  return [...store().workshops.values()].filter((w) => (w as Workshop & { host_user_id?: string }).host_user_id === hostId);
}

export function demoUpsertWorkshop(workshop: Workshop): Workshop {
  store().workshops.set(workshop.id, workshop);
  return workshop;
}

export function demoDeleteWorkshop(id: string, hostId: string): boolean {
  const w = store().workshops.get(id);
  if (!w || (w as Workshop & { host_user_id?: string }).host_user_id !== hostId) return false;
  store().workshops.delete(id);
  for (const [sid, sess] of store().sessions) {
    if (sess.workshop_id === id) store().sessions.delete(sid);
  }
  return true;
}

export function demoWorkshopById(id: string): Workshop | null {
  return store().workshops.get(id) ?? null;
}

export function demoSessionsForWorkshop(workshopId: string): WorkshopSession[] {
  return [...store().sessions.values()]
    .filter((s) => s.workshop_id === workshopId)
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
}

export function demoUpsertSession(session: WorkshopSession): WorkshopSession {
  store().sessions.set(session.id, session);
  return session;
}

export function demoDeleteSession(id: string, hostId: string): boolean {
  const sess = store().sessions.get(id);
  if (!sess) return false;
  const w = store().workshops.get(sess.workshop_id);
  if (!w || (w as Workshop & { host_user_id?: string }).host_user_id !== hostId) return false;
  store().sessions.delete(id);
  return true;
}

export function demoCustomerBookings(customerId: string, email: string): Booking[] {
  return [...store().bookings.values()].filter(
    (b) =>
      (b as Booking & { customer_user_id?: string }).customer_user_id === customerId ||
      b.guest_email.toLowerCase() === email.toLowerCase()
  );
}

export function demoUpsertBooking(booking: Booking): Booking {
  store().bookings.set(booking.id, booking);
  return booking;
}

export function demoBookingById(id: string): Booking | null {
  return store().bookings.get(id) ?? null;
}

export function demoAllHostWorkshopsForPublic(): Workshop[] {
  return [...store().workshops.values()];
}

export function demoAllSessions(): WorkshopSession[] {
  return [...store().sessions.values()];
}

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { Booking, Workshop, WorkshopSession } from "@/types";
import type { SessionUser, UserRole } from "@/lib/auth/types";

export interface PersistedDemoUser extends SessionUser {
  password: string;
}

interface PersistedDemoStore {
  users: PersistedDemoUser[];
  workshops: Workshop[];
  sessions: WorkshopSession[];
  bookings: Booking[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "demo-store.json");

export function loadDemoStoreFromDisk(): PersistedDemoStore | null {
  try {
    if (!existsSync(DATA_FILE)) return null;
    const raw = readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as PersistedDemoStore;
    if (!Array.isArray(parsed.users)) return null;
    return {
      users: parsed.users,
      workshops: parsed.workshops ?? [],
      sessions: parsed.sessions ?? [],
      bookings: parsed.bookings ?? [],
    };
  } catch {
    return null;
  }
}

export function saveDemoStoreToDisk(data: {
  users: Iterable<PersistedDemoUser>;
  workshops: Iterable<Workshop>;
  sessions: Iterable<WorkshopSession>;
  bookings: Iterable<Booking>;
}): void {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    const payload: PersistedDemoStore = {
      users: [...data.users],
      workshops: [...data.workshops],
      sessions: [...data.sessions],
      bookings: [...data.bookings],
    };
    writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), "utf8");
  } catch (err) {
    console.warn("Could not persist demo store:", err);
  }
}

export type { UserRole };

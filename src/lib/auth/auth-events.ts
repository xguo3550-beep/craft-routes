import type { SessionUser } from "@/lib/auth/types";

export const AUTH_CHANGE_EVENT = "cr-auth-change";

/** Tell the header (and other client UI) the session changed without a full reload. */
export function notifyAuthChange(user: SessionUser | null) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<SessionUser | null>(AUTH_CHANGE_EVENT, { detail: user })
  );
}

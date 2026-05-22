"use client";

import { useEffect, useState } from "react";
import { formatDate, formatTime } from "@/lib/format";
import type { WorkshopSession } from "@/types";

interface SessionManagerProps {
  workshopId: string;
}

export function SessionManager({ workshopId }: SessionManagerProps) {
  const [sessions, setSessions] = useState<WorkshopSession[]>([]);
  const [startsAt, setStartsAt] = useState("");
  const [spots, setSpots] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch(`/api/host/sessions?workshop_id=${workshopId}`);
    const data = await res.json();
    if (res.ok) setSessions(data.sessions ?? []);
  }

  useEffect(() => {
    load();
  }, [workshopId]);

  async function addSession(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/host/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshop_id: workshopId,
          starts_at: new Date(startsAt).toISOString(),
          spots_available: spots,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add session");
      setStartsAt("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function updateSession(
    id: string,
    patch: { starts_at?: string; spots_available?: number }
  ) {
    const res = await fetch(`/api/host/sessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) await load();
  }

  async function removeSession(id: string) {
    if (!confirm("Delete this session?")) return;
    await fetch(`/api/host/sessions/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addSession} className="rounded-xl border border-line bg-cream/50 p-4">
        <h3 className="font-semibold text-ink">Add a session</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink">Date & time</label>
            <input
              type="datetime-local"
              required
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">Spots available</label>
            <input
              type="number"
              min={1}
              value={spots}
              onChange={(e) => setSpots(Number(e.target.value))}
              className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary mt-4 text-sm">
          {loading ? "Adding…" : "Add session"}
        </button>
      </form>

      <ul className="space-y-3">
        {sessions.length === 0 && (
          <p className="text-sm text-muted">No sessions yet. Add dates above.</p>
        )}
        {sessions.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white p-4"
          >
            <div>
              <p className="font-medium text-ink">
                {formatDate(s.starts_at)} · {formatTime(s.starts_at)}
              </p>
              <p className="text-sm text-muted">{s.spots_available} spots left</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                defaultValue={s.spots_available}
                className="w-16 rounded border border-line px-2 py-1 text-sm"
                onBlur={(e) =>
                  updateSession(s.id, { spots_available: Number(e.target.value) })
                }
              />
              <button
                type="button"
                onClick={() => removeSession(s.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

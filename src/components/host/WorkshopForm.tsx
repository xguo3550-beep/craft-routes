"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Region, Workshop } from "@/types";

interface WorkshopFormProps {
  workshop?: Workshop;
}

export function WorkshopForm({ workshop }: WorkshopFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(workshop?.title ?? "");
  const [description, setDescription] = useState(workshop?.description ?? "");
  const [longDescription, setLongDescription] = useState(workshop?.long_description ?? "");
  const [region, setRegion] = useState<Region>(workshop?.region ?? "dali");
  const [location, setLocation] = useState(workshop?.location ?? "");
  const [durationHours, setDurationHours] = useState(workshop?.duration_hours ?? 3);
  const [maxParticipants, setMaxParticipants] = useState(workshop?.max_participants ?? 8);
  const [priceDollars, setPriceDollars] = useState(
    workshop ? (workshop.price_cents / 100).toFixed(0) : "68"
  );
  const [language, setLanguage] = useState(workshop?.language ?? "English");
  const [hostBio, setHostBio] = useState(workshop?.host_bio ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      description,
      long_description: longDescription || description,
      region,
      location,
      duration_hours: durationHours,
      max_participants: maxParticipants,
      price_cents: Math.round(Number(priceDollars) * 100),
      language,
      host_bio: hostBio,
    };

    const url = workshop ? `/api/host/workshops/${workshop.id}` : "/api/host/workshops";
    const method = workshop ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      router.push(`/host/workshops/${data.workshop.id}/edit`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink">Experience title</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Short description</label>
        <textarea
          required
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Full description</label>
        <textarea
          rows={4}
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
          >
            <option value="dali">Dali, Yunnan</option>
            <option value="sichuan">Sichuan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Location</label>
          <input
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-ink">Duration (hours)</label>
          <input
            type="number"
            min={1}
            value={durationHours}
            onChange={(e) => setDurationHours(Number(e.target.value))}
            className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Max guests</label>
          <input
            type="number"
            min={1}
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Price (USD)</label>
          <input
            type="number"
            min={1}
            value={priceDollars}
            onChange={(e) => setPriceDollars(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Languages</label>
        <input
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Your host bio</label>
        <textarea
          rows={3}
          value={hostBio}
          onChange={(e) => setHostBio(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-sm"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Saving…" : workshop ? "Save changes" : "Create experience"}
      </button>
    </form>
  );
}

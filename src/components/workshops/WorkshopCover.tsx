"use client";

import { useState } from "react";
import {
  coverAlternateUrls,
  pickCoverKey,
  resolveWorkshopCoverUrl,
} from "@/lib/workshop-cover-images";

interface WorkshopCoverProps {
  slug: string;
  title: string;
  region?: string;
  src?: string;
  className?: string;
  priority?: boolean;
}

export function WorkshopCover({
  slug,
  title,
  region,
  src,
  className = "",
}: WorkshopCoverProps) {
  const key = pickCoverKey(slug, region, title);
  const primary = resolveWorkshopCoverUrl(slug, { region, title, imageUrl: src });
  const alternates = coverAlternateUrls(key, region);
  const [imgSrc, setImgSrc] = useState(primary);
  const [altIndex, setAltIndex] = useState(0);

  function handleError() {
    const next = altIndex + 1;
    if (next < alternates.length) {
      setAltIndex(next);
      setImgSrc(alternates[next]);
    }
  }

  return (
    // Native img avoids Next.js image optimizer blocking some Unsplash URLs
    <img
      src={imgSrc}
      alt={title}
      loading="lazy"
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      onError={handleError}
    />
  );
}

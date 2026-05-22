"use client";

import Image from "next/image";
import { useState } from "react";
import {
  curatedPhotoUrl,
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
  priority = false,
}: WorkshopCoverProps) {
  const primary = resolveWorkshopCoverUrl(slug, { region, title, imageUrl: src });
  const fallback = curatedPhotoUrl(pickCoverKey(slug, region, title));
  const [imgSrc, setImgSrc] = useState(primary);

  return (
    <Image
      src={imgSrc}
      alt={title}
      fill
      priority={priority}
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}

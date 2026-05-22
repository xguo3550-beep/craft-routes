"use client";

import Image from "next/image";
import { useState } from "react";
import { workshopCoverPath } from "@/lib/workshop-images";
import { workshopEmoji } from "@/lib/workshop-meta";

interface WorkshopCardImageProps {
  slug: string;
  title: string;
  imageUrl: string;
  pastelClass: string;
}

export function WorkshopCardImage({
  slug,
  title,
  imageUrl,
  pastelClass,
}: WorkshopCardImageProps) {
  const localSrc = workshopCoverPath(slug);
  const [src, setSrc] = useState(imageUrl.startsWith("/") ? imageUrl : localSrc);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex aspect-[5/4] items-center justify-center ${pastelClass}`}
      >
        <span className="text-7xl drop-shadow-sm" aria-hidden>
          {workshopEmoji(slug)}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative aspect-[5/4] ${pastelClass} overflow-hidden`}>
      <div className="absolute inset-3 overflow-hidden rounded-lg shadow-soft">
        <Image
          src={src}
          alt={title}
          fill
          unoptimized={src.endsWith(".svg")}
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={() => {
            if (src !== localSrc) {
              setSrc(localSrc);
            } else {
              setFailed(true);
            }
          }}
        />
      </div>
      <span className="absolute right-4 top-4 text-3xl opacity-90 drop-shadow-sm">
        {workshopEmoji(slug)}
      </span>
    </div>
  );
}

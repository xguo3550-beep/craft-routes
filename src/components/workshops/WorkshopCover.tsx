import { workshopCoverPath } from "@/lib/workshop-meta";

interface WorkshopCoverProps {
  slug: string;
  title: string;
  className?: string;
}

/** Native img — next/image does not reliably serve local SVG covers */
export function WorkshopCover({ slug, title, className = "" }: WorkshopCoverProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local SVG covers; next/image breaks SVG
    <img
      src={workshopCoverPath(slug)}
      alt={title}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}

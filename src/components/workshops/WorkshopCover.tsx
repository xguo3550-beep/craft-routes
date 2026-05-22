import { workshopCoverGradient, workshopEmoji } from "@/lib/workshop-meta";

interface WorkshopCoverProps {
  slug: string;
  title: string;
  className?: string;
}

/** CSS gradient + emoji — no external files (SVG assets were corrupt) */
export function WorkshopCover({ slug, title, className = "" }: WorkshopCoverProps) {
  return (
    <div
      role="img"
      aria-label={title}
      className={`flex items-center justify-center bg-gradient-to-br ${workshopCoverGradient(slug)} ${className}`}
    >
      <span className="text-[4.5rem] leading-none drop-shadow-sm sm:text-[5.5rem]" aria-hidden>
        {workshopEmoji(slug)}
      </span>
    </div>
  );
}

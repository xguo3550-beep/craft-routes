import Image from "next/image";
import { workshopCoverImage } from "@/lib/workshop-cover-images";

interface WorkshopCoverProps {
  slug: string;
  title: string;
  src?: string;
  className?: string;
}

export function WorkshopCover({ slug, title, src, className = "" }: WorkshopCoverProps) {
  return (
    <Image
      src={src ?? workshopCoverImage(slug)}
      alt={title}
      fill
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    />
  );
}

import type { DetailItem } from "@/lib/workshop-detail-content";

export function DetailListSection({
  title,
  items,
}: {
  title: string;
  items: DetailItem[];
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.text} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span className="text-lg" aria-hidden>
              {item.icon}
            </span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

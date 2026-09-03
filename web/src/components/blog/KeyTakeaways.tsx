import { Check } from "lucide-react";

export default function KeyTakeaways({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <aside
      aria-label="Key takeaways"
      className="mb-10 rounded-2xl border border-ocean-100 bg-ocean-50 p-6"
    >
      <h2 className="font-display text-xl font-semibold text-ocean-900 mb-4">
        Key Takeaways
      </h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check size={16} className="mt-1 shrink-0 text-ocean-700" />
            <span className="text-neutral-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

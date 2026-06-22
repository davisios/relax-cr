import type { BlogSection } from "@/lib/types/blog";

interface Props {
  sections: BlogSection[];
}

export default function BlogPostBody({ sections }: Props) {
  return (
    <div className="space-y-6 text-neutral-600 leading-relaxed">
      {sections.map((section, index) => {
        if (section.type === "heading") {
          const Tag = section.level === 2 ? "h2" : "h3";
          return (
            <Tag
              key={index}
              className="font-display text-2xl font-semibold text-ocean-900 pt-2"
            >
              {section.text}
            </Tag>
          );
        }

        if (section.type === "list") {
          const ListTag = section.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={
                section.ordered
                  ? "list-decimal pl-6 space-y-4"
                  : "list-disc pl-6 space-y-2"
              }
            >
              {section.items.map((item) => (
                <li key={item.slice(0, 40)} className="pl-1">
                  {item}
                </li>
              ))}
            </ListTag>
          );
        }

        return (
          <p key={index} className="whitespace-pre-line">
            {section.text}
          </p>
        );
      })}
    </div>
  );
}

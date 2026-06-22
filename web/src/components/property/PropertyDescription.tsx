function isDividerParagraph(text: string): boolean {
  return /^[_\-=]{8,}$/.test(text.trim());
}

function splitDescription(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

interface Props {
  text: string;
}

export default function PropertyDescription({ text }: Props) {
  const paragraphs = splitDescription(text);

  return (
    <div className="space-y-4 text-neutral-600 leading-relaxed">
      {paragraphs.map((paragraph, index) => {
        if (isDividerParagraph(paragraph)) {
          return <hr key={index} className="border-neutral-200" />;
        }

        return (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

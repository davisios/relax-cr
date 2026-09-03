"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface Props {
  title: string;
  /** Absolute URL of the page to share. */
  url: string;
  text?: string;
}

export default function ShareButton({ title, url, text }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: text ?? title, url });
        return;
      } catch {
        // user dismissed the share sheet — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing else to fall back to
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${title}`}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-ocean-200 hover:text-ocean-700"
    >
      {copied ? <Check size={15} className="text-ocean-700" /> : <Share2 size={15} />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}

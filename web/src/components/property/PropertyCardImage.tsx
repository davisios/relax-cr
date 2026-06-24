"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  title: string;
}

export default function PropertyCardImage({ src, alt, title }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center">
        <span className="text-ocean-400 text-sm">No image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || title}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}

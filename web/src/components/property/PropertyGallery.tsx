"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PropertyImage } from "@/lib/types/property";
import { cn } from "@/lib/utils/cn";

interface Props {
  images: PropertyImage[];
  title: string;
}

export default function PropertyGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (images.length === 0) return;
      const next = (index + images.length) % images.length;
      setActiveIndex(next);
    },
    [images.length],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  useEffect(() => {
    const container = thumbnailsRef.current;
    const thumb = container?.children[activeIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center">
        <span className="text-ocean-400">No images available</span>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 group">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt || title}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          unoptimized
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/45 text-white flex items-center justify-center transition-opacity hover:bg-black/60"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/45 text-white flex items-center justify-center transition-opacity hover:bg-black/60"
            >
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "relative shrink-0 w-24 h-16 sm:w-28 sm:h-[4.5rem] rounded-lg overflow-hidden border-2 transition-all",
                index === activeIndex
                  ? "border-ocean-700 ring-2 ring-ocean-200"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt || `${title} ${index + 1}`}
                fill
                sizes="112px"
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

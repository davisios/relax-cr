"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { PropertyImage } from "@/lib/types/property";
import { cn } from "@/lib/utils/cn";

interface Props {
  images: PropertyImage[];
  title: string;
}

export default function PropertyGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());

  const validImages = images.filter((img) => !failedSrcs.has(img.src));
  const markFailed = (src: string) => setFailedSrcs((prev) => new Set(prev).add(src));
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (validImages.length === 0) return;
      const next = (index + validImages.length) % validImages.length;
      setActiveIndex(next);
    },
    [validImages.length],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "Escape") setModalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  useEffect(() => {
    const container = thumbnailsRef.current;
    const thumb = container?.children[activeIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  if (validImages.length === 0) {
    return (
      <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center">
        <span className="text-ocean-400">No images available</span>
      </div>
    );
  }

  const safeIndex = Math.min(activeIndex, Math.max(0, validImages.length - 1));
  const activeImage = validImages[safeIndex];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/5] rounded-2xl overflow-hidden bg-neutral-100 group">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt || title}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          onError={() => markFailed(activeImage.src)}
        />

        {validImages.length > 1 && (
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
              {activeIndex + 1} / {validImages.length}
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              aria-label="Zoom image"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/45 text-white flex items-center justify-center hover:bg-black/65 transition-colors"
            >
              <Maximize2 size={16} />
            </button>
          </>
        )}
      </div>

      {/* Lightbox modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <button
            onClick={() => setModalOpen(false)}
            style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,.15)", border: "none", color: "#fff", width: "40px", height: "40px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <X size={20} />
          </button>

          {validImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.15)", border: "none", color: "#fff", width: "44px", height: "44px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", width: "100%", height: "100%" }}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt || title}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {validImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.15)", border: "none", color: "#fff", width: "44px", height: "44px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <ChevronRight size={24} />
            </button>
          )}

          {validImages.length > 1 && (
            <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.5)", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "5px 14px", borderRadius: "999px" }}>
              {activeIndex + 1} / {validImages.length}
            </div>
          )}
        </div>
      )}

      {validImages.length > 1 && (
        <div
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
        >
          {validImages.map((image, index) => (
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
                onError={() => markFailed(image.src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

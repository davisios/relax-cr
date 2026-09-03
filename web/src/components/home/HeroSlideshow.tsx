"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_DURATION_MS = 5000;
const FADE_DURATION_MS = 500;

const HERO_SLIDES = [
  { src: "https://relaxcostarica.com/wp-content/uploads/2022/01/Jaco.jpg", alt: "Aerial view of Jacó Beach and town, Costa Rica" },
  { src: "https://relaxcostarica.com/wp-content/uploads/2022/05/Faro-Escondido-49.jpg", alt: "Faro Escondido oceanfront community on the Central Pacific coast" },
  { src: "https://relaxcostarica.com/wp-content/uploads/2022/01/Herradura-Costa-Rica.jpg", alt: "Herradura Bay and its sheltered beach, Costa Rica" },
  { src: "https://relaxcostarica.com/wp-content/uploads/2021/11/Sunset-at-Jaco-Costa-Rica.jpg", alt: "Sunset over the Pacific at Jacó Beach, Costa Rica" },
  { src: "https://relaxcostarica.com/wp-content/uploads/2021/11/Los-Suenos-Marina-Costa-Rica.jpg", alt: "Los Sueños Marina in Herradura, Costa Rica" },
  { src: "https://relaxcostarica.com/wp-content/uploads/2022/01/Jaco-Beach-Sunset.jpg", alt: "Palm trees at sunset on Jacó Beach" },
  { src: "https://relaxcostarica.com/wp-content/uploads/2022/05/Faro-Escondido-72.jpg", alt: "Ocean view from the Faro Escondido hills, Costa Rica" },
  { src: "https://relaxcostarica.com/wp-content/uploads/2022/01/Esterillos-Costa-Rica.jpg", alt: "Quiet sands of Esterillos beach, Costa Rica" },
  { src: "https://relaxcostarica.com/wp-content/uploads/2022/01/Bejuco-Costa-Rica.jpg", alt: "Bejuco beach on Costa Rica's Central Pacific coast" },
];

export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          style={{
            opacity: index === activeIndex ? 1 : 0,
            transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

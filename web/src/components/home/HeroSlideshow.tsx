"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_DURATION_MS = 5000;
const FADE_DURATION_MS = 500;

const HERO_SLIDES = [
  "https://relaxcostarica.com/wp-content/uploads/2022/01/Jaco.jpg",
  "https://relaxcostarica.com/wp-content/uploads/2022/05/Faro-Escondido-49.jpg",
  "https://relaxcostarica.com/wp-content/uploads/2022/01/Herradura-Costa-Rica.jpg",
  "https://relaxcostarica.com/wp-content/uploads/2021/11/Sunset-at-Jaco-Costa-Rica.jpg",
  "https://relaxcostarica.com/wp-content/uploads/2021/11/Los-Suenos-Marina-Costa-Rica.jpg",
  "https://relaxcostarica.com/wp-content/uploads/2022/01/Jaco-Beach-Sunset.jpg",
  "https://relaxcostarica.com/wp-content/uploads/2022/05/Faro-Escondido-72.jpg",
  "https://relaxcostarica.com/wp-content/uploads/2022/01/Esterillos-Costa-Rica.jpg",
  "https://relaxcostarica.com/wp-content/uploads/2022/01/Bejuco-Costa-Rica.jpg",
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
      {HERO_SLIDES.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: index === activeIndex ? 1 : 0,
            transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
          }}
        >
          <Image
            src={src}
            alt=""
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

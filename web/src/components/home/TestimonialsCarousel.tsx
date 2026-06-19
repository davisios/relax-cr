"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const TESTIMONIALS = [
  {
    name: "Danica Gastelum",
    text: "I recently purchased a home in Herradura with the help of Dominique Brousseau. Her experience and expertise made the process flow seamlessly for me from beginning to end. I highly recommend her!",
  },
  {
    name: "Sid Willford",
    text: "This is my first time buying property outside of Canada. My real estate agent Dominique was amazing! Her kindness, expertise and professionalism created a positive experience for me!",
  },
  {
    name: "Martin Tessier",
    text: "I take two minutes to thank Dominique for her very good work. She was invaluable in the purchase of my property in Jaco. I recommend Dominique to anyone looking for real estate in the Jaco area.",
  },
  {
    name: "Jeremy Conte",
    text: "Dominique went above and beyond to ensure every detail was taken care of, and her professionalism and expertise truly stood out. She made the entire process smooth and enjoyable.",
  },
  {
    name: "Kayla Orton",
    text: "My in-laws, husband, and I recently purchased a condo in Jaco and worked with Dominique. From the beginning, she made the process fun and easy! She really listened to our wants and needs.",
  },
  {
    name: "Marc S.",
    text: "Dominique Brousseau is a stellar agent. She is super thorough, detail-oriented, and helpful throughout the process. Not only is she knowledgeable about real estate, but also the surrounding economy, trends, and demographics.",
  },
  {
    name: "Natalia Sansnom",
    text: "I would like to thank Dominique Brousseau for her professionalism. She speaks 3 languages: French, English, and Spanish. She's always available to answer any questions. It was a very good experience!",
  },
  {
    name: "Sean Kirby",
    text: "Dominique helped us find our dream home and was fantastic to work with! As Canadian expats, we didn't anticipate how much help we'd need. Dominique guided us through it and helped us buy the home we plan to grow old in.",
  },
  {
    name: "J D",
    text: "Dominique Brousseau represented us when we were looking to buy our family home in Herradura. She went above and beyond our expectations; everything was seamless.",
  },
  {
    name: "Sandra & Robert Ratcliffe",
    text: "Our realtor, Dominique, was a great professional — knowledgeable, friendly and helpful. She sold our house quickly, much faster than we expected and at a good price. We would recommend Dominique to anyone.",
  },
  {
    name: "R B",
    text: "Dominique has been amazing! She helped me find the perfect place and gave great advice on the ins and outs of living in Costa Rica. I bought a place so I can live the Pura Vida dream in Jaco, the coolest town in Costa Rica.",
  },
  {
    name: "Venessa Tchir",
    text: "Working with Dominique was an absolute pleasure from start to finish! Dominique isn't just a realtor — she's a true advocate and partner. Whether you're buying your first home or your forever home, you couldn't ask for someone more dedicated.",
  },
];

const PER_PAGE = 3;

export default function TestimonialsCarousel() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(TESTIMONIALS.length / PER_PAGE);
  const visible = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="section-padding bg-ocean-900 text-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sand-500 font-sans text-sm font-semibold uppercase tracking-widest">
            What Clients Say
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mt-3">
            Client Testimonials
          </h2>
          <p className="text-white/60 mt-3">
            Stories from others, who now call Costa Rica home!
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visible.map((t) => (
            <div
              key={t.name}
              className="bg-white/10 rounded-xl p-6 border border-white/10 hover:border-sand-500/30 transition-colors"
            >
              <Quote size={24} className="text-sand-500 mb-4" />
              <p className="text-white/80 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <p className="font-display font-semibold text-sand-300">{t.name}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-full bg-white/10 text-white disabled:opacity-30 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === page ? "bg-sand-500 w-6" : "bg-white/30"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="p-2 rounded-full bg-white/10 text-white disabled:opacity-30 hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

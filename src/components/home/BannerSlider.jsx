import React ,{ useEffect, useRef, useState } from "react";

const banners = [
  "/images/banners/banner1.jpg",
  "/images/banners/banner2.jpg",
  "/images/banners/banner3.jpg",
  "/images/banners/banner4.jpg"
];

export default function BannerSlider({ interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  // --- Auto slide ---
  useEffect(() => {
    timerRef.current = setInterval(next, interval);

    return () => clearInterval(timerRef.current);
  }, [interval]);

  // --- Reset timer on manual change ---
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, interval);
  };

  return (
    <div className="relative w-full h-30 md:h-80 rounded-xl overflow-hidden mb-4 sm:mb-8">
      {/* Slides */}
      <div
        dir="ltr"
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`banner-${i}`}
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={() => {
          prev();
          resetTimer();
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2
        bg-black/40 text-white px-3 py-1 rounded-full"
      >
        {">"}
      </button>

      {/* Next */}
      <button
        onClick={() => {
          next();
          resetTimer();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2
        bg-black/40 text-white px-3 py-1 rounded-full"
      >
        {"<"}
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              resetTimer();
            }}
            className={`w-2.5 h-2.5 rounded-full transition
              ${i === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
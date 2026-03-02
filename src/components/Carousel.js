import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ frames }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 340;

    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-12 relative">

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10
        hidden md:flex items-center justify-center
        h-10 w-10 rounded-full border border-black/10 bg-white
        shadow-md hover:bg-black hover:text-white transition"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10
        hidden md:flex items-center justify-center
        h-10 w-10 rounded-full border border-black/10 bg-white
        shadow-md hover:bg-black hover:text-white transition"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
      >
        {frames.map((f) => (
          <div
            key={f.id}
            className="snap-start shrink-0 w-[280px] sm:w-[320px] group"
          >
            {/* Frame */}
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              transition duration-500
              hover:-translate-y-2
              hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
            >
              <div className="relative bg-neutral-100 p-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="mt-6 text-center">
              <div className="text-base font-semibold tracking-tight text-black">
                {f.name}
              </div>

              <p className="mt-3 text-sm text-black/60 leading-relaxed">
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// frames: [{ id, name, description, image }]
export default function FramesCarouselSection({ frames = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const STEP = 320 + 32;

    el.scrollBy({
      left: direction === "left" ? -STEP : STEP,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-6">
        <div className="flex items-end justify-between mb-6 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-black mb-2">
              Shop our Frames
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="p-3 rounded-full border border-black/20 bg-white text-black
              hover:bg-black hover:text-white transition-colors active:scale-90 shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="p-3 rounded-full border border-black/20 bg-black text-white
              hover:bg-black/90 transition-colors shadow-lg shadow-black/20 active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto hide-scrollbar pb-8 px-1 snap-x snap-mandatory relative items-stretch"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {frames.map((f) => (
            <div
              key={f.id || f.name}
              className="min-w-[320px] bg-white rounded-3xl overflow-hidden
              shadow-xl border border-black/10 snap-start group flex flex-col"
            >
              <div className="h-60 bg-[#f4f1ec] p-6 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden border border-black/10 flex items-center justify-center">
                  <img
                    alt={f.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    src={f.image}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1 text-center">
                <h4 className="font-bold text-md text-black leading-tight">
                  {f.name}
                </h4>

                <p className="mt-3 text-sm text-black/60 leading-relaxed">
                  {f.description}
                </p>

                <div className="mt-auto pt-2" />
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
      </div>

      {/* Shop Frames CTA */}
      <div className="mt-8 flex justify-center">
        <Link
          to="/shop"
          className="rounded-full border border-black px-6 py-3 text-sm text-black hover:bg-black hover:text-white transition"
        >
          Order Frames →
        </Link>
      </div>
    </section>
  );
}
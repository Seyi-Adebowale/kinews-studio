import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { frames as mockFrames } from "../data/Mock";

const money = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    n,
  );

export default function ShopFrames() {
  const { addItem } = useCart();

  // Mock.js now includes: price, color, finish, sizes, featured, description, image
  const frames = useMemo(() => mockFrames, []);

  const [search, setSearch] = useState("");
  const [color, setColor] = useState("All");
  const [finish, setFinish] = useState("All");
  const [size, setSize] = useState("All");

  const [active, setActive] = useState(null); // quick view modal
  const [selectedSize, setSelectedSize] = useState("A4");

  // Toast
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 2200);
  };

  const filtered = frames.filter((p) => {
    const s = search.trim().toLowerCase();
    const matchSearch =
      !s ||
      p.name.toLowerCase().includes(s) ||
      (p.description || "").toLowerCase().includes(s);

    const matchColor = color === "All" || p.color === color;
    const matchFinish = finish === "All" || p.finish === finish;
    const matchSize = size === "All" || (p.sizes || []).includes(size);

    return matchSearch && matchColor && matchFinish && matchSize;
  });

  const open = (p) => {
    setActive(p);
    setSelectedSize((p.sizes && p.sizes[0]) || "A4");
  };

  const close = () => setActive(null);

  const addToCart = (product, sizePicked) => {
    addItem(product, { size: sizePicked, qty: 1 });

    // ✅ close modal after adding
    close();

    // ✅ show success toast
    showToast(`${product.name} added to cart`);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* TOAST */}
      <div
        className={[
          "fixed top-5 left-1/2 -translate-x-1/2 z-[60] transition-all duration-200",
          toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
        aria-live="polite"
      >
        <div className="rounded-2xl bg-green-500 text-white px-4 py-3 text-sm font-semibold shadow-lg">
          {toast.message}
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white py-8">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-14 md:pt-32 md:pb-16">
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
            Shop Frames
          </h1>
          <p className="mt-3 max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
            Premium frames for studio prints.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section id="frames" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Frames</h2>
              <p className="mt-2 text-sm text-black/60">
                Filter by color, finish, and size.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search frames..."
                className="w-full md:w-[320px] rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black/35"
            >
              <option value="All">All colors</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Oak">Oak</option>
              <option value="Silver">Silver</option>
            </select>

            <select
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
              className="rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black/35"
            >
              <option value="All">All finishes</option>
              <option value="Matte">Matte</option>
              <option value="Gloss">Gloss</option>
              <option value="Satin">Satin</option>
              <option value="Natural">Natural</option>
            </select>

            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black/35"
            >
              <option value="All">All sizes</option>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
              <option value="A2">A2</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setColor("All");
                setFinish("All");
                setSize("All");
              }}
              className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Reset
            </button>
          </div>

          {/* GRID */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-black/10 bg-white overflow-hidden hover:border-black/25 transition"
              >
                <div className="relative aspect-[4/3] bg-black/[0.04]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {p.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-black">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-black/60">{p.description}</p>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="font-semibold">{money(p.price)}</p>

                    <button
                      type="button"
                      onClick={() => open(p)}
                      className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-3xl border border-black/10 bg-black/[0.03] p-8">
              <p className="font-semibold">No frames found.</p>
              <p className="mt-2 text-sm text-black/60">
                Try clearing filters or searching a different keyword.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <h2 className="text-2xl font-semibold">Need prints too?</h2>
              <p className="mt-2 text-sm text-white/70">
                Book a studio session and we’ll handle the full package.
              </p>
            </div>

            <Link
              to="/book"
              className="mt-6 md:mt-0 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
            >
              Go to Bookings
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-[4/3] bg-black/[0.04]">
                <img
                  src={active.image}
                  alt={active.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{active.name}</h3>
                    <p className="mt-2 text-sm text-black/60">
                      {active.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    className="rounded-2xl border border-black/10 px-3 py-2 text-sm hover:border-black/25 transition"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-5 space-y-2 text-sm text-black/70">
                  <div className="flex justify-between">
                    <span>Color</span>
                    <span className="font-semibold text-black">{active.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finish</span>
                    <span className="font-semibold text-black">{active.finish}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-black/60">
                    Size
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(active.sizes || []).map((s) => {
                      const on = selectedSize === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={[
                            "rounded-2xl border px-4 py-2 text-sm font-semibold transition",
                            on
                              ? "border-black bg-black text-white"
                              : "border-black/15 hover:border-black/35",
                          ].join(" ")}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="text-xl font-semibold">{money(active.price)}</p>

                  <button
                    type="button"
                    onClick={() => addToCart(active, selectedSize)}
                    className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                  >
                    Add to cart
                  </button>
                </div>

                <p className="mt-4 text-xs text-black/50">
                  Size will be saved in your cart.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
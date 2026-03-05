import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const money = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

export default function Cart() {
  const navigate = useNavigate();
  const { items, totals, updateQty, removeItem, clearCart } = useCart();

  const goCheckout = () => navigate("/checkout");

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="bg-black text-white py-8">
        <div className="mx-auto max-w-7xl px-5 pt-28 pb-12 md:pt-32">
         
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            Cart
          </h1>
          <p className="mt-3 text-white/70">
            Review your items and proceed to checkout.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-black/[0.03] p-10">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-black/60">Browse frames and add something you like.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Shop Frames
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* items */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((x) => (
                <div
                  key={x.key}
                  className="rounded-3xl border border-black/10 bg-white p-5 md:p-6 flex gap-4"
                >
                  <div className="h-24 w-24 rounded-2xl overflow-hidden bg-black/[0.04] shrink-0">
                    {x.image ? (
                      <img src={x.image} alt={x.name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{x.name}</p>
                        <p className="mt-1 text-sm text-black/60">Size: {x.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(x.key)}
                        className="rounded-2xl border border-black/10 px-3 py-2 text-sm hover:border-black/25 transition"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-black/60">Qty</label>
                        <input
                          type="number"
                          min={1}
                          value={x.qty}
                          onChange={(e) => updateQty(x.key, e.target.value)}
                          className="w-20 rounded-2xl border border-black/15 px-3 py-2 text-sm outline-none focus:border-black/35"
                        />
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-black/60">{money(x.price)} each</p>
                        <p className="text-lg font-semibold">{money(x.price * x.qty)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="rounded-2xl border border-black/15 px-5 py-3 text-sm font-semibold hover:border-black/30 transition"
                >
                  Continue shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="rounded-2xl border border-black/15 px-5 py-3 text-sm font-semibold hover:border-black/30 transition"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* summary */}
            <aside className="lg:col-span-4">
              <div className="rounded-3xl border border-black/10 bg-black text-white p-6 lg:sticky lg:top-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/60">
                  Summary
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-white/80">
                  <span>Items</span>
                  <span className="font-semibold text-white">{totals.count}</span>
                </div>

                <div className="mt-2 flex items-center justify-between text-sm text-white/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{money(totals.subtotal)}</span>
                </div>

                <div className="mt-5 border-t border-white/15 pt-5">
                  <button
                    onClick={goCheckout}
                    className="w-full rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
                  >
                    Checkout
                  </button>
                  <p className="mt-3 text-xs text-white/60">
                    You’ll enter your details next.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
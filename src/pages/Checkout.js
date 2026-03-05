import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const money = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totals } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    notes: "",
  });

  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const canPay = useMemo(() => {
    if (!items.length) return false;
    return form.fullName.trim() && form.email.trim() && form.address.trim() && form.postcode.trim();
  }, [items.length, form]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canPay) return;

    const payload = {
      type: "frames_checkout",
      items,
      subtotal: totals.subtotal,
      customer: form,
    };

    // send to your payment page
    navigate("/payment", { state: payload });
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="bg-black text-white py-8">
        <div className="mx-auto max-w-7xl px-5 pt-28 pb-12 md:pt-32">
         
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            Checkout
          </h1>
          <p className="mt-3 text-white/70">Enter your details and continue to payment.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        {!items.length ? (
          <div className="rounded-3xl border border-black/10 bg-black/[0.03] p-10">
            <h2 className="text-xl font-semibold">No items to checkout</h2>
            <p className="mt-2 text-black/60">Add frames to your cart first.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Shop Frames
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={onSubmit}
                className="rounded-3xl border border-black/10 bg-white p-6 md:p-8"
              >
                <h2 className="text-xl font-semibold">Delivery details</h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <input
                    className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
                    placeholder="Full name"
                    value={form.fullName}
                    onChange={onChange("fullName")}
                    required
                  />
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
                    placeholder="Email"
                    value={form.email}
                    onChange={onChange("email")}
                    required
                  />
                  <input
                    className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={onChange("phone")}
                  />
                  <input
                    className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
                    placeholder="City"
                    value={form.city}
                    onChange={onChange("city")}
                  />
                </div>

                <input
                  className="mt-4 w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
                  placeholder="Address"
                  value={form.address}
                  onChange={onChange("address")}
                  required
                />

                <input
                  className="mt-4 w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
                  placeholder="Postcode"
                  value={form.postcode}
                  onChange={onChange("postcode")}
                  required
                />

                <textarea
                  className="mt-4 w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
                  placeholder="Notes (optional)"
                  rows={4}
                  value={form.notes}
                  onChange={onChange("notes")}
                />

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/cart"
                    className="rounded-2xl border border-black/15 px-5 py-3 text-sm font-semibold hover:border-black/30 transition"
                  >
                    Back to cart
                  </Link>

                  <button
                    type="submit"
                    disabled={!canPay}
                    className={[
                      "rounded-2xl px-6 py-3 text-sm font-semibold transition",
                      canPay
                        ? "bg-black text-white hover:opacity-90"
                        : "bg-black/30 text-white cursor-not-allowed",
                    ].join(" ")}
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>

            {/* order summary */}
            <aside className="lg:col-span-5">
              <div className="rounded-3xl border border-black/10 bg-black text-white p-6 lg:sticky lg:top-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/60">
                  Order
                </p>

                <div className="mt-4 space-y-3">
                  {items.map((x) => (
                    <div key={x.key} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{x.name}</p>
                        <p className="text-xs text-white/65">
                          Size {x.size} • Qty {x.qty}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">{money(x.price * x.qty)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-white/15 pt-5 flex items-center justify-between">
                  <span className="text-white/75">Subtotal</span>
                  <span className="text-lg font-semibold">{money(totals.subtotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
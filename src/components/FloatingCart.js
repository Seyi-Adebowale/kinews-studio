import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const money = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    n,
  );

export default function FloatingCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, totals, updateQty, removeItem, clearCart } = useCart();

  const [open, setOpen] = useState(false);

  // Hide on these pages
  const hideOn = ["/checkout", "/payment", "/cart"];
  const isHidden = hideOn.includes(location.pathname);

  // Auto-close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const subtotal = totals.subtotal;
  const count = totals.count;
  const hasItems = items.length > 0;

  const goCheckout = () => {
    if (!hasItems) return;
    navigate("/checkout");
  };

 if (isHidden || !hasItems) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[
          "fixed bottom-5 right-5 z-50",
          "rounded-full px-3 py-2 text-sm font-semibold",
          "bg-white text-black border border-black/15",
          "shadow-[0_10px_30px_rgba(0,0,0,0.18)]",
          "hover:shadow-[0_14px_38px_rgba(0,0,0,0.24)] hover:-translate-y-[1px]",
          "transition-all duration-200 flex items-center gap-2",
        ].join(" ")}
        aria-label="Open cart"
      >
        <span className="text-base">🛒</span>
        <span>Cart</span>

        {count > 0 && (
          <span className="ml-1 rounded-full bg-black text-white text-xs px-2 py-[2px] font-bold">
            {count}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={[
          "fixed top-0 right-0 z-50 h-[100dvh] w-full max-w-md bg-white text-black shadow-2xl",
          "transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full",
          "flex flex-col",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Cart drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-black/60">
              Cart
            </p>
            <h3 className="text-lg font-semibold">
              {hasItems ? `${count} item${count > 1 ? "s" : ""}` : "Empty"}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-2xl border border-black/10 px-3 py-2 text-sm hover:border-black/25 transition"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="h-[calc(100%-176px)] overflow-auto px-5 py-4">
          {!hasItems ? (
            <div className="rounded-3xl border border-black/10 bg-black/[0.03] p-6">
              <p className="font-semibold">Your cart is empty</p>
              <p className="mt-2 text-sm text-black/60">
                Add frames to your cart to checkout.
              </p>
              <Link
                to="/shop"
                className="mt-4 inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Shop Frames
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((x) => (
                <div
                  key={x.key}
                  className="rounded-3xl border border-black/10 bg-white p-4"
                >
                  <div className="flex gap-3">
                    <div className="h-16 w-16 rounded-2xl overflow-hidden bg-black/[0.04] shrink-0">
                      {x.image ? (
                        <img
                          src={x.image}
                          alt={x.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{x.name}</p>
                          <p className="mt-1 text-xs text-black/60">
                            Size: {x.size}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(x.key)}
                          className="rounded-2xl border border-black/10 px-3 py-2 text-xs hover:border-black/25 transition"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-black/60">Qty</span>
                          <input
                            type="number"
                            min={1}
                            value={x.qty}
                            onChange={(e) => updateQty(x.key, e.target.value)}
                            className="w-16 rounded-xl border border-black/15 px-2 py-1 text-sm outline-none focus:border-black/35"
                          />
                        </div>

                        <p className="font-semibold">
                          {money(x.price * x.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="w-full rounded-2xl border border-black/15 px-5 py-3 text-sm font-semibold hover:border-black/30 transition"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-black/10 px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-black/60">Subtotal</span>
            <span className="text-lg font-semibold">{money(subtotal)}</span>
          </div>

          <div className="mt-4 grid gap-3">
            <button
              type="button"
              onClick={goCheckout}
              disabled={!hasItems}
              className={[
                "rounded-2xl px-5 py-3 text-sm font-semibold transition",
                hasItems
                  ? "bg-black text-white hover:opacity-90"
                  : "bg-black/30 text-white cursor-not-allowed",
              ].join(" ")}
            >
              Checkout
            </button>

        
          </div>
        </div>
      </div>
    </>
  );
}

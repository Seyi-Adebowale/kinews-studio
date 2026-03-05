import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const money = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    n,
  );

export default function EventPackages() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const packages = useMemo(
    () => [
      {
        id: "classic",
        name: "Classic Coverage",
        priceFrom: 250,
        duration: "2 Hours",
        bestFor: "Small parties • Intimate gatherings",
        highlights: [
          "1 photographer",
          "50–120 edited photos",
          "Online gallery (7 days)",
          "48–72hr sneak peeks",
        ],
      },
      {
        id: "signature",
        name: "Signature Story",
        priceFrom: 450,
        duration: "4 Hours",
        bestFor: "Birthdays • Engagement • Corporate",
        highlights: [
          "1–2 photographers (event size)",
          "150–250 edited photos",
          "Online gallery (30 days)",
          "Priority delivery",
        ],
        featured: true,
      },
      {
        id: "premium",
        name: "Premium Full Day",
        priceFrom: 850,
        duration: "8 Hours",
        bestFor: "Weddings • Conferences • Big events",
        highlights: [
          "2 photographers",
          "350–600 edited photos",
          "Online gallery (60 days)",
          "Same-day 10 photos (on request)",
        ],
      },
    ],
    [],
  );

  const [selectedPackageId, setSelectedPackageId] = useState("signature");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
    startTime: "",
    coverageNotes: "",
  });

  const selectedPackage =
    packages.find((p) => p.id === selectedPackageId) || packages[0];

  const onChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSelectPackage = (id) => {
    setSelectedPackageId(id);
    requestAnimationFrame(() => scrollToForm());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      packageId: selectedPackageId,
      packageName: selectedPackage?.name,
      price: selectedPackage?.priceFrom,
      ...form,
    };

    navigate("/payment", { state: payload });
  };

  return (
    <main className="min-h-screen bg-white text-black ">
      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white py-8">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-20 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-14 md:pt-32 md:pb-16">
          

          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
            Event Packages
          </h1>

          <p className="mt-3 max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
            Pick a package. Fill the form. Pay to secure your date.
          </p>

          
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Choose a package</h2>
              
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.id}
                className={[
                  "rounded-3xl border p-6 transition",
                  p.featured
                    ? "border-black/20 bg-black/[0.03]"
                    : "border-black/10 bg-white hover:border-black/20",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="mt-2 text-xs text-black/60">
                      {p.duration} <span className="mx-2">•</span> {money(p.priceFrom)}
                    </p>
                  </div>

                  {p.featured && (
                    <span className="shrink-0 rounded-full border border-black/15 bg-black/5 px-3 py-1 text-[11px] text-black/70">
                      Most booked
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-black/70">{p.bestFor}</p>

                <ul className="mt-4 space-y-2 text-sm text-black/60">
                  {p.highlights.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 rounded-full bg-black/50" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onSelectPackage(p.id)}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                  Select {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (black) */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold">How it works</h2>

          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {[
              { n: "01", t: "Select", d: "Choose a package." },
              { n: "02", t: "Details", d: "Enter your event info." },
              { n: "03", t: "Pay", d: "Proceed to payment." },
              { n: "04", t: "Confirm", d: "You receive confirmation." },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-3xl border border-white/15 bg-white/5 p-6"
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/60">
                  {s.n}
                </p>
                <h3 className="mt-3 text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Book your event</h2>
              <p className="mt-2 text-sm text-black/60">
                Selected:{" "}
                <span className="font-semibold text-black">{selectedPackage.name}</span>
              </p>
            </div>

            <a
              href="#packages"
              className="text-sm font-semibold text-black/70 hover:text-black transition"
            >
              Back to packages ↑
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-3xl border border-black/10 bg-white p-6 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-black/60">
                  Package
                </label>
                <select
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black/35"
                >
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} • {p.duration} • {money(p.priceFrom)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                <p className="text-xs tracking-[0.2em] uppercase text-black/60">
                  Amount
                </p>
                <p className="mt-2 text-2xl font-semibold">{money(selectedPackage.priceFrom)}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <input
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
                placeholder="Full name"
                value={form.fullName}
                onChange={onChange("fullName")}
                required
              />
              <input
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={onChange("email")}
                required
              />
              <input
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={onChange("phone")}
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
                placeholder="Event type"
                value={form.eventType}
                onChange={onChange("eventType")}
                required
              />
              <input
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black/35"
                type="date"
                value={form.eventDate}
                onChange={onChange("eventDate")}
                required
              />
              <input
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
                placeholder="Location / venue"
                value={form.location}
                onChange={onChange("location")}
                required
              />
              <input
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
                placeholder="Start time (optional)"
                value={form.startTime}
                onChange={onChange("startTime")}
              />
            </div>

            <textarea
              className="mt-4 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
              rows={5}
              placeholder="Notes (optional)"
              value={form.coverageNotes}
              onChange={onChange("coverageNotes")}
            />

            <div className="mt-6 flex flex-wrap items-center justify-end gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FINAL CTA -> BOOKINGS PAGE */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <h2 className="text-2xl font-semibold">Want to book a studio session?</h2>
              <p className="mt-2 text-sm text-white/70">
                Head to bookings to choose your date.
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
    </main>
  );
}
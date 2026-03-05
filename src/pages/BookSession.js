import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const money = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    n,
  );

export default function Bookings() {
  const navigate = useNavigate();

  const sessions = useMemo(
    () => [
      {
        id: "portrait",
        name: "Portrait Session",
        duration: "45 mins",
        price: 80,
        description: "Personal portraits, profile photos, and creative shots.",
      },
      {
        id: "branding",
        name: "Branding Session",
        duration: "60 mins",
        price: 120,
        description: "Perfect for professionals and business owners.",
      },
      {
        id: "family",
        name: "Family Session",
        duration: "60 mins",
        price: 140,
        description: "Relaxed family portraits in the studio.",
      },
      {
        id: "mini",
        name: "Mini Session",
        duration: "20 mins",
        price: 45,
        description: "Short session for quick portraits.",
      },
    ],
    [],
  );

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const [sessionId, setSessionId] = useState("portrait");
  const selectedSession = sessions.find((s) => s.id === sessionId);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const onChange = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const canContinue =
    sessionId && date && time && form.name.trim() && form.email.trim();

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      session: selectedSession,
      date,
      time,
      customer: form,
    };

    navigate("/payment", { state: payload });
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="bg-neutral-950 text-white py-8">
        <div className="mx-auto max-w-7xl px-5 pt-28 pb-16">
          

          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
            Studio Bookings
          </h1>

          <p className="mt-3 max-w-xl text-white/70">
            Select a session, pick a date and time, then continue to payment.
          </p>
        </div>
      </section>

      {/* SESSION TYPES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <h2 className="text-2xl font-semibold">Choose a session</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {sessions.map((s) => {
              const active = s.id === sessionId;

              return (
                <button
                  key={s.id}
                  onClick={() => setSessionId(s.id)}
                  className={[
                    "text-left rounded-2xl border p-5 transition",
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/10 hover:border-black/30",
                  ].join(" ")}
                >
                  <h3 className="font-semibold">{s.name}</h3>

                  <p className="mt-1 text-sm opacity-70">{s.duration}</p>

                  <p className="mt-3 text-sm opacity-80">{s.description}</p>

                  <p className="mt-4 font-semibold">{money(s.price)}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DATE + TIME */}
      <section className="bg-neutral-100">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <h2 className="text-2xl font-semibold">Choose your slot</h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* date */}
            <div>
              <label className="text-sm font-semibold">Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/20 px-4 py-3"
              />
            </div>

            {/* time */}
            <div>
              <label className="text-sm font-semibold">Time</label>

              <div className="mt-2 grid grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const active = time === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={[
                        "rounded-xl border px-3 py-2 text-sm font-semibold",
                        active
                          ? "bg-black text-white border-black"
                          : "border-black/20",
                      ].join(" ")}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + SUMMARY */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 grid gap-10 lg:grid-cols-12">
          {/* form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 space-y-4"
          >
            <h2 className="text-2xl font-semibold">Your details</h2>

            <input
              placeholder="Full name"
              className="w-full border border-black/20 rounded-xl px-4 py-3"
              value={form.name}
              onChange={onChange("name")}
              required
            />

            <input
              placeholder="Email"
              type="email"
              className="w-full border border-black/20 rounded-xl px-4 py-3"
              value={form.email}
              onChange={onChange("email")}
              required
            />

            <input
              placeholder="Phone (optional)"
              className="w-full border border-black/20 rounded-xl px-4 py-3"
              value={form.phone}
              onChange={onChange("phone")}
            />

            <textarea
              rows={4}
              placeholder="Notes (optional)"
              className="w-full border border-black/20 rounded-xl px-4 py-3"
              value={form.notes}
              onChange={onChange("notes")}
            />

            <button
              disabled={!canContinue}
              className={[
                "mt-3 px-6 py-3 rounded-xl font-semibold",
                canContinue
                  ? "bg-black text-white"
                  : "bg-black/30 text-white cursor-not-allowed",
              ].join(" ")}
            >
              Continue to Payment
            </button>
          </form>

          {/* summary */}
          <aside className="lg:col-span-5">
            <div className="bg-black text-white rounded-2xl p-6 sticky top-6">
              <h3 className="text-lg font-semibold">Booking Summary</h3>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Session</span>
                  <span>{selectedSession.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{selectedSession.duration}</span>
                </div>

                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{date || "—"}</span>
                </div>

                <div className="flex justify-between">
                  <span>Time</span>
                  <span>{time || "—"}</span>
                </div>

                <div className="border-t border-white/20 pt-4 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{money(selectedSession.price)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
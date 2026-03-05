import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const hours = useMemo(
    () => [
      { day: "Monday", time: "10am - 11pm" },
      { day: "Tuesday", time: "10am - 11pm" },
      { day: "Wednesday", time: "10am - 11pm" },
      { day: "Thursday", time: "10am - 11pm" },
      { day: "Friday", time: "10am - 11pm" },
      { day: "Saturday", time: "10am - 11pm" },
      { day: "Sunday", time: "12noon - 10pm" },
    ],
    [],
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onChange = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // Wire to your backend later (email / CRM)
    // For now you can route it to mailto if you want.
    // Example:
    // window.location.href = `mailto:Kinewsprints_ng@hotmail.co.uk?subject=Contact%20Request%20-%20${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
  };

  const address =
    "Unit 2, Beechwood House, Milnrow Road, Rochdale, Manchester OL16 2AA";
  const phone = "+44 7486 160965";
  const email = "Kinewsprints_ng@hotmail.co.uk";

  // Google Maps embed (safe, simple)
  const mapSrc =
    "https://www.google.com/maps?q=Unit%202,%20Beechwood%20House,%20Milnrow%20Road,%20Rochdale,%20Manchester%20OL16%202AA&output=embed";

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white py-8">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-14 md:pt-32 md:pb-16">
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
            Contact
          </h1>
          <p className="mt-3 max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
            Reach out for bookings, questions, or custom requests.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* LEFT: CONTACT CARDS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-black/10 bg-white p-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-black/60">
                  Studio
                </p>
                <h2 className="mt-2 text-xl font-semibold">Get in touch</h2>

                <ul className="mt-4 space-y-3 text-sm text-black/70">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-black">Address:</span>{" "}
                    {address}
                  </li>
                  <li>
                    <span className="font-semibold text-black">Phone:</span>{" "}
                    <a
                      className="underline underline-offset-4"
                      href="tel:+447486160965"
                    >
                      {phone}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-black">Email:</span>{" "}
                    <a
                      className="underline underline-offset-4 break-words"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  </li>
                </ul>

                {/* Socials */}
                <div className="mt-6">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-black/60">
                    Social
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href="https://www.instagram.com/kinewsstudioltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-black/10 px-4 py-2 text-sm hover:border-black/25 transition"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://web.facebook.com/profile.php?id=100064556025543&locale=mt_MT#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-black/10 px-4 py-2 text-sm hover:border-black/25 transition"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.tiktok.com/@kinewsstudio.co.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-black/10 px-4 py-2 text-sm hover:border-black/25 transition"
                    >
                      TikTok
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCNEY7P-m85b--rapXa8Zncg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-black/10 px-4 py-2 text-sm hover:border-black/25 transition"
                    >
                      YouTube
                    </a>
                    <a
                      href="https://wa.me/447486160965"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-black/10 px-4 py-2 text-sm hover:border-black/25 transition"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="rounded-3xl border border-black/10 bg-neutral-50 p-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-black/60">
                  Hours
                </p>
                <h3 className="mt-2 text-lg font-semibold">Opening Hours</h3>

                <ul className="mt-4 space-y-2 text-sm text-black/70">
                  {hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="font-medium">{h.day}</span>
                      <span className="text-black/60">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: FORM + MAP */}
            <div className="lg:col-span-7 space-y-4">
              {/* Contact form */}
              <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
                <p className="text-[11px] tracking-[0.2em] uppercase text-black/60">
                  Message
                </p>
                <h2 className="mt-2 text-xl font-semibold">Send a message</h2>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
                      placeholder="Full name"
                      value={form.name}
                      onChange={onChange("name")}
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
                  </div>

                  <textarea
                    className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm placeholder:text-black/35 outline-none focus:border-black/35"
                    rows={6}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={onChange("message")}
                    required
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                    >
                      Send message
                    </button>
                  </div>

                  <p className="text-xs text-black/50">
                    We typically reply within 24 hours.
                  </p>
                </form>
              </div>

              {/* Map */}
              <div className="rounded-3xl border border-black/10 overflow-hidden bg-white">
                <div className="px-6 py-5">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-black/60">
                    Location
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">Find us</h3>
                </div>

                <div className="h-[360px] w-full">
                  <iframe
                    title="Kinews Studio location map"
                    src={mapSrc}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <h2 className="text-2xl font-semibold">Ready to book?</h2>
              <p className="mt-2 text-sm text-white/70">
                Pick a session and secure a slot.
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

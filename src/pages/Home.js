import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { packages, frames } from "../data/Mock";
import heroImage from "../assets/hero-image.png";
import heroImageMobile from "../assets/hero-image-mobile.png";
import eventImg from "../assets/event-coverage.webp";
import framingImg from "../assets/picture-framing.jpg";
import studioImg from "../assets/studio-session.jpg";
import albumImg from "../assets/albums.webp";
import Carousel from "../components/Carousel";
import BookSessionCTA from "../components/BookSessionCTA";

const services = [
  {
    title: "Event Coverage",
    desc: "Photo + video coverage for weddings, birthdays, corporate events, and special celebrations.",
    cta: "Explore coverage →",
    img: eventImg,
    to: "/packages",
  },
  {
    title: "Bespoke Picture Framing",
    desc: "Any size, any style. Custom frames designed to display your best photos beautifully.",
    cta: "Shop frames →",
    img: framingImg,
    to: "/shop",
  },
  {
    title: "Studio Photography Sessions",
    desc: "Modern studio photoshoots for portraits, family shoots, graduations, maternity, and personal branding.",
    cta: "Book a studio session →",
    img: studioImg,
    to: "/book",
  },
  {
    title: "Albums & Prints",
    desc: "Premium photo albums and professional-grade prints to preserve your moments for years to come.",
    cta: "Contact us →",
    img: albumImg,
    to: "/contact",
  },
];

export default function Home() {

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Background image */}
        <picture className="absolute inset-0">
          <source media="(max-width: 767px)" srcSet={heroImageMobile} />
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover object-right md:object-center"
          />
        </picture>

        {/* Dark overlays for luxury contrast */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

        {/* Subtle moving light texture */}
        <motion.div
          className="absolute -inset-40 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_55%)]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl w-full px-6 pt-28 pb-16">
          {/* Left-aligned hero column */}
          <div className="flex flex-col items-start">
            {/* Text */}
            <div className="mt-6 max-w-4xl text-left">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.25] tracking-tight"
                initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                Every moment has a story.
                <motion.span
                  className="block text-white/60"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.35 }}
                >
                  We help you remember it beautifully.
                </motion.span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
              >
                At Kinews Studio Limited, we capture genuine moments with care,
                creativity, and attention to detail.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
            >
              <Link
                to="/book"
                className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black hover:opacity-90 transition"
              >
                Book a Studio Session
              </Link>

              <Link
                to="/packages"
                className="rounded-full border border-white/25 px-7 py-3 text-sm text-white hover:bg-white/10 transition"
              >
                View Event Packages
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white">
        <div className="pt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black leading-tight">
            Bringing your special memories to life.
          </h2>
        </div>
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-14">
          <div className="grid gap-12 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="text-center">
                {/* FRAME */}
                <div className="mx-auto max-w-md">
                  <div
                    className="bg-white p-3 md:p-4 border border-black/10
                    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                    transition duration-500
                    hover:-translate-y-2
                    hover:shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
                  >
                    <div className="bg-neutral-100 p-3">
                      <div className="overflow-hidden">
                        <img
                          src={s.img}
                          alt={s.title}
                          className="h-72 w-full object-cover transition duration-700 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <h3 className="mt-6 text-lg font-semibold tracking-wide text-black">
                  {s.title}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-black/70">
                  {s.desc}
                </p>

               
                <div className="mt-5">
                  <Link
                    to={s.to}
                    className="inline-flex items-center justify-center text-sm font-semibold text-black/80 hover:text-black transition"
                  >
                    {s.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="text-center">
            <div className="text-sm tracking-[0.35em] uppercase text-white/60">
              Event Packages
            </div>

            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              Choose the level of coverage that fits your event.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.id}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center
                hover:bg-white/[0.07] transition duration-300"
              >
                <div className="text-sm tracking-[0.25em] uppercase text-white/50">
                  {p.name}
                </div>

                <div className="mt-4 text-4xl font-semibold">{p.price}</div>

                <p className="mt-4 text-sm text-white/60">{p.tagline}</p>

              
                <Link
                  to="/packages"
                  className="mt-8 inline-flex items-center justify-center text-sm font-medium text-white/80 hover:text-white transition"
                >
                  View full package details →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/packages"
              className="rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:bg-white/10 transition inline-flex"
            >
              Explore All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* FRAMES */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl pt-6">
          <Carousel frames={frames} />
         
        </div>
      </section>

      <BookSessionCTA />
    </div>
  );
}
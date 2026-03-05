import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import studioImage from "../assets/studio-session.jpg";

export default function BookSessionCTA() {
  return (
    <section className="bg-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black">

          {/* Subtle background effects */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="pointer-events-none absolute -left-32 top-0 h-[140%] w-[400px] rotate-12 bg-white/5 blur-3xl" />

          <div className="relative grid items-center gap-16 p-6 md:grid-cols-2 md:p-16">

            {/* LEFT SIDE (Text) */}
            <div>

              <motion.h3
                className="mt-5 text-3xl md:text-4xl font-semibold text-white leading-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Book your photoshoot today!
              </motion.h3>

              <motion.p
                className="mt-5 max-w-lg text-white/70 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Studio portraits, family sessions, branding shoots and more.
              </motion.p>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  to="/book"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-3
                  text-sm font-semibold text-black
                  shadow-[0_12px_40px_rgba(255,255,255,0.15)]
                  hover:opacity-90 transition active:scale-95"
                >
                  Book a Studio Session →
                </Link>
              </motion.div>

            </div>

            {/* RIGHT SIDE (Image) */}
            <div className="relative">
              
              {/* Angled background panel */}
              <div className="absolute -right-8 -top-8 h-[120%] w-[115%] rotate-6 rounded-3xl bg-white/5 border border-white/10" />

              {/* Image container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={studioImage}
                  alt="Studio session"
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                />

                {/* Subtle overlay for luxury contrast */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
              </div>

              {/* Accent vertical line */}
              <div className="absolute -left-3 bottom-12 h-24 w-2 rounded-full bg-white/60" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
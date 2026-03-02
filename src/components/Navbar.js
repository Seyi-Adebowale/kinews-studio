import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.png";

// ✅ Active: pure white + underline
// ✅ Inactive: never pure white (even on hover)
const linkClass = ({ isActive }) =>
  `relative text-xs tracking-[0.1em] uppercase transition-all duration-200 ${
    isActive
      ? "text-white after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-white"
      : "text-white/60 hover:text-white/80"
  }`;

// ✅ Non-routing desktop items (not NavLink, so they won't ever be "active")
const navItemClass =
  "text-xs tracking-[0.1em] uppercase transition-all duration-200 text-white/60 hover:text-white/80";

// ✅ Non-routing mobile items
const mobileItemClass =
  "block py-3 text-sm tracking-[0.12em] uppercase text-white/60 hover:text-white/80 transition";

const mobileLinkClass = ({ isActive }) =>
  `relative block py-3 text-sm tracking-[0.12em] uppercase transition-all duration-200 ${
    isActive
      ? "text-white after:absolute after:left-0 after:-bottom-[2px] after:w-full after:h-[2px] after:bg-white"
      : "text-white/60 hover:text-white/80"
  }`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300 ease-out",
        scrolled
          ? "bg-black border-b border-white/10"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Kinews Studio" className="w-60 h-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>

          {/* Not routing yet -> use buttons so they don't get "active" */}
          <button type="button" className={navItemClass}>
            Event Packages
          </button>
          <button type="button" className={navItemClass}>
            Shop Frames
          </button>
          <button type="button" className={navItemClass}>
            Contact
          </button>
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/book"
          className="hidden md:inline-flex rounded-full bg-white px-10 py-2.5 text-xs font-medium tracking-[0.08em] uppercase text-black
shadow-[0_8px_30px_rgba(255,255,255,0.18)]
hover:shadow-[0_12px_40px_rgba(255,255,255,0.28)]
hover:-translate-y-[1px]
transition-all duration-200"
        >
          Book Session
        </Link>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative h-10 w-10 rounded-full border border-white/15 bg-black/30 flex items-center justify-center"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>

          <span
            className={[
              "absolute h-[2px] w-5 bg-white transition-all duration-300 ease-out",
              open ? "rotate-45 translate-y-0" : "-translate-y-2",
            ].join(" ")}
          />
          <span
            className={[
              "absolute h-[2px] w-5 bg-white transition-all duration-300 ease-out",
              open ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <span
            className={[
              "absolute h-[2px] w-5 bg-white transition-all duration-300 ease-out",
              open ? "-rotate-45 translate-y-0" : "translate-y-2",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-[106px] left-0 right-0 z-50 md:hidden border-t border-white/10 bg-black"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="mx-auto max-w-7xl px-10 py-6">
                <div className="space-y-1">
                  <NavLink to="/" className={mobileLinkClass} end>
                    Home
                  </NavLink>

                  {/* Not routing yet -> buttons */}
                  <button type="button" className={mobileItemClass}>
                    Event Packages
                  </button>
                  <button type="button" className={mobileItemClass}>
                    Shop Frames
                  </button>
                  <button type="button" className={mobileItemClass}>
                    Contact
                  </button>
                </div>

                {/* Mobile CTA inside menu */}
                <div className="mt-6">
                  <Link
                    to="/book"
                    className="inline-flex w-full items-center justify-center rounded-full bg-white px-10 py-3 text-xs font-medium tracking-[0.10em] uppercase text-black
shadow-[0_8px_30px_rgba(255,255,255,0.18)]
hover:shadow-[0_12px_40px_rgba(255,255,255,0.28)]
hover:-translate-y-[1px]
transition-all duration-200"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

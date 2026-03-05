import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCart from "./components/FloatingCart";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import BookSession from "./pages/BookSession";
import EventPackages from "./pages/EventPackages";
import ShopFrames from "./pages/ShopFrames";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

import { CartProvider } from "./context/CartContext";

// ---- Inner app so we can read location (must be inside BrowserRouter) ----
function AppShell() {
  const location = useLocation();

  const [loading, setLoading] = useState(location.pathname === "/");
  const hasShownHomePreloader = useRef(false);

  useEffect(() => {
    if (location.pathname === "/" && !hasShownHomePreloader.current) {
      setLoading(true);
      const t = setTimeout(() => {
        setLoading(false);
        hasShownHomePreloader.current = true;
      }, 1800);
      return () => clearTimeout(t);
    }

    setLoading(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ✅ Always mounted so it works on every navigation */}
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <div key="site">
            <Navbar />

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book" element={<BookSession />} />
                <Route path="/packages" element={<EventPackages />} />
                <Route path="/shop" element={<ShopFrames />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>

            <Footer />
            <FloatingCart />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </CartProvider>
  );
}
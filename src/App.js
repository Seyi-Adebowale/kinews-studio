import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import BookSession from "./pages/BookSession";
import EventPackages from "./pages/EventPackages";
import ShopFrames from "./pages/ShopFrames";
import Contact from "./pages/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800); // adjust timing
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <div key="site">
            <BrowserRouter>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/book" element={<BookSession />} />
                  <Route path="/packages" element={<EventPackages />} />
                  <Route path="/frames" element={<ShopFrames />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
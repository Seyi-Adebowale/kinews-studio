import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }} // faster exit
    >
      {/* Subtle background grain glow (faster loop) */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} // was 4
      />

      <div className="relative text-center">
        {/* ===== CAMERA ICON ===== */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }} // was 0.8
          className="relative mx-auto mb-6 w-28 h-20"
        >
          {/* Camera body */}
          <div className="absolute inset-0 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm" />

          {/* Top viewfinder */}
          <div className="absolute -top-3 left-6 w-12 h-4 rounded-md border border-white/20 bg-white/10" />

          {/* Lens */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-12 h-12 rounded-full border border-white/30 bg-black relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0.18)",
                  "0 0 18px rgba(255,255,255,0.38)",
                  "0 0 0px rgba(255,255,255,0.18)",
                ],
              }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} // was 2
            >
              <div className="absolute inset-2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_70%)]" />
            </motion.div>
          </div>

          {/* Flash pulse (earlier) */}
          <motion.div
            className="absolute inset-0 bg-white rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.75, 0] }}
            transition={{ duration: 0.45, delay: 0.65 }} // was 0.6 delay 1.4
          />
        </motion.div>

        {/* ===== BRAND TEXT (earlier + faster) ===== */}
        <motion.div
          className="text-white text-3xl md:text-5xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }} // was 1 delay 0.5
        >
          Kinews Studio
        </motion.div>
      </div>
    </motion.div>
  );
}
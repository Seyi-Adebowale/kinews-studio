import React from "react";
import LogoImage from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-10 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section with Logo */}
          <div className="flex flex-col items-start">
            <img
              src={LogoImage}
              alt="Dee Delicious Logo"
              className="w-62 h-20 mb-3"
            />
            {/* <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Fresh meals, fast pickup, and a smooth dine-in experience.
            </p> */}
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-bold text-white mb-3">Opening Hours</h4>
            <ul className="space-y-2 text-white/70">
              <li>Monday: 10am - 11pm</li>
              <li>Tuesday: 10am - 11pm</li>
              <li>Wednesday: 10am - 11pm</li>
              <li>Thursday: 10am - 11pm</li>
              <li>Friday: 10am - 11pm</li>
              <li>Saturday: 10am - 11pm</li>
              <li>Sunday: 12noon - 10pm</li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h4 className="font-bold text-white mb-3">Get in touch</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li>Unit 2, Beechwood House, Milnrow Road, Rochdale, Manchester OL16 2AA </li>
              <li>+44 7486 160965 </li>
              <li>Kinewsprints_ng@hotmail.co.uk</li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6 text-white/70">
              <a
                href="https://www.instagram.com/kinewsstudioltd"
                className="hover:text-white transition-colors text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=100064556025543&locale=mt_MT#"
                className="hover:text-white transition-colors text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.tiktok.com/@kinewsstudio.co.uk"
                className="hover:text-white transition-colors text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            <a
                href="https://www.youtube.com/channel/UCNEY7P-m85b--rapXa8Zncg"
                className="hover:text-white transition-colors text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://wa.me/447486160965"
                className="hover:text-white transition-colors text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-sm text-white/60 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p>
            © {new Date().getFullYear()} Kinews Studio Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

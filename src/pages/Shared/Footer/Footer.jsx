import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-90">
        <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo + Description */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <span className="text-2xl font-bold text-white">TB</span>
              </div>
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TicketBari
              </h3>
            </div>
            <p className="text-gray-200 text-base leading-relaxed max-w-xs">
              Book bus, train, launch & flight tickets easily. Fast, secure &
              reliable booking platform for Bangladesh.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-2.483 1.195a4.136 4.136 0 0 0-7.05 3.77C9.636 7.018 5.808 4.837 3.12 1.726c-1.057.837-1.66 2.115-1.66 3.328 0 1.162.591 2.187 1.488 2.787-1.088-.033-2.114-.333-3.016-.83v.053c0 1.62.822 2.963 1.856 3.776-.48.13-.984.2-1.504.2-.367 0-.723-.035-1.07-.102.723 2.258 2.82 3.902 5.306 3.948-1.945 1.523-4.392 2.427-7.05 2.427-.458 0-.91-.027-1.355-.08 2.517 1.613 5.513 2.556 8.728 2.556 10.47 0 16.188-8.677 16.188-16.188 0-.247-.006-.493-.017-.738 1.11-.802 2.076-1.804 2.84-2.944z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71-.02-1.38-.22-1.95-.55v.06c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.83-.6 1.54-1.36 2.11-2.22z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.86 8.14 6.83 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12c0-5.5-4.46-9.96-9.96-9.96z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <NavLink to="/" className="hover:text-[#a78bfa] transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tickets"
                  className="hover:text-[#a78bfa] transition"
                >
                  All Tickets
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="hover:text-[#a78bfa] transition"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-[#a78bfa] transition"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/privacy"
                  className="hover:text-[#a78bfa] transition"
                >
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-gray-200">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@ticketbari.com
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +880 1234 567890
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-2.483 1.195a4.136 4.136 0 0 0-7.05 3.77C9.636 7.018 5.808 4.837 3.12 1.726c-1.057.837-1.66 2.115-1.66 3.328 0 1.162.591 2.187 1.488 2.787-1.088-.033-2.114-.333-3.016-.83v.053c0 1.62.822 2.963 1.856 3.776-.48.13-.984.2-1.504.2-.367 0-.723-.035-1.07-.102.723 2.258 2.82 3.902 5.306 3.948-1.945 1.523-4.392 2.427-7.05 2.427-.458 0-.91-.027-1.355-.08 2.517 1.613 5.513 2.556 8.728 2.556 10.47 0 16.188-8.677 16.188-16.188 0-.247-.006-.493-.017-.738 1.11-.802 2.076-1.804 2.84-2.944z" />
                </svg>
                facebook.com/ticketbari
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">
              Payment Methods
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center hover:bg-white/20 transition">
                <img
                  src="https://i.ibb.co.com/xt2JfgKk/bkash-logo-bkash-logo-with-origami-pink-bird-Ur5y5-Ta5-removebg-preview.png"
                  alt="bKash"
                  className="h-10"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center hover:bg-white/20 transition">
                <img
                  src="https://i.ibb.co.com/PsCb0c0V/Nagad-Logo-wine-removebg-preview.png"
                  alt="Nagad"
                  className="h-10"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center hover:bg-white/20 transition">
                <img
                  src="https://i.ibb.co.com/PsCb0c0V/Nagad-Logo-wine-removebg-preview.png"
                  alt="Rocket"
                  className="h-10"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center hover:bg-white/20 transition">
                <img
                  src="https://i.ibb.co.com/NgxT6HTJ/strip-removebg-preview.png"
                  alt="Card"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-6 py-5 text-center text-gray-300 text-sm md:text-base">
          © 2025 <span className="font-bold text-white">TicketBari</span>. All
          rights reserved. Made with <span className="text-red-500">♥</span> in
          Bangladesh
        </div>
      </div>
    </footer>
  );
};

export default Footer;

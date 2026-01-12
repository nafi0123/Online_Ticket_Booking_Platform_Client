import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (

    <div>
      <footer className="relative overflow-hidden bg-gray-900 text-white">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-90">
        <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <span className="text-2xl font-bold text-white">TB</span>
              </div>
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TicketBari
              </h3>
            </div>
            <p className="text-gray-200 text-base leading-relaxed max-w-full sm:max-w-xs">
              Book bus, train, launch & flight tickets easily. Fast, secure &
              reliable booking platform for Bangladesh.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><NavLink to="/" className="hover:text-[#a78bfa]">Home</NavLink></li>
              <li><NavLink to="/tickets" className="hover:text-[#a78bfa]">All Tickets</NavLink></li>
              <li><NavLink to="/about" className="hover:text-[#a78bfa]">About Us</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-[#a78bfa]">Contact Us</NavLink></li>
              <li><NavLink to="/privacy" className="hover:text-[#a78bfa]">Privacy Policy</NavLink></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-gray-200">
              <li>support@ticketbari.com</li>
              <li>+880 1234 567890</li>
              <li>facebook.com/ticketbari</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-xl font-bold mb-6">Payment Methods</h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex items-center justify-center"
                >
                  <img
                    src="https://i.ibb.co/NgxT6HTJ/strip-removebg-preview.png"
                    alt="payment"
                    className="h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </footer>
    {/* Copyright */}
      <div className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0 py-5 text-center text-gray-300 text-sm">
          © 2025 <span className="font-bold text-white">TicketBari</span>. All
          rights reserved.
        </div>
      </div>
    </div>
    
  );
};

export default Footer;

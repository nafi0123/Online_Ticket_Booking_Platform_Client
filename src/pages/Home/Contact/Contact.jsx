import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaPhoneAlt className="text-3xl" />,
      title: "Phone",
      details: ["+880 1712 345 678", "+880 1912 345 678"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email",
      details: ["support@ticketbari.com", "info@ticketbari.com"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Office",
      details: ["House #12, Road #05", "Dhanmondi, Dhaka-1205", "Bangladesh"],
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, link: "#", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: <FaTwitter />, link: "#", color: "bg-sky-500 hover:bg-sky-600" },
    { icon: <FaInstagram />, link: "#", color: "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90" },
    { icon: <FaLinkedinIn />, link: "#", color: "bg-blue-700 hover:bg-blue-800" },
  ];

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            We're here to help! Reach out to us anytime.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
              <div className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  {item.title}
                </h3>
                <div className="space-y-2">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-300">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form & Map Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Send us a Message
            </h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#667eea] focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#667eea] focus:border-transparent outline-none transition"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#667eea] focus:border-transparent outline-none transition"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Your Message
                </label>
                <textarea
                  rows="6"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#667eea] focus:border-transparent outline-none transition resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Map & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Google Map Embed */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-base-300 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902950676!2d90.381987314980!3d23.756146184589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1690000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Social Links */}
            <div className="bg-base-100 rounded-2xl p-8 shadow-xl border border-base-300">
              <h4 className="text-2xl font-bold mb-6 text-center">
                Connect With Us
              </h4>
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  { icon: <FaFacebookF />, color: "bg-blue-600 hover:bg-blue-700" },
                  { icon: <FaTwitter />, color: "bg-sky-500 hover:bg-sky-600" },
                  { icon: <FaInstagram />, color: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90" },
                  { icon: <FaLinkedinIn />, color: "bg-blue-700 hover:bg-blue-800" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 rounded-full ${social.color} flex items-center justify-center text-white text-2xl transition-all hover:scale-110 hover:shadow-lg`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
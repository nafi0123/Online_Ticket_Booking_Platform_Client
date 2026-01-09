import React from 'react';
import { motion } from 'framer-motion';
import { FaBus, FaTrain, FaShip, FaPlane, FaShieldAlt, FaClock, FaHeadset, FaMoneyBillWave } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaBus className="text-5xl" />,
      title: "Bus Booking",
      description: "Hundreds of AC/Non-AC buses across Bangladesh with real-time seat selection",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaTrain className="text-5xl" />,
      title: "Train Tickets",
      description: "Book intercity & interdistrict trains with confirmed seats",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <FaShip className="text-5xl" />,
      title: "Launch & Ferry",
      description: "River routes with premium & economy classes",
      color: "from-teal-500 to-emerald-500"
    },
    {
      icon: <FaPlane className="text-5xl" />,
      title: "Domestic Flights",
      description: "Fastest way to travel between major cities",
      color: "from-orange-500 to-amber-500"
    },
  ];

  const promises = [
    { icon: <FaShieldAlt />, text: "100% Secure Payments" },
    { icon: <FaClock />, text: "Instant Confirmation" },
    { icon: <FaHeadset />, text: "24/7 Customer Support" },
    { icon: <FaMoneyBillWave />, text: "Best Price Guarantee" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 dark:from-[#667eea]/5 dark:to-[#764ba2]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-4">
              About TicketBari
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Bangladesh's most trusted & modern online ticket booking platform
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To make travel booking in Bangladesh simple, fast, secure, and accessible to everyone. 
              We aim to connect travelers with reliable transport options while empowering vendors 
              with a modern platform to grow their business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To become the most loved and trusted travel booking platform in Bangladesh 
              and expand across South Asia, making every journey memorable and hassle-free.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group"
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-br from-[#667eea]/5 to-[#764ba2]/5 dark:from-gray-900/50 dark:to-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Why Choose TicketBari?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {promises.map((promise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl text-[#667eea] mb-4">
                  {promise.icon}
                </div>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {promise.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="text-center py-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Ready to Travel Smarter?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Join thousands of happy travelers who trust TicketBari for their journeys.
        </p>
        <a
          href="/all-tickets"
          className="inline-block px-12 py-5 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-xl rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Explore All Tickets →
        </a>
      </div>
    </div>
  );
};

export default About;
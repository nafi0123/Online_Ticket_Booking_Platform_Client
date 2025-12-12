import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fast Booking",
      description: "Book your tickets quickly and easily with our platform.",
    },
    {
      title: "Safe & Secure",
      description: "Your payments and personal information are completely secure.",
    },
    {
      title: "24/7 Support",
      description: "Our team is available anytime to help you with your journey.",
    },
    {
      title: "Affordable Prices",
      description: "Get the best routes at the most competitive prices.",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent text-center mb-5">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                bg-white dark:bg-gray-800 
                rounded-xl shadow-lg p-6 
                text-center
                transform transition-transform duration-300 ease-in-out
                hover:scale-105 hover:shadow-2xl
              "
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

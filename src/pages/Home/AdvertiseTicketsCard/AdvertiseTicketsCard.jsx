import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../Loading/Loading";

const AdvertiseTicketsCard = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const { data: advertiseTickets = [], isLoading } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-tickets/advertise-tickets/home-page");
      return res.data;
    },
  });

 
  if (isLoading) return <Loading />;

 
  if (!advertiseTickets || advertiseTickets.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Featured Tickets
          </h1>
          <p className="text-lg text-base-content/70 mt-4 max-w-2xl mx-auto">
            Handpicked premium journeys — specially promoted by our admins just for you!
          </p>
        </div>

        {/* Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertiseTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 transform hover:-translate-y-2"
            >
              {/* Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={ticket.image || "https://i.ibb.co.com/5jxK5hY/placeholder.jpg"}
                  alt={ticket.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <p className="text-4xl font-bold drop-shadow-lg">৳{ticket.price}</p>
                  <p className="text-sm opacity-90">per seat</p>
                </div>

                {/* Featured Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  Featured
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-primary line-clamp-1">
                  {ticket.title}
                </h3>

                <p className="text-lg font-medium flex items-center gap-2">
                  <span className="text-base-content/80">{ticket.from}</span>
                  <span className="text-2xl">→</span>
                  <span className="text-base-content/80">{ticket.to}</span>
                </p>

                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="badge badge-lg badge-primary">{ticket.type}</span>
                  <span className={`badge badge-lg ${ticket.quantity <= 5 ? "badge-error" : "badge-success"}`}>
                    {ticket.quantity} seats left
                  </span>
                </div>

                {/* Perks */}
                {ticket.perks && ticket.perks.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {ticket.perks.map((perk, idx) => (
                      <span
                        key={idx}
                        className="badge badge-outline badge-sm font-medium border-primary text-primary"
                      >
                        {perk === "ac" ? "AC" : perk === "tv" ? "TV" : perk.charAt(0).toUpperCase() + perk.slice(1)}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm text-base-content/70">
                  Departure: {new Date(ticket.departure).toLocaleDateString()} at{" "}
                  {new Date(ticket.departure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                  className="btn btn-lg w-full mt-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                >
                  Book Now
                </button>
              </div>

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertiseTicketsCard;
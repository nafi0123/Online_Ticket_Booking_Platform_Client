import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../Loading/Loading";

const LatestTickets = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const { data: latestTickets = [], isLoading } = useQuery({
    queryKey: ["latest-tickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-tickets/latest-tickets");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!latestTickets || latestTickets.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-b">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Latest Tickets
          </h1>
          <p className="text-lg text-base-content/70 mt-4 max-w-2xl mx-auto">
            Freshly added journeys — just uploaded by our trusted vendors!
          </p>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {latestTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 flex flex-col transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={
                    ticket.image || "https://i.ibb.co/5jxK5hY/placeholder.jpg"
                  }
                  alt={ticket.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 text-white z-10">
                  <p className="text-2xl font-bold drop-shadow-lg">
                    ৳{ticket.price}
                  </p>
                  <p className="text-xs opacity-90">per seat</p>
                </div>

                {/* New Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  New
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-primary line-clamp-1">
                  {ticket.title}
                </h3>

                {/* From → To */}
                <p className="text-sm font-medium flex items-center gap-2 mt-1">
                  <span className="text-base-content/80">{ticket.from}</span>
                  <span className="text-lg">→</span>
                  <span className="text-base-content/80">{ticket.to}</span>
                </p>

                {/* Type & Quantity Badges */}
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  <span className="badge badge-lg badge-primary">
                    {ticket.type}
                  </span>
                  <span
                    className={`badge badge-lg ${
                      ticket.quantity <= 5 ? "badge-error" : "badge-success"
                    }`}
                  >
                    {ticket.quantity} seats left
                  </span>
                </div>

                {/* Perks (show 2 + "more" if extra) */}
                {ticket.perks && ticket.perks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {ticket.perks.slice(0, 2).map((perk, idx) => (
                      <span
                        key={idx}
                        className="badge badge-outline badge-sm font-medium border-primary text-primary"
                      >
                        {perk === "ac"
                          ? "AC"
                          : perk === "tv"
                          ? "TV"
                          : perk.charAt(0).toUpperCase() + perk.slice(1)}
                      </span>
                    ))}
                    {ticket.perks.length > 2 && (
                      <span className="badge badge-outline badge-sm font-medium border-primary text-primary">
                        +{ticket.perks.length - 2} more
                      </span>
                    )}
                  </div>
                )}

                {/* Departure */}
                <p className="text-sm text-base-content/70 mt-2">
                  Departure: {new Date(ticket.departure).toLocaleDateString()}{" "}
                  at{" "}
                  {new Date(ticket.departure).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* Book Now Button */}
                <button
                  onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                  className="btn w-full mt-auto bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTickets;

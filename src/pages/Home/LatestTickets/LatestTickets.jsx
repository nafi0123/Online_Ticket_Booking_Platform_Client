import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

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

  return (
    <div className="p-6">
      {/* Header + Title */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          Latest Tickets
        </h1>
        <p className="text-base-content/70 mt-2">
          Check out the most recent tickets added by our vendors
        </p>
      </header>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden"
          >
            <figure className="h-48">
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body p-6">
              <h3 className="card-title text-xl font-bold">{ticket.title}</h3>
              <p className="text-base-content/70">
                {ticket.from} → {ticket.to}
              </p>
              <p>
                Type: <span className="font-semibold">{ticket.type}</span>
              </p>
              <p>
                Price: <span className="font-bold text-xl">৳{ticket.price}</span>
              </p>
              <p>Seats: {ticket.quantity}</p>

              {ticket.perks && ticket.perks.length > 0 && (
                <p>
                  Perks:{" "}
                  {ticket.perks.map((perk, idx) => (
                    <span key={idx} className="badge badge-outline mr-1">
                      {perk}
                    </span>
                  ))}
                </p>
              )}

              <p>Departure: {new Date(ticket.departure).toLocaleString()}</p>

              <div className="card-actions mt-4">
                <button
                  onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                  className="btn bg-gradient-to-r from-[#667eea] to-[#764ba2]  text-white w-full"
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;

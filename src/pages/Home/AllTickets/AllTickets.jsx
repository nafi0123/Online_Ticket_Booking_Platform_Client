import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transport, setTransport] = useState("");
  const [sort, setSort] = useState("");

  const { data: allTickets = [], isLoading } = useQuery({
    queryKey: ["all-tickets", { from, to, transport, sort }],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-tickets", {
        params: { from, to, transport, sort },
      });
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className=" py-5 ">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
        All Tickets
      </h2>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="input input-bordered"
        />
        <select
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Transport</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Plane">Plane</option>
          <option value="Launch">Launch</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* Tickets Grid */}
      {allTickets.length === 0 ? (
        <div className="text-center py-10 text-2xl text-base-content/50">
          No tickets found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden"
            >
              {/* Image */}
              <figure className="h-48">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Card Body */}
              <div className="card-body p-6">
                <h3 className="card-title text-xl font-bold">{ticket.title}</h3>
                <p className="text-base-content/70">
                  {ticket.from} → {ticket.to}
                </p>
                <p>
                  Type: <span className="font-semibold">{ticket.type}</span>
                </p>
                <p>
                  Price:{" "}
                  <span className="font-bold text-xl">৳{ticket.price}</span>
                </p>
                <p>Seats: {ticket.quantity}</p>

                {/* Perks */}
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

                {/* Departure */}
                <p>Departure: {new Date(ticket.departure).toLocaleString()}</p>

                {/* See Details Button */}
                <div className="card-actions mt-4">
                  <button
                    onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                    className="btn btn-primary text-white w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTickets;

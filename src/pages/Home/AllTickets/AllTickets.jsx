import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Input fields (for typing only)
  const [inputFrom, setInputFrom] = useState("");
  const [inputTo, setInputTo] = useState("");

  // Actual filter values sent to backend
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transport, setTransport] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const ticketsPerPage = 8;

  // Query with all filters
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["all-tickets", searchFrom, searchTo, transport, sort, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchFrom) params.append("from", searchFrom);
      if (searchTo) params.append("to", searchTo);
      if (transport) params.append("transport", transport);
      if (sort) params.append("sort", sort);
      params.append("page", page);
      params.append("limit", ticketsPerPage);

      const res = await axiosSecure.get(`/all-tickets?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true, // Important for smooth pagination
  });

  // Handle Search (triggered by button or Enter)
  const handleSearch = () => {
    setSearchFrom(inputFrom.trim());
    setSearchTo(inputTo.trim());
    setPage(1); // Reset to first page
  };

  // Enter key support
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Default data fallback
  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  return (
    <div className="py-8 px-4 min-h-screen bg-base-200">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
        All Available Tickets
      </h2>

      {/* Filters + Search Button */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* From */}
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <input
              type="text"
              placeholder="e.g. Dhaka"
              value={inputFrom}
              onChange={(e) => setInputFrom(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input input-bordered input-lg w-full"
            />
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <input
              type="text"
              placeholder="e.g. Cox's Bazar"
              value={inputTo}
              onChange={(e) => setInputTo(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input input-bordered input-lg w-full"
            />
          </div>

          {/* Transport */}
          <div>
            <label className="block text-sm font-medium mb-1">Transport</label>
            <select
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className="select select-bordered select-lg w-full"
            >
              <option value="">All Types</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Plane">Plane</option>
              <option value="Launch">Launch</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select select-bordered select-lg w-full"
            >
              <option value="">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              onClick={handleSearch}
              className="btn btn-lg w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Search
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-base-content/60 mt-3">
          Press Enter or click Search to apply filters
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loading />
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-3xl font-bold text-base-content/40">
            No tickets found
          </p>
          <p className="text-lg mt-4 text-base-content/60">
            Try adjusting your search filters
          </p>
        </div>
      ) : (
        <>
          {/* Tickets Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 rounded-2xl overflow-hidden group"
                >
                  <figure className="h-56 relative overflow-hidden">
                    <img
                      src={
                        ticket.image ||
                        "https://i.ibb.co.com/5jxK5hY/placeholder.jpg"
                      }
                      alt={ticket.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-3xl font-bold">৳{ticket.price}</p>
                      <p className="text-sm opacity-90">per seat</p>
                    </div>
                  </figure>

                  <div className="card-body p-6">
                    <h3 className="card-title text-2xl font-bold text-primary">
                      {ticket.title}
                    </h3>
                    <p className="text-lg font-medium">
                      {ticket.from} to {ticket.to}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                      <p>
                        <strong>Type:</strong> {ticket.type}
                      </p>
                      <p>
                        <strong>Seats Left:</strong>{" "}
                        <span
                          className={
                            ticket.quantity <= 5
                              ? "text-red-500 font-bold"
                              : "text-green-500 font-bold"
                          }
                        >
                          {ticket.quantity}
                        </span>
                      </p>
                      <p className="text-xs opacity-75">
                        Departure: {new Date(ticket.departure).toLocaleString()}
                      </p>
                    </div>

                    <div className="card-actions mt-6">
                      <button
                        onClick={() =>
                          navigate(`/ticket-details/${ticket._id}`)
                        }
                        className="btn btn-lg w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="btn btn-outline"
              >
                Previous
              </button>

              <span className="px-4 py-2 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="btn btn-outline"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Optional: Show fetching spinner during background refetch */}
      {isFetching && !isLoading && (
        <div className="fixed bottom-4 right-4 z-50">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
    </div>
  );
};

export default AllTickets;

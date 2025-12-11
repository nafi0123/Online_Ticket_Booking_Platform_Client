import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";

const ManageTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets?status=pending");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleApprove = (ticket) => {
    Swal.fire({
      title: "Approve Ticket?",
      text: "This ticket will become available for customers.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, approve",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tickets/${ticket._id}/role`, { status: "approve" })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Ticket Approved!",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          });
      }
    });
  };

  // Reject Ticket
  const handleReject = (ticket) => {
    Swal.fire({
      title: "Reject Ticket?",
      text: "This ticket will be hidden from the platform.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tickets/${ticket._id}/role`, { status: "reject" })
          .then(() => {
            Swal.fire({
              icon: "error",
              title: "Ticket Rejected",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Manage Tickets
          </h2>
          <p className="mt-4 text-xl text-base-content/70">
            Review and approve vendor-submitted tickets
          </p>
        </div>

        {/* No Tickets */}
        {tickets.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-3xl text-base-content/60">
              No pending tickets to review
            </p>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-lg">
                    <tr>
                      <th className="p-6">Image</th>
                      <th>Title & Route</th>
                      <th>Type</th>
                      <th>Price & Seats</th>
                      <th>Departure</th>
                      <th>Perks</th>
                      <th>Vendor</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket._id}
                        className="hover:bg-base-200 transition"
                      >
                        <td className="p-4">
                          <img
                            src={ticket.image}
                            alt={ticket.title}
                            className="w-20 h-20 object-cover rounded-lg ring-2 ring-base-300"
                          />
                        </td>

                        <td>
                          <div className="font-bold text-base-content">
                            {ticket.title}
                          </div>
                          <div className="text-sm text-base-content/70">
                            {ticket.from} → {ticket.to}
                          </div>
                        </td>

                        <td>
                          <span className="badge badge-lg badge-primary">
                            {ticket.type}
                          </span>
                        </td>

                        <td>
                          <div className="font-bold text-lg text-base-content">
                            ৳{ticket.price}
                          </div>
                          <div className="text-sm text-base-content/70">
                            {ticket.quantity} seats
                          </div>
                        </td>

                        <td>
                          <div className="font-medium text-base-content">
                            {new Date(ticket.departure).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-base-content/70">
                            {new Date(ticket.departure).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        <td>
                          <div className="flex flex-wrap gap-2">
                            {ticket.perks?.map((perk, i) => (
                              <span
                                key={i}
                                className="badge badge-sm badge-success text-white"
                              >
                                {perk === "ac"
                                  ? "AC"
                                  : perk === "tv"
                                  ? "TV"
                                  : perk.charAt(0).toUpperCase() +
                                    perk.slice(1)}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td>
                          <div className="font-medium text-base-content">
                            {ticket.vendorName}
                          </div>
                          <div className="text-xs text-base-content/60">
                            {ticket.vendorEmail}
                          </div>
                        </td>

                        <td>
                          <div className="flex gap-3 justify-center">
                            {/* APPROVE BUTTON */}
                            <button
                              onClick={() => handleApprove(ticket)}
                              className="btn btn-success btn-sm text-white flex items-center gap-2"
                            >
                              <FaCheck /> Approve
                            </button>

                            {/* REJECT BUTTON */}
                            <button
                              onClick={() => handleReject(ticket)}
                              className="btn btn-error btn-sm text-white flex items-center gap-2"
                            >
                              <FaTimes /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;

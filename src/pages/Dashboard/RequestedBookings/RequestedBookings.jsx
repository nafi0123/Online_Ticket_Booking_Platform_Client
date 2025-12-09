import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const RequestedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

 
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vendor-booking-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/book-ticket?vendor_email=${user.email}&status=Pending`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;


  const handleAccept = async (booking) => {
    const result = await Swal.fire({
      title: "Accept Booking?",
      text: `Approve ${booking.quantity} tickets for ${booking.email}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    await axiosSecure.patch(`/update-booking/${booking._id}`, {
      status: "Accepted",
    });

    Swal.fire("Accepted!", "The booking was approved", "success");
    refetch();
  };


  const handleReject = async (booking) => {
    const result = await Swal.fire({
      title: "Reject Booking?",
      text: `Reject booking request from ${booking.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    await axiosSecure.patch(`/update-booking/${booking._id}`, {
      status: "Rejected",
    });

    Swal.fire("Rejected", "The booking was rejected", "error");
    refetch();
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Booking Requests
          </h2>
          <p className="mt-4 text-xl text-base-content/70">
            Review and manage user booking requests
          </p>

          <div
            className="mt-4 inline-block px-6 py-3 bg-yellow-500/20 text-yellow-600 
            dark:text-yellow-400 rounded-full font-bold text-lg border border-yellow-500/50"
          >
            {bookings.length} Pending
          </div>
        </div>

        {/* No Requests */}
        {bookings.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-3xl text-base-content/60">
              No pending booking requests
            </p>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-lg">
                    <tr>
                      <th>User</th>
                      <th>Ticket Title</th>
                      <th>Qty</th>
                      <th>Total Price</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id} className="hover:bg-base-200 transition">
                        <td>
                          <div className="font-bold">{b.email}</div>
                        </td>

                        <td className="font-medium">
                          {b.title || "Untitled Ticket"}
                        </td>

                        <td className="font-bold">{b.quantity}</td>

                        <td className="font-bold text-lg">৳{b.price}</td>

                        <td>
                          <div className="flex gap-3 justify-center">
                            {/* ACCEPT BUTTON */}
                            <button
                              onClick={() => handleAccept(b)}
                              className="btn btn-success btn-sm text-white flex items-center gap-2"
                            >
                              <FaCheck /> Accept
                            </button>

                            {/* REJECT BUTTON */}
                            <button
                              onClick={() => handleReject(b)}
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

export default RequestedBookings;

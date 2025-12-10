import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";

const MyBookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["user-booked-tickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // For storing countdown values
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = {};

      bookings.forEach((b) => {
        const departure = new Date(b.departure).getTime();
        const now = Date.now();
        const diff = departure - now;

        if (diff <= 0) {
          updated[b._id] = "Expired";
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);

          updated[b._id] = `${hours}h ${mins}m ${secs}s`;
        }
      });

      setCountdowns(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, [bookings]);

  const handlePayment = async (ticket) => {
    const paymentInfo = {
      title: ticket.title,
      image: ticket.image,
      ticketId: ticket.ticketId, // vendor ticket _id
      buyerTicketId: ticket._id, // buyer ticket _id — important!
      buyerName: ticket.buyerName,
      quantity: ticket.quantity,
      status: ticket.status,
      email: ticket.email,
      vendor_email: ticket.vendor_email,
      price: ticket.price,
      from: ticket.from,
      to: ticket.to,
      departure: ticket.departure,
      createdAt: ticket.createdAt,
      trackId: ticket.trackId,
    };

    console.log("PAYMENT INFO", paymentInfo);

    try {
      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo
      );
      window.location.assign(res.data.url);
    } catch (error) {
      console.error(
        "Payment checkout failed:",
        error.response?.data || error.message
      );
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Your Booked Tickets
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-xl opacity-70 mt-20">
            You haven't booked any tickets yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((ticket) => (
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
                  {/* Title */}
                  <h3 className="card-title text-xl font-bold">
                    {ticket.title}
                  </h3>

                  {/* Route */}
                  <p className="text-base-content/70">
                    {ticket.from} → {ticket.to}
                  </p>

                  {/* Quantity & Price */}
                  <p className="font-medium">Quantity: {ticket.quantity}</p>

                  <p className="font-bold text-xl">
                    Total Price: ৳{ticket.price * ticket.quantity}
                  </p>

                  {/* Departure */}
                  <p>
                    Departure:{" "}
                    <span className="font-semibold">
                      {new Date(ticket.departure).toLocaleString()}
                    </span>
                  </p>

                  {/* STATUS BADGE */}
                  <div className="mt-2">
                    <span
                      className={`badge p-3 text-white ${
                        ticket.status === "Accepted"
                          ? "badge-success"
                          : ticket.status === "Rejected"
                          ? "badge-error"
                          : ticket.status === "paid"
                          ? "badge-primary"
                          : "badge-warning"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  {/* COUNTDOWN — shown only if NOT rejected */}
                  {ticket.status !== "Rejected" && ticket.status !== "paid" && (
                    <p className="mt-2 font-bold text-blue-600">
                      Countdown:{" "}
                      {countdowns[ticket._id] === "Expired"
                        ? "Time Over"
                        : countdowns[ticket._id] || "..."}
                    </p>
                  )}

                  {/* PAY NOW button */}
                  {ticket.status === "Accepted" &&
                    countdowns[ticket._id] !== "Expired" && (
                      <button
                        onClick={() => handlePayment(ticket)}
                        className="btn bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white w-full mt-4"
                      >
                        Pay Now
                      </button>
                    )}

                  {/* If expired → disable payment */}
                  {ticket.status === "Accepted" &&
                    countdowns[ticket._id] === "Expired" && (
                      <p className="text-red-500 font-semibold mt-4">
                        Payment not allowed — time over.
                      </p>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookedTickets;

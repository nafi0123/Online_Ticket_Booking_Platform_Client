import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ViewDetailsCard = () => {
  const ticket = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  console.log(user);
  const [countdown, setCountdown] = useState("");
  const [bookingQty, setBookingQty] = useState(1);
  const [qtyError, setQtyError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Detect theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const departureTime = new Date(ticket.departure).getTime();
      const distance = departureTime - now;

      if (distance <= 0) {
        setCountdown("Departed");
        return clearInterval(interval);
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket.departure]);

  const handleQtyChange = (value) => {
    const qty = Number(value);
    setBookingQty(qty);
    if (qty < 1) setQtyError("Minimum 1 ticket required");
    else if (qty > ticket.quantity)
      setQtyError(`Only ${ticket.quantity} seats left`);
    else setQtyError("");
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (qtyError || bookingQty < 1 || bookingQty > ticket.quantity) return;

    const result = await Swal.fire({
      title: "Confirm Booking?",
      html: `<strong>${bookingQty} × ${
        ticket.title
      }</strong><br>Total: <strong>৳${bookingQty * ticket.price}</strong>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#667eea",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Book Now!",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    });

    if (!result.isConfirmed) return;

    setIsSubmitting(true);
    try {
      const res = await axiosSecure.post("/book-ticket", {
        title: ticket.title,
        image:ticket.image,
        ticketId: ticket._id,
        buyerName: user?.displayName,
        quantity: bookingQty,
        status: "Pending",
        email: user?.email,
        vendor_email: ticket.vendorEmail,
        price: bookingQty * ticket.price,
        from: ticket.from,
        to: ticket.to,
        departure: ticket.departure,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Booked Successfully!",
          timer: 2000,
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#f3f4f6" : "#1f2937",
        });
        setIsModalOpen(false);
        setBookingQty(1);
        setQtyError("");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: err.response?.data?.message || "Please try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSoldOut = ticket.quantity === 0 || countdown === "Departed";

  return (
    <div
      className={`min-h-screen py-8 px-4 ${
        theme === "dark" ? "bg-gray-900" : "bg-base-200"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`card shadow-2xl border overflow-hidden rounded-2xl ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-base-100 border-base-300"
          }`}
        >
          {/* Image */}
          <figure className="h-64 md:h-80">
            <img
              src={ticket.image || "/placeholder-ticket.jpg"}
              alt={ticket.title}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold">{ticket.title}</h2>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-base-content/70"
              } text-xl`}
            >
              {ticket.from} → {ticket.to}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              {[
                ["Type", ticket.type],
                ["Price", `৳${ticket.price}`],
                ["Seats Left", ticket.quantity],
                ["Status", ticket.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-base-200"
                  } rounded-lg p-4 text-center`}
                >
                  <div className="text-sm opacity-70">{label}</div>
                  <div className="font-bold text-lg">{value}</div>
                </div>
              ))}
            </div>

            {/* Departure & Countdown */}
            <div className="space-y-3 text-center py-4">
              <p className="text-lg">
                <strong>Departure:</strong>{" "}
                {new Date(ticket.departure).toLocaleString()}
              </p>
              <p
                className={`text-2xl font-bold ${
                  countdown === "Departed"
                    ? "text-red-500 animate-pulse"
                    : "text-primary"
                }`}
              >
                {countdown === "Departed" ? "Departed" : countdown}
              </p>
            </div>

            {/* Book Button */}
            <div className="card-actions justify-center mt-8">
              <button
                disabled={isSoldOut}
                onClick={() => setIsModalOpen(true)}
                className={`btn btn-lg w-full md:w-auto px-12 text-white font-bold text-xl ${
                  isSoldOut
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:shadow-2xl hover:scale-105 transition-all duration-300"
                }`}
              >
                {isSoldOut ? "Sold Out / Departed" : "Book Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal modal-open" role="dialog">
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-base-100 text-black border-base-300"
              } modal-box border rounded-2xl`}
            >
              <h3 className="text-2xl font-bold text-center mb-6">
                Confirm Your Booking
              </h3>

              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div>
                  <label className="block font-medium mb-2">
                    How many tickets?
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={ticket.quantity}
                    value={bookingQty}
                    onChange={(e) => handleQtyChange(e.target.value)}
                    className="input input-bordered input-lg w-full"
                    required
                  />
                  {qtyError && (
                    <p className="text-red-500 text-sm mt-1">{qtyError}</p>
                  )}
                </div>

                <div
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-base-200"
                  } text-xl font-bold text-center py-4 rounded-lg`}
                >
                  Total: ৳{bookingQty * ticket.price}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || qtyError}
                  className="btn btn-lg w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-xl disabled:opacity-60"
                >
                  {isSubmitting ? "Processing..." : "Confirm & Book"}
                </button>
              </form>

              <div className="modal-action">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetailsCard;

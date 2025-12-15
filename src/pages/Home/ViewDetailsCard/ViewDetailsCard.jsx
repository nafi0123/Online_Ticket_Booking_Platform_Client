import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ViewDetailsCard = () => {
  const ticket = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [countdown, setCountdown] = useState("");
  const [bookingQty, setBookingQty] = useState(1);
  const [qtyError, setQtyError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [theme, setTheme] = useState("light");

  /* ---------------- Theme Detect ---------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark");
    }
  }, []);

  /* ---------------- Countdown ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const departure = new Date(ticket.departure).getTime();
      const diff = departure - now;

      if (diff <= 0) {
        setCountdown("Departed");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket.departure]);

  /* ---------------- Qty Handle ---------------- */
  const handleQtyChange = (value) => {
    const qty = Number(value);
    setBookingQty(qty);

    if (qty < 1) setQtyError("Minimum 1 ticket required");
    else if (qty > ticket.quantity)
      setQtyError(`Only ${ticket.quantity} seats left`);
    else setQtyError("");
  };

  /* ---------------- Submit ---------------- */
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (qtyError || bookingQty < 1 || bookingQty > ticket.quantity) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity!",
        text: qtyError || "Please select valid ticket quantity",
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        color: theme === "dark" ? "#f3f4f6" : "#1f2937",
      });
      return;
    }

    // ✅ Close DaisyUI modal first
    document.getElementById("booking_modal").close();

    // ✅ Confirm Alert
    const confirm = await Swal.fire({
      title: "Confirm Booking?",
      html: `<b>${bookingQty} × ${ticket.title}</b><br/>
             Total: <b>৳${bookingQty * ticket.price}</b>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Book Now!",
      cancelButtonText: "Cancel",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    });

    if (!confirm.isConfirmed) return;

    setIsSubmitting(true);

    try {
      const res = await axiosSecure.post("/book-ticket", {
        ticketId: ticket._id,
        title: ticket.title,
        image: ticket.image,
        buyerName: user?.displayName,
        email: user?.email,
        quantity: bookingQty,
        price: bookingQty * ticket.price,
        from: ticket.from,
        to: ticket.to,
        departure: ticket.departure,
        vendor_email: ticket.vendorEmail,
        status: "Pending",
      });

      console.log("Booking response:", res.data);

      // ✅ Fixed success check
      if (res.data.insertedId || res.data.acknowledged === true) {
        Swal.fire({
          icon: "success",
          title: "Booked Successfully!",
          text: "Your ticket has been booked successfully.",
          timer: 2000,
          showConfirmButton: false,
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#f3f4f6" : "#1f2937",
        });

        setBookingQty(1);
        setQtyError("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Failed!",
          text: res.data.message || "Something went wrong",
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#f3f4f6" : "#1f2937",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: err.response?.data?.message || "Network error. Try again.",
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        color: theme === "dark" ? "#f3f4f6" : "#1f2937",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSoldOut = ticket.quantity === 0 || countdown === "Departed";

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-2xl rounded-2xl">
          {/* Image */}
          <figure className="h-72">
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body">
            <h2 className="text-3xl font-bold">{ticket.title}</h2>
            <p className="text-lg opacity-70">
              {ticket.from} → {ticket.to}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              {[
                ["Type", ticket.type],
                ["Price", `৳${ticket.price}`],
                ["Seats", ticket.quantity],
                ["Status", ticket.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-base-200 p-4 rounded-lg text-center"
                >
                  <p className="opacity-70 text-sm">{label}</p>
                  <p className="font-bold">{value}</p>
                </div>
              ))}
            </div>

            <div className="text-center space-y-2">
              <p>
                <b>Departure:</b> {new Date(ticket.departure).toLocaleString()}
              </p>
              <p
                className={`text-2xl font-bold ${
                  countdown === "Departed" ? "text-red-500" : "text-primary"
                }`}
              >
                {countdown}
              </p>
            </div>

            <div className="card-actions justify-center mt-8">
              <button
                disabled={isSoldOut}
                onClick={() =>
                  document.getElementById("booking_modal").showModal()
                }
                className="btn btn-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
              >
                {isSoldOut ? "Sold Out / Departed" : "Book Now"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= Modal ================= */}
        <dialog id="booking_modal" className="modal">
          <div className="modal-box rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-6">
              Confirm Your Booking
            </h3>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <input
                type="number"
                min="1"
                max={ticket.quantity}
                value={bookingQty}
                onChange={(e) => handleQtyChange(e.target.value)}
                className="input input-bordered w-full"
              />

              {qtyError && <p className="text-red-500 text-sm">{qtyError}</p>}

              <div className="bg-base-200 p-4 rounded-lg text-center font-bold">
                Total: ৳{bookingQty * ticket.price}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || qtyError}
                className="btn btn-lg w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
              >
                {isSubmitting ? "Processing..." : "Confirm & Book"}
              </button>
            </form>

            <div className="modal-action">
              <form method="dialog" className="w-full">
                <button className="btn btn-outline w-full">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ViewDetailsCard;

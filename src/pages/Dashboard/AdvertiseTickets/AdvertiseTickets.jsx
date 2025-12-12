import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [theme, setTheme] = useState("light");

  const {
    data: advertiseTickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-tickets/advertise-tickets");
      return res.data;
    },
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const handleAdvertise = async (ticket) => {
    try {
      const { value: confirm } = await Swal.fire({
        title: ticket.advertise ? "Unadvertise Ticket?" : "Advertise Ticket?",
        text: ticket.advertise
          ? "This ticket will be removed from advertisement."
          : "This ticket will appear in the homepage advertisement section.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#dc2626",
        confirmButtonText: ticket.advertise
          ? "Yes, unadvertise"
          : "Yes, advertise",

        // 🔥 DARK / LIGHT AUTO APPLY
        customClass: {
          popup: theme === "dark" ? "swal-dark" : "swal-light",
        },
      });

      if (confirm) {
        const res = await axiosSecure.patch(
          `/tickets/${ticket._id}/advertise`,
          { advertise: !ticket.advertise }
        );

        if (res.data?.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: `Ticket ${
              ticket.advertise ? "Unadvertised" : "Advertised"
            }!`,
            timer: 1200,
            showConfirmButton: false,
            customClass: {
              popup: theme === "dark" ? "swal-dark" : "swal-light",
            },
          });
          refetch();
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Something went wrong!",
        customClass: {
          popup: theme === "dark" ? "swal-dark" : "swal-light",
        },
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
        Advertise Tickets
      </h2>

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
                  <th className="text-center">Advertise</th>
                </tr>
              </thead>

              <tbody>
                {advertiseTickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-base-200 transition">
                    {/* IMAGE */}
                    <td className="p-4">
                      <img
                        src={ticket.image}
                        alt={ticket.title}
                        className="w-20 h-20 object-cover rounded-lg ring-2 ring-base-300"
                      />
                    </td>

                    {/* TITLE + ROUTE */}
                    <td>
                      <div className="font-bold text-base-content">
                        {ticket.title}
                      </div>
                      <div className="text-sm text-base-content/70">
                        {ticket.from} → {ticket.to}
                      </div>
                    </td>

                    {/* TYPE */}
                    <td>
                      <span className="badge badge-lg badge-primary">
                        {ticket.type}
                      </span>
                    </td>

                    {/* PRICE + SEATS */}
                    <td>
                      <div className="font-bold text-lg text-base-content">
                        ৳{ticket.price}
                      </div>
                      <div className="text-sm text-base-content/70">
                        {ticket.quantity} seats
                      </div>
                    </td>

                    {/* DEPARTURE */}
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

                    {/* PERKS */}
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
                              : perk.charAt(0).toUpperCase() + perk.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* VENDOR */}
                    <td>
                      <div className="font-medium text-base-content">
                        {ticket.vendorName}
                      </div>
                      <div className="text-xs text-base-content/60">
                        {ticket.vendorEmail}
                      </div>
                    </td>

                    {/* ADVERTISE TOGGLE BUTTON */}
                    <td className="text-center">
                      <button
                        onClick={() => handleAdvertise(ticket)}
                        className={`btn btn-sm ${
                          ticket.advertise
                            ? "btn-success text-white"
                            : "btn-outline"
                        }`}
                      >
                        {ticket.advertise ? "Yes" : "No"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseTickets;

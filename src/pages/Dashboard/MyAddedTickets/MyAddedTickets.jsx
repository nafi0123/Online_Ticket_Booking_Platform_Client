import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [perksState, setPerksState] = useState({
    ac: false,
    breakfast: false,
    wifi: false,
    tv: false,
    water: false,
    charging: false,
  });
  const [isRejectedModal, setIsRejectedModal] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const { data: myTickets = [], isLoading, refetch } = useQuery({
    queryKey: ["my-added-tickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?vendorEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdateClick = (ticket) => {
    // Check status for both "reject" and "rejected"
    const rejected = ["reject", "rejected"].includes((ticket.status || "").toLowerCase());
    setIsRejectedModal(rejected);

    setSelectedTicket(ticket);

    const perksObj = {
      ac: ticket.perks?.includes("ac") || false,
      breakfast: ticket.perks?.includes("breakfast") || false,
      wifi: ticket.perks?.includes("wifi") || false,
      tv: ticket.perks?.includes("tv") || false,
      water: ticket.perks?.includes("water") || false,
      charging: ticket.perks?.includes("charging") || false,
    };
    setPerksState(perksObj);

    reset({
      title: ticket.title || "",
      type: ticket.type || "",
      from: ticket.from || "",
      to: ticket.to || "",
      departure: ticket.departure ? ticket.departure.slice(0, 16) : "",
      price: ticket.price || "",
      quantity: ticket.quantity || "",
    });

    setModalOpen(true);
  };

  const handlePerkChange = (e) => {
    const { name, checked } = e.target;
    setPerksState((prev) => ({ ...prev, [name]: checked }));
  };

  const onSubmit = async (data) => {
    if (!selectedTicket || isRejectedModal) return;

    const perksArray = Object.keys(perksState).filter((key) => perksState[key]);

    try {
      const res = await axiosSecure.patch(`/tickets/${selectedTicket._id}`, {
        ...data,
        perks: perksArray,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Ticket updated successfully.", "success");
        refetch();
        setModalOpen(false);
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update ticket.", "error");
    }
  };

  const handleDelete = (ticket) => {
    const rejected = ["reject", "rejected"].includes((ticket.status || "").toLowerCase());
    if (rejected) return;

    Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tickets/${ticket._id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Ticket has been removed.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error!", "Could not delete ticket.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
        My Added Tickets
      </h2>

      {myTickets.length === 0 ? (
        <div className="text-center py-32 text-3xl text-base-content/50">
          No tickets added yet.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myTickets.map((ticket) => {
            const isRejected = ["reject", "rejected"].includes((ticket.status || "").toLowerCase());

            const statusStyle =
              ticket.status === "pending"
                ? "bg-yellow-500 text-white"
                : ticket.status === "approved"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white";

            return (
              <div
                key={ticket._id}
                className={`card bg-base-100 shadow-2xl border border-base-300 overflow-hidden ${
                  isRejected ? "opacity-70 pointer-events-none" : ""
                }`}
              >
                <figure className="h-48">
                  <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
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
                  <p>Departure: {new Date(ticket.departure).toLocaleString()}</p>

                  <div className="mt-4">
                    <span className={`badge badge-lg ${statusStyle} font-bold`}>
                      {ticket.status?.toUpperCase() || "PENDING"}
                    </span>
                  </div>

                  <div className="card-actions mt-6 flex gap-4">
                    <button
                      onClick={() => handleUpdateClick(ticket)}
                      disabled={isRejected}
                      className={`flex-1 btn text-white font-bold ${
                        isRejected
                          ? "bg-gray-500 cursor-not-allowed opacity-60"
                          : "bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 shadow-lg"
                      }`}
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(ticket)}
                      disabled={isRejected}
                      className={`flex-1 btn text-white font-bold ${
                        isRejected
                          ? "bg-gray-500 cursor-not-allowed opacity-60"
                          : "bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90 shadow-lg"
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

          <div className="relative bg-base-100 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 border border-base-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Update Ticket
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-ghost btn-circle text-base-content"
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {["title", "type", "from", "to", "price", "quantity", "departure"].map((field, i) => (
                  <div key={i}>
                    <label className="block font-semibold mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    {field === "type" ? (
                      <select {...register("type")} className="select select-bordered w-full h-14" disabled={isRejectedModal}>
                        <option>Bus</option>
                        <option>Train</option>
                        <option>Launch</option>
                        <option>Plane</option>
                      </select>
                    ) : (
                      <input
                        {...register(field)}
                        type={field === "price" || field === "quantity" ? "number" : field === "departure" ? "datetime-local" : "text"}
                        className="input input-bordered w-full h-14"
                        disabled={isRejectedModal}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Perks */}
              <div className="bg-base-200 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4">Perks & Facilities</h4>
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(perksState).map((perk) => (
                    <label key={perk} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name={perk}
                        checked={perksState[perk]}
                        onChange={handlePerkChange}
                        className="checkbox checkbox-primary"
                        disabled={isRejectedModal}
                      />
                      <span className="capitalize font-medium">{perk === "ac" ? "AC" : perk === "tv" ? "TV" : perk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Current Image */}
              <div>
                <label className="block font-semibold mb-2">Current Image</label>
                <img src={selectedTicket.image} alt="Current" className="w-full max-w-md rounded-xl shadow-lg" />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold"
                  disabled={isRejectedModal}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;

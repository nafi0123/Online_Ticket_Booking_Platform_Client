import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const getSwalTheme = () => ({
    popup: theme === "dark" ? "swal-dark" : "swal-light",
  });

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isRejectedModal, setIsRejectedModal] = useState(false);

  const [perksState, setPerksState] = useState({
    ac: false,
    breakfast: false,
    wifi: false,
    tv: false,
    water: false,
    charging: false,
  });

  const { register, handleSubmit, reset } = useForm();

  const {
    data: myTickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-added-tickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?vendorEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdateClick = (ticket) => {
    const rejected = ["reject", "rejected"].includes(
      (ticket.status || "").toLowerCase()
    );

    setIsRejectedModal(rejected);
    setSelectedTicket(ticket);

    setPerksState({
      ac: ticket.perks?.includes("ac"),
      breakfast: ticket.perks?.includes("breakfast"),
      wifi: ticket.perks?.includes("wifi"),
      tv: ticket.perks?.includes("tv"),
      water: ticket.perks?.includes("water"),
      charging: ticket.perks?.includes("charging"),
    });

    reset({
      title: ticket.title,
      type: ticket.type,
      from: ticket.from,
      to: ticket.to,
      departure: ticket.departure?.slice(0, 16),
      price: ticket.price,
      quantity: ticket.quantity,
    });

    setModalOpen(true);
  };

  const handlePerkChange = (e) => {
    const { name, checked } = e.target;
    setPerksState((prev) => ({ ...prev, [name]: checked }));
  };

  const onSubmit = async (data) => {
    if (!selectedTicket || isRejectedModal) return;

    const perksArray = Object.keys(perksState).filter((k) => perksState[k]);

    try {
      const res = await axiosSecure.patch(`/tickets/${selectedTicket._id}`, {
        ...data,
        perks: perksArray,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Ticket updated successfully.",
          icon: "success",
          customClass: getSwalTheme(),
        });
        refetch();
        setModalOpen(false);
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Failed to update ticket.",
        icon: "error",
        customClass: getSwalTheme(),
      });
    }
  };

  const handleDelete = (ticket) => {
    if (["reject", "rejected"].includes(ticket.status?.toLowerCase())) return;

    Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: getSwalTheme(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tickets/${ticket._id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Ticket has been removed.",
              icon: "success",
              customClass: getSwalTheme(),
            });
            refetch();
          }
        } catch {
          Swal.fire({
            title: "Error!",
            text: "Could not delete ticket.",
            icon: "error",
            customClass: getSwalTheme(),
          });
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="flex justify-end mb-5">
        
      </div>

      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
        My Added Tickets
      </h2>

      {myTickets.length === 0 ? (
        <div className="text-center py-32 text-3xl opacity-50">
          No tickets added yet.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {myTickets.map((ticket) => {
            const isRejected = ["reject", "rejected"].includes(
              ticket.status?.toLowerCase()
            );

            const statusStyle =
              ticket.status === "pending"
                ? "bg-yellow-500 text-white"
                : ticket.status === "approved"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white";

            return (
              <div
                key={ticket._id}
                className={`card bg-base-100 shadow-xl border border-base-300 ${
                  isRejected ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <figure className="h-48">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h3 className="text-xl font-bold">{ticket.title}</h3>
                  <p className="opacity-70">
                    {ticket.from} → {ticket.to}
                  </p>

                  <p>
                    Type: <b>{ticket.type}</b>
                  </p>

                  <p>
                    Price: <b className="text-xl">৳{ticket.price}</b>
                  </p>

                  <p>Seats: {ticket.quantity}</p>

                  <p>
                    Departure: {new Date(ticket.departure).toLocaleString()}
                  </p>

                  <span className={`badge badge-lg mt-3 ${statusStyle}`}>
                    {ticket.status?.toUpperCase()}
                  </span>

                  <div className="flex gap-3 mt-4">
                    <button
                      className="btn flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
                      onClick={() => handleUpdateClick(ticket)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-error flex-1"
                      onClick={() => handleDelete(ticket)}
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

      {/* Update Modal */}
      {modalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-base-100 rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-base-300">
            <button
              onClick={() => setModalOpen(false)}
              className="btn btn-sm btn-circle absolute right-4 top-4"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6">Update Ticket</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {["title", "from", "to", "price", "quantity", "departure"].map(
                  (field) => (
                    <div key={field}>
                      <label className="font-semibold">{field}</label>
                      <input
                        {...register(field)}
                        type={
                          field === "price" || field === "quantity"
                            ? "number"
                            : field === "departure"
                            ? "datetime-local"
                            : "text"
                        }
                        className="input input-bordered w-full"
                        disabled={isRejectedModal}
                      />
                    </div>
                  )
                )}

                <div>
                  <label className="font-semibold">Type</label>
                  <select
                    {...register("type")}
                    className="select select-bordered w-full"
                  >
                    <option>Bus</option>
                    <option>Train</option>
                    <option>Plane</option>
                    <option>Launch</option>
                  </select>
                </div>
              </div>

              <div className="bg-base-200 p-4 rounded-xl">
                <h4 className="font-semibold mb-3">Perks</h4>

                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(perksState).map((perk) => (
                    <label key={perk} className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        name={perk}
                        checked={perksState[perk]}
                        onChange={handlePerkChange}
                        className="checkbox checkbox-primary"
                      />
                      <span className="capitalize">{perk}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold">Current Image</label>
                <img
                  src={selectedTicket.image}
                  alt="Current"
                  className="w-60 rounded-lg mt-2"
                />
              </div>

              <button
                type="submit"
                className="btn bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white w-full mt-4"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;

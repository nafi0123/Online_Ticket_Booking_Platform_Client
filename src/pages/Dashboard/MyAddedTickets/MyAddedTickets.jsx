import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myTickets = [], isLoading, refetch } = useQuery({
    queryKey: ["my-added-tickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?vendorEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdate = (ticketId) => {
    console.log("Update ticket:", ticketId);
    // Redirect or modal logic here
  };

  const handleDelete = (ticketId) => {
    console.log("Delete ticket:", ticketId);
    // Delete API call here
  };

  if (isLoading) return <div>Loading tickets...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Added Tickets
      </h2>

      {myTickets.length === 0 ? (
        <div className="text-gray-700 dark:text-gray-300">No tickets found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myTickets.map((ticket) => {
            const isRejected = ticket.status === "rejected";

            const statusColor =
              ticket.status === "pending"
                ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                : ticket.status === "approved"
                ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
                : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100";

            return (
              <div
                key={ticket._id}
                className="border rounded-lg shadow-lg p-4 flex flex-col justify-between
                           bg-white dark:bg-gray-800
                           text-gray-900 dark:text-gray-100"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
                  <p className="mb-2">{ticket.description}</p>
                  <p className="text-sm mb-2">Price: ${ticket.price}</p>
                  <p className={`inline-block px-2 py-1 rounded ${statusColor}`}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleUpdate(ticket._id)}
                    disabled={isRejected}
                    className={`flex-1 py-2 rounded font-semibold text-white
                      ${
                        isRejected
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                      }`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    disabled={isRejected}
                    className={`flex-1 py-2 rounded font-semibold text-white
                      ${
                        isRejected
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                      }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;

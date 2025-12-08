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
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        color: theme === "dark" ? "#f3f4f6" : "#1f2937",
      });

      if (confirm) {
        const res = await axiosSecure.patch(
          `/tickets/${ticket._id}/advertise`,
          {
            advertise: !ticket.advertise,
          }
        );

        if (res.data?.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: `Ticket ${
              ticket.advertise ? "Unadvertised" : "Advertised"
            }!`,
            timer: 1500,
            showConfirmButton: false,
          });
          refetch();
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Advertise Tickets</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Vendor</th>
            <th>Price</th>
            <th>Status</th>
            <th>Advertise</th>
          </tr>
        </thead>
        <tbody>
          {advertiseTickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.title}</td>
              <td>{ticket.vendorEmail}</td>

              <td>{ticket.price}</td>
              <td>{ticket.status}</td>
              <td>
                <button
                  onClick={() => handleAdvertise(ticket)}
                  className={`btn btn-sm ${
                    ticket.advertise ? "btn-success" : "btn-outline"
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
  );
};

export default AdvertiseTickets;

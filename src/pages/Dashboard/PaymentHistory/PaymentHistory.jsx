import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user.email}&status=paid`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="card bg-base-100 shadow-2xl border border-base-300">
      <div className="card-body p-0">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-lg">
              <tr>
                <th className="p-6">Image</th>
                <th>Title & Route</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Payment Date</th>
                <th>Transaction ID</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {paymentHistory.map((item) => (
                <tr key={item._id} className="hover:bg-base-200 transition">
                  <td className="p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg ring-2 ring-base-300"
                    />
                  </td>

                  <td>
                    <div className="font-bold text-base-content">
                      {item.title}
                    </div>
                    <div className="text-sm text-base-content/70">
                      {item.from} → {item.to}
                    </div>
                  </td>

                  <td>
                    <div className="font-bold text-lg text-base-content">
                      ৳{item.price}
                    </div>
                  </td>

                  <td>
                    <div className="font-medium">{item.quantity} </div>
                  </td>

                  <td>
                    <div className="font-medium text-base-content">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-base-content/70">
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>

                  <td>
                    <div className="text-sm font-semibold text-primary">
                      {item.transactionId}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge badge-lg ${
                        item.status === "paid"
                          ? "badge-success text-white"
                          : "badge-warning"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

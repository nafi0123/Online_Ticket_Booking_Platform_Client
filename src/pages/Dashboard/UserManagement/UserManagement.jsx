import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const {
    isLoading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });


  const handleRole = async (user, role) => {
    Swal.fire({
      title: `Change Role?`,
      text: `Make ${user.displayName} a ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Update",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/user/${user._id}`, { role });

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: `${user.displayName} is now ${role}.`,
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Failed to Update Role",
          });
        }
      }
    });
  };

  
  const handleFraud = async (user) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: `This will permanently restrict ${user.displayName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Confirm",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/user/${user._id}`, {
            isFraud: true,
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Flagged!",
              text: `${user.displayName} is now fraud flagged.`,
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Failed To Mark Fraud",
          });
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
        User Management
      </h2>

      <div className="card bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* Header */}
              <thead className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-lg">
                <tr>
                  <th className="p-4">User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-base-200 transition">

                    {/* User Name */}
                    <td className="font-semibold text-base-content">
                      {user.displayName}
                    </td>

                    {/* Email */}
                    <td className="text-base-content/80">{user.email}</td>

                    {/* Role Badge */}
                    <td>
                      <span
                        className={`badge badge-lg px-4 py-2 text-white ${
                          user.role === "admin"
                            ? "bg-gradient-to-r from-red-500 to-red-700"
                            : user.role === "vendor"
                            ? "bg-gradient-to-r from-purple-500 to-purple-700"
                            : "bg-gradient-to-r from-blue-500 to-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex flex-wrap gap-3 justify-center">

                        {/* Make Admin */}
                        <button
                          onClick={() => handleRole(user, "admin")}
                          className="btn btn-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 shadow-md"
                          disabled={user.role === "admin" || user.isFraud}
                        >
                          Make Admin
                        </button>

                        {/* Make Vendor */}
                        <button
                          onClick={() => handleRole(user, "vendor")}
                          className="btn btn-sm text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 shadow-md"
                          disabled={user.role === "vendor" || user.isFraud}
                        >
                          Make Vendor
                        </button>

                        {/* Fraud Button */}
                        {user.role === "vendor" && (
                          <button
                            onClick={() => handleFraud(user)}
                            disabled={user.isFraud}
                            className={`btn btn-sm text-white shadow-md ${
                              user.isFraud
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90"
                            }`}
                          >
                            {user.isFraud ? "Fraud Marked" : "Mark as Fraud"}
                          </button>
                        )}
                      </div>
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

export default UserManagement;

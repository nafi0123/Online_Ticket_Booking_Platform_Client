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

  // --------------------- ROLE CHANGE ---------------------
  const handleRole = async (user, role) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you really want to make ${user.displayName} an ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/user/${user._id}`, { role });

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Updated!",
              text: `${user.displayName} is now ${role}.`,
              icon: "success",
              background: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#f3f4f6" : "#1f2937",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to update role.",
            icon: "error",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f3f4f6" : "#1f2937",
          });
        }
      }
    });
  };

  // --------------------- MARK AS FRAUD ---------------------
  const handleFraud = async (user) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: `This will restrict ${user.displayName} permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark fraud",
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
              title: "Marked as Fraud!",
              text: `${user.displayName} is now flagged.`,
              icon: "success",
              background: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#f3f4f6" : "#1f2937",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to apply fraud status.",
            icon: "error",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f3f4f6" : "#1f2937",
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

      {users.length === 0 ? (
        <div className="text-center py-20 text-2xl text-base-content/50">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>

                  <td className="flex gap-3 flex-wrap">
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

                    {/* Mark as Fraud */}
                    {user.role === "vendor" && (
                      <button
                        onClick={() => handleFraud(user)}
                        disabled={user.isFraud === true}
                        className={`btn btn-sm text-white shadow-md
      ${
        user.isFraud
          ? "bg-gray-400 cursor-not-allowed" // fraud marked style
          : "bg-red-500 hover:bg-red-600" // normal mark fraud button
      }
    `}
                      >
                        {user.isFraud ? "Fraud Marked" : "Mark as Fraud"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: userData = {} } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data ;
    },
    enabled: !!user?.email,
  });

  if (roleLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          My Profile
        </h2>

        {/* Profile Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300 p-8 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="avatar">
              <div className="w-40 h-40 rounded-full ring-4 ring-primary shadow-lg">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/0j5rVxy/default-avatar.png"
                  }
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <h3 className="text-3xl font-bold text-base-content">
                {user?.displayName || "N/A"}
              </h3>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Email:</span>{" "}
                  <span className="text-base-content/80">
                    {user?.email || "N/A"}
                  </span>
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Role:</span>{" "}
                  <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white capitalize px-3 py-1 rounded-full shadow-md">
                    {userData?.role || "user"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

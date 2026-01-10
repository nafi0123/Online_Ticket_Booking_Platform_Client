import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  // get role from DB
  const { isLoading, data: userData = {} } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);

      // 🔥 Firebase update
      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });

      // 🔥 MongoDB update
      await axiosSecure.patch(`/users/${user.email}`, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          My Profile
        </h2>

        <div className="bg-base-100 shadow-2xl rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-40 rounded-full ring-4 ring-[#667eea]">
                <img
                  src={photo || "https://i.ibb.co/0j5rVxy/default-avatar.png"}
                  alt="profile"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              {!isEditing ? (
                <>
                  <h3 className="text-3xl font-bold">
                    {user?.displayName}
                  </h3>

                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    <span className="capitalize px-3 py-1 rounded-full text-white bg-gradient-to-r from-[#667eea] to-[#764ba2]">
                      {userData?.role}
                    </span>
                  </p>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Full Name"
                  />

                  <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Photo URL"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="btn bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>

                    <button
                      onClick={handleCancel}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

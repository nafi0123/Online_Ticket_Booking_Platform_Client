import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AddTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [perks, setPerks] = useState({
    ac: true,
    breakfast: false,
    wifi: false,
    tv: false,
    water: true,
    charging: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.success) {
        setImage(data.data.display_url);
        Swal.fire({
          icon: "success",
          title: "Image Uploaded!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire("Error", "Image upload failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!image) {
      Swal.fire("Warning", "Please upload a ticket image!", "warning");
      return;
    }

    const ticketData = {
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      image,
      perks: Object.keys(perks).filter((key) => perks[key]),
      vendorName: user?.displayName || user?.name,
      vendorEmail: user?.email,
      status: "available",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/tickets", ticketData);
      if (res.data.insertedId) {
        reset();
        setImage("");
        setPerks({
          ac: true,
          breakfast: false,
          wifi: false,
          tv: false,
          water: true,
          charging: false,
        });
        toast.success("Ticket Added Successfully!");
      }
    } catch (err) {
      toast.error("Failed to add ticket!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Add New <span className="text-[#667eea]">Ticket</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Create new travel tickets for your customers
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] h-3"></div>

          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Ticket Basic Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Ticket Information
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-3">
                      Ticket Title
                    </label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      type="text"
                      placeholder="e.g. Dhaka to Cox's Bazar AC Bus"
                      className="input input-bordered w-full h-14 text-lg"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-3">
                      Transport Type
                    </label>
                    <select
                      {...register("type", { required: "Please select type" })}
                      className="select select-bordered w-full h-14 text-lg"
                    >
                      <option value="">Choose Transport</option>
                      <option>Bus</option>
                      <option>Train</option>
                      <option>Launch</option>
                      <option>Plane</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-8">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-3">
                      From
                    </label>
                    <input
                      {...register("from", {
                        required: "From location required",
                      })}
                      type="text"
                      placeholder="e.g. Dhaka"
                      className="input input-bordered w-full h-14"
                    />
                    {errors.from && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.from.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-3">
                      To
                    </label>
                    <input
                      {...register("to", { required: "To location required" })}
                      type="text"
                      placeholder="e.g. Cox's Bazar"
                      className="input input-bordered w-full h-14"
                    />
                    {errors.to && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.to.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-3">
                      Departure Date & Time
                    </label>
                    <input
                      {...register("departure", {
                        required: "Date & time required",
                      })}
                      type="datetime-local"
                      className="input input-bordered w-full h-14"
                    />
                    {errors.departure && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.departure.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-3">
                      Price per Seat (৳)
                    </label>
                    <input
                      {...register("price", { required: "Price required" })}
                      type="number"
                      placeholder="1200"
                      className="input input-bordered w-full h-14"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-3">
                      Available Seats
                    </label>
                    <input
                      {...register("quantity", {
                        required: "Quantity required",
                      })}
                      type="number"
                      min="1"
                      max="200"
                      placeholder="40"
                      className="input input-bordered w-full h-14"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Perks */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Facilities & Perks
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {["ac", "breakfast", "wifi", "tv", "water", "charging"].map(
                    (perk) => (
                      <label
                        key={perk}
                        className="flex items-center gap-4 cursor-pointer p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                      >
                        <input
                          type="checkbox"
                          checked={perks[perk]}
                          onChange={(e) =>
                            setPerks({ ...perks, [perk]: e.target.checked })
                          }
                          className="checkbox checkbox-primary checkbox-lg"
                        />
                        <span className="font-semibold capitalize">
                          {perk === "ac" ? "AC" : perk === "tv" ? "TV" : perk}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Transport Image
                </h3>
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input file-input-bordered file-input-lg w-full max-w-lg"
                    required
                  />
                  {loading && (
                    <span className="loading loading-spinner loading-lg mt-6"></span>
                  )}
                  {image && (
                    <div className="mt-8">
                      <img
                        src={image}
                        alt="Ticket"
                        className="w-full max-w-2xl rounded-2xl shadow-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Vendor Info */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Vendor Information
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-sm text-gray-600">Vendor Name</p>
                    <p className="text-xl font-bold text-gray-800">
                      {user?.displayName || user?.name}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-sm text-gray-600">Vendor Email</p>
                    <p className="text-xl font-bold text-gray-800">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="text-center pt-8">
                <button
                  type="submit"
                  disabled={loading || !image}
                  className="btn btn-wide btn-lg text-xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-60"
                >
                  {loading ? "Uploading Image..." : "Add Ticket Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;

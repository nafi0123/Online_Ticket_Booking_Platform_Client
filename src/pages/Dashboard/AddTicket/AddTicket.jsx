import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";

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
      status: "pending",
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f11] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Add New Ticket
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Create new travel tickets for your passengers
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white dark:bg-[#151618] rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2]"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-8 lg:p-12 space-y-10">

              {/* TICKET INFO */}
              <section className="p-8 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-[#1b1c1d] dark:to-[#1b1c1d] border border-purple-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Ticket Information
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Title */}
                  <div>
                    <label className="font-semibold mb-2 block text-gray-700 dark:text-gray-300">
                      Ticket Title
                    </label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      type="text"
                      placeholder="e.g. Dhaka to Cox's Bazar AC Bus"
                      className="input input-bordered w-full h-14 dark:bg-[#0f0f11] dark:border-gray-700 dark:text-gray-100"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Type */}
                  <div>
                    <label className="font-semibold mb-2 block text-gray-700 dark:text-gray-300">
                      Transport Type
                    </label>
                    <select
                      {...register("type", { required: "Please select type" })}
                      className="select select-bordered w-full h-14 dark:bg-[#0f0f11] dark:border-gray-700 dark:text-gray-100"
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

                {/* From, To, Date */}
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                  <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      From
                    </label>
                    <input
                      {...register("from", { required: "From required" })}
                      type="text"
                      placeholder="Dhaka"
                      className="input input-bordered w-full h-14 dark:bg-[#0f0f11] dark:border-gray-700 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      To
                    </label>
                    <input
                      {...register("to", { required: "To required" })}
                      type="text"
                      placeholder="Cox's Bazar"
                      className="input input-bordered w-full h-14 dark:bg-[#0f0f11] dark:border-gray-700 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      Departure Date & Time
                    </label>
                    <input
                      {...register("departure", {
                        required: "Date & time required",
                      })}
                      type="datetime-local"
                      className="input input-bordered w-full h-14 dark:bg-[#0f0f11] dark:border-gray-700 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Price & Quantity */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      Price (৳)
                    </label>
                    <input
                      {...register("price", { required: "Price required" })}
                      type="number"
                      placeholder="1200"
                      className="input input-bordered w-full h-14 dark:bg-[#0f0f11] dark:border-gray-700 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
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
                      className="input input-bordered w-full h-14 dark:bg-[#0f0f11] dark:border-gray-700 dark:text-gray-100"
                    />
                  </div>
                </div>
              </section>

              {/* PERKS */}
              <section className="p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-[#1c1c1d] dark:to-[#1c1c1d] border border-blue-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Facilities & Perks
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {["ac", "breakfast", "wifi", "tv", "water", "charging"].map(
                    (perk) => (
                      <label
                        key={perk}
                        className="flex items-center gap-3 cursor-pointer p-4 bg-white dark:bg-[#0f0f11] border dark:border-gray-700 rounded-xl shadow-sm"
                      >
                        <input
                          type="checkbox"
                          checked={perks[perk]}
                          onChange={(e) =>
                            setPerks({ ...perks, [perk]: e.target.checked })
                          }
                          className="checkbox checkbox-primary"
                        />
                        <span className="font-semibold capitalize text-gray-700 dark:text-gray-300">
                          {perk === "ac" ? "AC" : perk.toUpperCase()}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </section>

              {/* IMAGE */}
              <section className="p-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#1b1c1d] dark:to-[#1b1c1d] border border-green-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Transport Image
                </h3>

                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input file-input-bordered file-input-lg w-full max-w-lg dark:bg-[#0f0f11] dark:border-gray-700 dark:text-gray-100"
                    required
                  />

                  {loading && <Loading />}
                </div>
              </section>

              {/* VENDOR INFO */}
              <section className="p-8 rounded-2xl bg-gray-100 dark:bg-[#131314] border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Vendor Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white dark:bg-[#0f0f11] border dark:border-gray-700 shadow">
                    <p className="text-gray-500 dark:text-gray-300 text-sm">
                      Vendor Name
                    </p>
                    <p className="text-xl font-bold dark:text-gray-100">
                      {user?.displayName || user?.name}
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-white dark:bg-[#0f0f11] border dark:border-gray-700 shadow">
                    <p className="text-gray-500 dark:text-gray-300 text-sm">
                      Vendor Email
                    </p>
                    <p className="text-xl font-bold dark:text-gray-100">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </section>

              {/* SUBMIT BUTTON */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading || !image}
                  className="btn btn-wide btn-lg text-xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:scale-105 transition-all shadow-xl"
                >
                  {loading ? "Uploading Image..." : "Add Ticket"}
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddTicket;

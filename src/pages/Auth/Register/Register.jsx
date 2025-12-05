import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const photoURL = res.data.data.url;
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL,
            };

            // Save to backend
            axiosSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) console.log(res.data.insertedId);
            });

            // Update Firebase profile
            const userProfile = { displayName: data.name, photoURL };
            updateUserProfile(userProfile)
              .then(() => navigate(location.state?.from || "/"))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
              {/* LEFT IMAGE */}
              <div className="hidden md:flex w-full h-full p-4">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9hl0UoUOESCZvsOf0iG21S_fx4ueTegFcnzTPqSXuL8tNQN_lYbf0Qjoa495asvb3HjigHKk0i5VLDNLkPE8ADtDgd9-7o0JG7z8v5HJ4jEGPBTGig6RbyCS39I8lM6DWI7M8q1gPaZBrVONk6oZe4zAHZ-ruU6YrPfWq7eD76m6I6ILqD9kSHBAdGkGc0xcOFdGfEu62A4q81cHWwukbkHvRHIEVVWF93t1yhcbkrUF7BYX2f49ZVcJP5zdsKheHQs64-O_lpT0R")',
                  }}
                  data-alt="Travel Image"
                ></div>
              </div>

              {/* RIGHT FORM */}
              <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="flex flex-col gap-8 w-full max-w-md">
                  {/* TITLE */}
                  <div className="flex flex-col gap-2">
                    <p className="text-slate-800 dark:text-slate-200 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                      Create Account
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                      Register to access all features
                    </p>
                  </div>

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit(handleRegistration)}
                    className="flex flex-col gap-4"
                  >
                    {/* Name */}
                    <label className="flex flex-col min-w-40 flex-1">
                      <span className="text-slate-800 dark:text-slate-200 text-base font-medium pb-2">
                        Name
                      </span>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", { required: "Name is required" })}
                        className="form-input w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark p-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">
                          {errors.name.message}
                        </span>
                      )}
                    </label>

                    {/* Email */}
                    <label className="flex flex-col min-w-40 flex-1">
                      <span className="text-slate-800 dark:text-slate-200 text-base font-medium pb-2">
                        Email
                      </span>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="form-input w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark p-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </label>

                    {/* Photo */}
                    <label className="flex flex-col min-w-40 flex-1">
                      <span className="text-slate-800 dark:text-slate-200 text-base font-medium pb-2">
                        Profile Photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("photo", {
                          required: "Profile photo is required",
                        })}
                        className="file-input w-full mt-1"
                      />
                      {errors.photo && (
                        <span className="text-red-500 text-sm">
                          {errors.photo.message}
                        </span>
                      )}
                    </label>

                    {/* Password */}
                    <label className="flex flex-col min-w-40 flex-1">
                      <span className="text-slate-800 dark:text-slate-200 text-base font-medium pb-2">
                        Password
                      </span>
                      <div className="relative flex items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "At least 6 characters",
                            },
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                              message: "Must contain uppercase & lowercase",
                            },
                          })}
                          className="form-input w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark p-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-slate-500 dark:text-slate-400"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      {errors.password && (
                        <span className="text-red-500 text-sm">
                          {errors.password.message}
                        </span>
                      )}
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn w-full border-none text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                    >
                      Register
                    </button>
                  </form>

                  {/* SOCIAL LOGIN */}
                  <div>
                    <SocialLogin />
                  </div>

                  {/* LOGIN LINK */}
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Already have an account?{" "}
                    <Link
                      className="font-bold text-primary hover:underline"
                      to="/login"
                    >
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

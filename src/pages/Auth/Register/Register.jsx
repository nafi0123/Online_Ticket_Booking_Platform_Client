import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

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

  const handleRegistration = async (data) => {
    try {
 
      await registerUser(data.email, data.password);

      const userInfo = {
        displayName: data.name,
        email: data.email,
        photoURL: data.photo,
        role: "user",
        createdAt: new Date(),
      };

 
      await axiosSecure.post("/users", userInfo);

      toast.success("Registration successful!");

      // --- Update Firebase profile ---
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photo,
      });

      // Navigate home
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    }
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
                ></div>
              </div>

              {/* RIGHT FORM */}
              <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="flex flex-col gap-8 w-full max-w-md">
                  {/* TITLE */}
                  <div className="flex flex-col gap-2">
                    <p className="text-slate-800 dark:text-slate-200 text-3xl md:text-4xl font-black">
                      Create Account
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      Register to access all features
                    </p>
                  </div>

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit(handleRegistration)}
                    className="flex flex-col gap-4"
                  >
                    {/* Name */}
                    <label className="flex flex-col">
                      <span className="pb-2 text-slate-800 dark:text-slate-200 font-medium">
                        Name
                      </span>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-background-light dark:bg-[#1f1f1f]
                      p-4 text-slate-900 dark:text-white 
                      placeholder-slate-400 dark:placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">
                          {errors.name.message}
                        </span>
                      )}
                    </label>

                    {/* Email */}
                    <label className="flex flex-col">
                      <span className="pb-2 text-slate-800 dark:text-slate-200 font-medium">
                        Email
                      </span>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-background-light dark:bg-[#1f1f1f]
                      p-4 text-slate-900 dark:text-white 
                      placeholder-slate-400 dark:placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </label>

                    {/* Photo URL */}
                    <label className="flex flex-col">
                      <span className="pb-2 text-slate-800 dark:text-slate-200 font-medium">
                        Photo URL
                      </span>
                      <input
                        type="text"
                        placeholder="Enter photo URL"
                        {...register("photo", {
                          required: "Photo URL is required",
                        })}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-background-light dark:bg-[#1f1f1f]
                      p-4 text-slate-900 dark:text-white 
                      placeholder-slate-400 dark:placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      {errors.photo && (
                        <span className="text-red-500 text-sm">
                          {errors.photo.message}
                        </span>
                      )}
                    </label>

                    {/* Password */}
                    <label className="flex flex-col">
                      <span className="pb-2 text-slate-800 dark:text-slate-200 font-medium">
                        Password
                      </span>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "At least 6 characters",
                            },
                          })}
                          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-background-light dark:bg-[#1f1f1f]
                      p-4 text-slate-900 dark:text-white 
                      placeholder-slate-400 dark:placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-500"
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
                      className="btn w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
                    >
                      Register
                    </button>
                  </form>

                  {/* SOCIAL LOGIN */}
                  <SocialLogin />

                  {/* LOGIN LINK */}
                  <p className="text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link className="font-bold text-primary" to="/login">
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

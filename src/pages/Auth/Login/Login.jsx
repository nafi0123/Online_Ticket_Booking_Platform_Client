import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => navigate(location?.state?.from || "/"))
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
                      Welcome Back
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                      Log in to your Account
                    </p>
                  </div>

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="flex flex-col gap-4"
                  >
                    <label className="flex flex-col min-w-40 flex-1">
                      <span className="text-slate-800 dark:text-slate-200 text-base font-medium pb-2">
                        Email Address
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
                              message: "Password must be at least 6 characters",
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

                    <button
                      type="submit"
                      className="btn  border-none text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                    >
                      Log In
                    </button>
                  </form>

                  {/* SOCIAL LOGIN */}
                  <div>
                    <SocialLogin />
                  </div>

                  {/* REGISTER LINK */}
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Don't have an account?{" "}
                    <Link
                      className="font-bold text-primary hover:underline"
                      to="/register"
                    >
                      Create Account
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

export default Login;

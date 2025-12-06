import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
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
      .then(() => {
        toast.success("Login successful!");
        navigate(location?.state?.from || "/");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Login failed. Please try again.");
      });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="flex justify-center flex-1">
        <div className="w-full flex flex-col">
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
                <div className="flex flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight">
                    Welcome Back
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-base">
                    Log in to your Account
                  </p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="flex flex-col gap-4"
                >
                  {/* EMAIL */}
                  <label className="flex flex-col">
                    <span className="text-slate-900 dark:text-white text-base font-medium pb-1">
                      Email Address
                    </span>

                    <input
                      type="email"
                      placeholder="Enter your email"
                       value={email}
                      {...register("email", { required: "Email is required" })}
                       onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-background-light dark:bg-[#1f1f1f]
                      p-4 text-slate-900 dark:text-white 
                      placeholder-slate-400 dark:placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />

                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </label>

                  {/* PASSWORD */}
                  <label className="flex flex-col">
                    <span className="text-slate-900 dark:text-white text-base font-medium pb-1">
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
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 
                        bg-background-light dark:bg-[#1f1f1f]
                        p-4 text-slate-900 dark:text-white 
                        placeholder-slate-400 dark:placeholder-slate-500
                        focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />

                      {/* SHOW/HIDE */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-slate-600 dark:text-slate-400 text-sm"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    {errors.password && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </span>
                    )}
                  </label>

                  {/* FORGOT PASSWORD */}
                  <div className="flex justify-end -mt-1">
                    <Link
                      state={{ email }}
                      to="/forgot-password"
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="btn border-none text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                  >
                    Log In
                  </button>
                </form>

                {/* SOCIAL LOGIN */}
                <SocialLogin />

                {/* REGISTER LINK */}
                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                  Don’t have an account?{" "}
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
  );
};

export default Login;

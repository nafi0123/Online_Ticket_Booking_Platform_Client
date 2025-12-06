import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";

const ForgotPass = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    setLoading(true);

    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox 📧");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to send reset email");
      })
      .finally(() => setLoading(false));
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
              ></div>
            </div>

            {/* RIGHT FORM */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
              <div className="flex flex-col gap-8 w-full max-w-md">
                {/* TITLE */}
                <div className="flex flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight">
                    Reset Password
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-base">
                    Enter your email to receive reset instructions.
                  </p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleResetPassword}
                  className="flex flex-col gap-4"
                >
                  {/* EMAIL INPUT */}
                  <label className="flex flex-col">
                    <span className="text-slate-900 dark:text-white text-base font-medium pb-1">
                      Email Address
                    </span>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-background-light dark:bg-[#1f1f1f]
                      p-4 text-slate-900 dark:text-white 
                      placeholder-slate-400 dark:placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </label>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn border-none text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
                  >
                    {loading ? "Sending..." : "Send Reset Email"}
                  </button>
                </form>

                {/* BACK TO LOGIN */}
                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                  Remember your password?{" "}
                  <Link
                    className="font-bold text-primary hover:underline"
                    to="/login"
                  >
                    Go Back to Login
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

export default ForgotPass;

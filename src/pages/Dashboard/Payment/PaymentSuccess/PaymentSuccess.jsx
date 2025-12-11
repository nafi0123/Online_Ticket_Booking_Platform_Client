import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsCheckCircle } from "react-icons/bs";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
            title: res.data.title,
            from: res.data.from,
            to: res.data.to,
          });
        })
        .catch((err) => {
          console.error("Payment verify failed:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Verifying payment...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%)" }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        {/* Success Icon */}
        <BsCheckCircle className="text-7xl text-primary mx-auto mb-6 animate-bounce" />

        {/* Heading */}
        <h2 className="text-3xl font-bold text-secondary mb-4">
          Payment Successful
        </h2>

        <p className="text-gray-600 mb-8">
          Your payment has been processed successfully.
        </p>

        {/* Receipt Card */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm text-left">

          <div className="mb-4">
            <span className="block text-gray-500 font-medium">
              Transaction ID
            </span>
            <span className="block text-gray-900 font-semibold break-all text-lg">
              {paymentInfo.transactionId || "-"}
            </span>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="mb-4">
            <span className="block text-gray-500 font-medium">
              Tracking ID
            </span>
            <span className="block text-gray-900 font-semibold break-all text-lg">
              {paymentInfo.trackingId || "-"}
            </span>
          </div>

          <hr className="my-4 border-gray-300" />

          <div>
            <span className="block text-gray-500 font-medium">
              Route
            </span>
            <span className="block text-gray-900 font-semibold break-all text-lg">
              {paymentInfo.from} → {paymentInfo.to}
            </span>
          </div>
        </div>

        <a
          href="/dashboard/my-bookings"
          className="btn btn-primary w-full py-3 rounded-lg shadow-md hover:shadow-lg transition-all mt-8"
        >
          View My Tickets
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;

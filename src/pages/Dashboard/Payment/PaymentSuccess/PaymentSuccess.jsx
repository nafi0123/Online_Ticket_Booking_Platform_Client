import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Loading/Loading";

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
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div
        className="
          bg-white dark:bg-[#1e293b]
          shadow-2xl rounded-2xl p-10 max-w-md w-full text-center
          text-gray-900 dark:text-gray-100
        "
      >
        {/* Success Icon */}
        <BsCheckCircle className="text-7xl text-primary mx-auto mb-6 animate-bounce" />

        {/* Heading */}
        <h2 className="text-3xl font-bold text-secondary dark:text-primary mb-4">
          Payment Successful
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your payment has been processed successfully.
        </p>

        {/* Receipt Card */}
        <div
          className="
            bg-gray-50 dark:bg-slate-800 
            p-6 rounded-xl 
            border border-gray-200 dark:border-gray-600 
            shadow-sm text-left
          "
        >
          {/* Transaction ID */}
          <div className="mb-4">
            <span className="block text-gray-500 dark:text-gray-300 font-medium">
              Transaction ID
            </span>
            <span className="block text-gray-900 dark:text-gray-100 font-semibold break-all text-lg">
              {paymentInfo.transactionId || "-"}
            </span>
          </div>

          {/* <hr className="my-4 border-gray-300 dark:border-gray-700" /> */}

          {/* Tracking ID
          <div className="mb-4">
            <span className="block text-gray-500 dark:text-gray-300 font-medium">
              Tracking ID
            </span>
            <span className="block text-gray-900 dark:text-gray-100 font-semibold break-all text-lg">
              {paymentInfo.trackingId || "-"}
            </span>
          </div> */}

          <hr className="my-4 border-gray-300 dark:border-gray-700" />

          {/* Route */}
          <div className="mb-2">
            <span className="block text-gray-500 dark:text-gray-300 font-medium">
              Route
            </span>
            <span className="block text-gray-900 dark:text-gray-100 font-semibold break-all text-lg">
              {paymentInfo.from} → {paymentInfo.to}
            </span>
          </div>

          {/* Title / Ticket Info */}
          {paymentInfo.title && (
            <div className="mt-4">
              <span className="block text-gray-500 dark:text-gray-300 font-medium">
                Ticket
              </span>
              <span className="block text-gray-900 dark:text-gray-100 font-semibold break-all text-lg">
                {paymentInfo.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

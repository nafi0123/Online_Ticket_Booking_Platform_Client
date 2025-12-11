import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";

import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ForgotPass from "../pages/Auth/ForgotPass/ForgotPass";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout";
import AddTicket from "../pages/Dashboard/AddTicket/AddTicket";
import ManageTickets from "../pages/Dashboard/ManageTickets/ManageTickets.JSX";
import AdminRoute from "./AdminRoute/AdminRoute";
import VendorRoute from "./VendorRoute/VendorRoute";
import MyAddedTickets from "../pages/Dashboard/MyAddedTickets/MyAddedTickets";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AdvertiseTickets from "../pages/Dashboard/AdvertiseTickets/AdvertiseTickets";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import AllTickets from "../pages/Home/AllTickets/AllTickets";
import HomePage from "../pages/Home/HomePage/HomePage";
import ViewDetailsCard from "../pages/Home/ViewdetailsCard/ViewdetailsCard";
import Loading from "../pages/Loading/Loading";
import RequestedBookings from "../pages/Dashboard/RequestedBookings/RequestedBookings";
import MyBookedTickets from "../pages/Dashboard/MyBookedTickets/MyBookedTickets";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import RevenueOverview from "../pages/Dashboard/DashboardHome/RevenueOverview";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forgot-password",
        element: <ForgotPass />,
      },
      {
        path: "/all-tickets",
        element: (
          <PrivateRoute>
            <AllTickets></AllTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/ticket-details/:id",
        loader: ({ params }) =>
          fetch(
            `https://online-ticket-booking-platform-serv.vercel.app/tickets-details-card/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <ViewDetailsCard></ViewDetailsCard>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
    ],
  },

  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // 🔹 Default route → My Profile
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "my-bookings",
        element: <MyBookedTickets />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "revenue-overview",
        element: (
          <VendorRoute>
            <RevenueOverview />
          </VendorRoute>
        ),
      },

      // Vendor routes
      {
        path: "add-ticket",
        element: (
          <VendorRoute>
            <AddTicket />
          </VendorRoute>
        ),
      },
      {
        path: "my-added-tickets",
        element: (
          <VendorRoute>
            <MyAddedTickets />
          </VendorRoute>
        ),
      },
      {
        path: "requested-bookings",
        element: (
          <VendorRoute>
            <RequestedBookings />
          </VendorRoute>
        ),
      },

      // Admin routes
      {
        path: "manage-tickets",
        element: (
          <AdminRoute>
            <ManageTickets />
          </AdminRoute>
        ),
      },
      {
        path: "advertise-tickets",
        element: (
          <AdminRoute>
            <AdvertiseTickets />
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },

      // Payment routes
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
    ],
  },
]);

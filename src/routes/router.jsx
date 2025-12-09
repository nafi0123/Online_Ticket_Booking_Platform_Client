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
// import UserManagement from "../pages/Dashboard/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    // errorElement: <ErrorElement></ErrorElement>,
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
            `http://localhost:5000/tickets-details-card/${params.id}`
          ),
        element:(
          <PrivateRoute>
            <ViewDetailsCard></ViewDetailsCard>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      }
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "add-ticket",
        element: (
          <VendorRoute>
            <AddTicket></AddTicket>
          </VendorRoute>
        ),
      },
      {
        path: "my-added-tickets",
        element: (
          <VendorRoute>
            <MyAddedTickets></MyAddedTickets>
          </VendorRoute>
        ),
      },
      {
        path: "requested-bookings",
        element: (
          <VendorRoute>
           <RequestedBookings></RequestedBookings>
          </VendorRoute>
        ),
      },

      {
        path: "manage-tickets",

        element: (
          <AdminRoute>
            <ManageTickets></ManageTickets>
          </AdminRoute>
        ),
      },

      {
        path: "advertise-tickets",

        element: (
          <AdminRoute>
            <AdvertiseTickets></AdvertiseTickets>
          </AdminRoute>
        ),
      },
      {
        path: "user-management",

        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
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
// import UserManagement from "../pages/Dashboard/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    // errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        index: true,
        Component: Home,
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

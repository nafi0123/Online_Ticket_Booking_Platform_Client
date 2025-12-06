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
        Component: AddTicket,
      },
      {
        path: "manage-tickets",
        Component: ManageTickets,
      },
    ],
  },
]);

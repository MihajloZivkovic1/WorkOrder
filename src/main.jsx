import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import CreateCardboard from "./components/CreateCardboard";
import CardboardList from "./components/CardboardList";
import GetWorkOrder from "./components/GetWorkOrder";
import CreateWorkOrder from "./components/CreateWorkOrder";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateCardboard from "./components/UpdateCardboard";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute component={Root} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/createCardboards",
        element: <CreateCardboard />,
      },
      {
        path: '/cardboards',
        element: <CardboardList />,
      },
      {
        path: '/getWorkOrder',
        element: <GetWorkOrder />
      },
      {
        path: '/createWorkOrder',
        element: <CreateWorkOrder />,
      }
    ],
  },
  {
    path: '/updateCardboard/:id',
    element: <UpdateCardboard />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/signup',
    element: <Signup />

  }

]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>
);






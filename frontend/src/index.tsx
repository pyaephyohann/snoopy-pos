import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import App from "./App";
import Orders from "./components/Orders/Orders";
import Menus from "./components/Menus/Menus";
import MenuCategories from "./components/MenuCategories/MenuCategories";
import Addons from "./components/Addons/Addons";
import AddonCategories from "./components/AddonCategories/AddonCategories";
import Locations from "./components/Locations/Locations";
import Settings from "./components/Settings/Settings";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/menu-categories",
    element: <MenuCategories />,
  },
  {
    path: "/addons",
    element: <Addons />,
  },
  {
    path: "/addon-categories",
    element: <AddonCategories />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={routes} />);

import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import App from "./App";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={routes} />);

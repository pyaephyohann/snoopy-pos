import { Outlet } from "react-router-dom";
import Login from "../components/Login/Login";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Login />;
};

export default PrivateRoute;

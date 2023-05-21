import { Typography } from "@mui/material";
import "./App.css";
import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { Navigate } from "react-router-dom";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const response = await fetch("http://localhost:5000/menus", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(await response.json());
  };

  if (!accessToken) return <Navigate to={`/login`} />;

  return (
    <Layout>
      <Typography variant="h2">Welcome from Snoopy POS</Typography>
    </Layout>
  );
}

export default App;

import { Typography } from "@mui/material";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { AppContext } from "./contexts/AppContext";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const contextData = useContext(AppContext);
  console.log(contextData);

  if (!accessToken) return <Navigate to={`/login`} />;

  return (
    <Layout>
      <Typography sx={{ textAlign: "center", mt: 10 }} variant="h2">
        Welcome from Snoopy POS
      </Typography>
    </Layout>
  );
}

export default App;

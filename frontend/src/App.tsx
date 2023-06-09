import { Typography } from "@mui/material";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import Autocomplete from "./components/Autocomplete/Autocomplete";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const contextData = useContext(AppContext);
  console.log(contextData);

  if (!accessToken) return <Navigate to={`/login`} />;

  const options = [
    { id: 1, name: "Kdrama" },
    { id: 2, name: "Jdrama" },
  ];

  return (
    <Layout>
      <Typography variant="h2">Welcome from Snoopy POS</Typography>
      <Autocomplete options={options} defaultValue={[options[1]]} />
    </Layout>
  );
}

export default App;

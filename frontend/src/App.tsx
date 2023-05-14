import { Typography } from "@mui/material";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Typography variant="h2">Welcome from Snoopy POS</Typography>
    </div>
  );
}

export default App;

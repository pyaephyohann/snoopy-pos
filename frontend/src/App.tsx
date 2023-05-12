import { Box, Typography } from "@mui/material";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3">Welcome from snoopy pos</Typography>
      </Box>

      {/* <div
        style={{
          width: "20rem",
          margin: "0 auto",
          padding: "3rem",
          border: "3px solid #C9A7EB",
          marginTop: "3rem",
        }}
      >
        <Register />
      </div> */}
    </div>
  );
}

export default App;

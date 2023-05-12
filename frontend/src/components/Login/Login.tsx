import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const login = async () => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      navigate("/");
    }
  };
  return (
    <Box>
      <Typography sx={{ textAlign: "center", mt: "3rem" }} variant="h3">
        Login your account
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "18rem",
          m: "0 auto",
          mt: "3rem",
          border: "3px solid #C9A7EB",
          padding: "3rem",
        }}
      >
        <TextField
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
          label="Password"
          type="password"
          variant="outlined"
          sx={{ my: "2rem" }}
        />
        <Button
          sx={{
            backgroundColor: "#C9A7EB",
            ":hover": { backgroundColor: "#F7D060" },
          }}
          onClick={login}
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

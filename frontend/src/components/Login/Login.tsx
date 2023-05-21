import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const login = async () => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const responseData = await response.json();
      const accessToken = responseData.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "20rem",
          m: "0 auto",
          mt: "5rem",
          padding: "2rem",
          border: "3px solid #C9A7EB",
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
          sx={{ my: 3 }}
          type="password"
          label="Password"
          variant="outlined"
        />
        <Button
          sx={{
            backgroundColor: "#C9A7EB",
            ":hover": { backgroundColor: "#F7D060" },
          }}
          variant="contained"
          onClick={login}
        >
          Login
        </Button>
        <Link
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            textDecoration: "none",
          }}
          to={`/register`}
        >
          {" "}
          <Typography>New User? Register here</Typography>
        </Link>
      </Box>
    </Layout>
  );
};

export default Login;

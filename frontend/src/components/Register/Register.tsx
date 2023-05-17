import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const register = async () => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const resposneJson = await response.json();
    console.log(resposneJson);
  };
  return (
    <Layout>
      <div
        style={{
          width: "20rem",
          margin: "0 auto",
          padding: "3rem",
          border: "3px solid #C9A7EB",
          marginTop: "3rem",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Name"
            variant="outlined"
            onChange={(event) => setUser({ ...user, name: event.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            sx={{ my: 4 }}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          />
          <Button
            variant="contained"
            onClick={register}
            sx={{
              mt: 4,
              backgroundColor: "#C9A7EB",
              ":hover": { backgroundColor: "#F7D060" },
            }}
          >
            Register
          </Button>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            Login
          </Link>
        </Box>
      </div>
    </Layout>
  );
};

export default Register;

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

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
    <Box sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
      <TextField
        label="Name"
        variant="outlined"
        onChange={(event) => setUser({ ...user, name: event.target.value })}
      />
      <TextField
        label="Email"
        variant="outlined"
        sx={{ my: 2 }}
        onChange={(event) => setUser({ ...user, email: event.target.value })}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        onChange={(event) => setUser({ ...user, password: event.target.value })}
      />
      <Button variant="contained" onClick={register} sx={{ my: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default Register;

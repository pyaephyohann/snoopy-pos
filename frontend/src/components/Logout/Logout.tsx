import { Typography } from "@mui/material";
import Layout from "../Layout/Layout";

const Logout = () => {
  return (
    <Layout>
      <Typography sx={{ mt: 5, textAlign: "center" }} variant="h4">
        You are logged out
      </Typography>
    </Layout>
  );
};

export default Logout;

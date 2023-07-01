import { Box, Button, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";
import CreateLocation from "../CreateLocation/CreateLocation";

const Locations = () => {
  const { locations } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  return (
    <Layout title="Locations">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: "2rem",
          px: "4rem",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          Create Location
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {locations.map((location, index) => {
          return (
            <Link
              key={location.id}
              style={{ textDecoration: "none", color: "black" }}
              to={`${location.id}`}
            >
              <Box
                key={location.id}
                sx={{
                  width: "9rem",
                  height: "9rem",
                  border: "1px solid gray",
                  borderRadius: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 5,
                  mt: 5,
                }}
              >
                <Typography>{location.name}</Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
      <CreateLocation open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Locations;

import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { config } from "../../config/config";

const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");

  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });

  const createNewLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    fetchData();
    setNewLocation({
      name: "",
      address: "",
      companyId: company?.id,
    });
  };

  return (
    <Layout title="Locations">
      <Box>
        {locations.map((location, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 5,
                ml: 10,
                mt: 5,
              }}
              key={location.id}
            >
              <Typography sx={{ mr: 1.5 }} variant="h5">
                {index + 1}.
              </Typography>
              <TextField sx={{ mr: 5 }} defaultValue={location.name} />
              <TextField sx={{ mr: 5 }} defaultValue={location.address} />
              <Button variant="contained">Update</Button>
            </Box>
          );
        })}
        <Box sx={{ mt: 5, ml: 13.5, display: "flex", alignItems: "center" }}>
          <TextField
            value={newLocation.name}
            onChange={(event) =>
              setNewLocation({ ...newLocation, name: event.target.value })
            }
            sx={{ mr: 5 }}
          />
          <TextField
            value={newLocation.address}
            onChange={(event) =>
              setNewLocation({ ...newLocation, address: event.target.value })
            }
            sx={{ mr: 5 }}
          />
          <Button variant="contained" onClick={createNewLocation}>
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Locations;

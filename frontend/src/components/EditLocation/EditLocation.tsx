import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Box, Button, TextField } from "@mui/material";
import { Locations } from "../../typings/types";
import { config } from "../../config/config";
import { getAccessToken } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const EditLocation = () => {
  const { locations, fetchData } = useContext(AppContext);
  const params = useParams();
  const locationId = params.id;
  const [location, setLocation] = useState<Locations>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const accessToken = getAccessToken();

  useEffect(() => {
    if (locations.length) {
      const validLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setLocation(validLocation);
    }
  }, [locations]);

  const updateLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
    fetchData();
  };

  const deleteLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    fetchData();
    navigate("/locations");
  };

  if (!location) return null;

  return (
    <Layout title="Edit Addon">
      <Box sx={{ ml: 9, mt: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4, mr: 5 }}>
          <Button
            onClick={() => setOpen(true)}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
        <Box>
          <TextField
            onChange={(event) =>
              setLocation({ ...location, name: event.target.value })
            }
            label="Name"
            defaultValue={location.name}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <TextField
            onChange={(event) =>
              setLocation({ ...location, address: event.target.value })
            }
            label="Address"
            defaultValue={location.address}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <Button onClick={updateLocation} variant="contained">
            Update
          </Button>
        </Box>
      </Box>
      <Box>
        <DeleteDialog
          title="Are you sure you want to delete this location"
          open={open}
          setOpen={setOpen}
          callBack={deleteLocation}
        />
      </Box>
    </Layout>
  );
};

export default EditLocation;

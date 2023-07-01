import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../../config/config";

import { getAccessToken } from "../../utils";
import { AppContext } from "../../contexts/AppContext";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateLocation = ({ open, setOpen }: Props) => {
  const { fetchData, company } = useContext(AppContext);

  const accessToken = getAccessToken();

  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
  });

  const createNewLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newLocation.name,
        address: newLocation.address,
        companyId: company?.id,
      }),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Create New Location
      </DialogTitle>
      <DialogContent sx={{ width: "20rem" }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="Name"
            sx={{ width: "100%" }}
            value={newLocation.name}
            onChange={(event) =>
              setNewLocation({ ...newLocation, name: event.target.value })
            }
          />
        </Box>
        <Box>
          <TextField
            placeholder="Address"
            sx={{ width: "100%" }}
            value={newLocation.address}
            onChange={(event) =>
              setNewLocation({ ...newLocation, address: event.target.value })
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ mr: 2, mb: 1.5 }}
          variant="contained"
          onClick={createNewLocation}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLocation;

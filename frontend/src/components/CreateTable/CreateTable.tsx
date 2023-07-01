import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../../config/config";

import { getAccessToken, getSelectedLocationId } from "../../utils";
import { AppContext } from "../../contexts/AppContext";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateTable = ({ open, setOpen }: Props) => {
  const { fetchData } = useContext(AppContext);

  const accessToken = getAccessToken();

  const [newTable, setNewTable] = useState<string>("");

  const selectedLocationId = getSelectedLocationId();

  const createNewTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTable, locationId: selectedLocationId }),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>Create New Table</DialogTitle>
      <DialogContent sx={{ width: "20rem" }}>
        <TextField
          onChange={(event) => setNewTable(event.target.value)}
          sx={{ width: "100%" }}
          placeholder="Table Name"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
          <Button onClick={createNewTable} variant="contained">
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTable;

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { config } from "../../config/config";
import { getAccessToken, getSelectedLocationId } from "../../utils";
import { AppContext } from "../../contexts/AppContext";

const Tables = () => {
  const { fetchData, tables } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState<string>("");
  const accessToken = getAccessToken();
  const selectedLocationId = getSelectedLocationId();

  const currentLocationTables = tables.filter(
    (item) => item.locations_id === Number(selectedLocationId)
  );

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
    <Layout title="Tables">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: "3rem",
          px: "4rem",
        }}
      >
        <Button onClick={() => setOpen(true)} variant="contained">
          + Create Table
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          px: "3rem",
        }}
      >
        {currentLocationTables.map((table) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mr: "5rem",
              }}
              key={table.id}
            >
              <Box
                sx={{
                  width: "9rem",
                  height: "9rem",
                  border: "1px solid gray",
                  borderRadius: "2rem",
                }}
              ></Box>
              <Typography sx={{ mt: "1rem" }}>{table.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Create New Menu
          </DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <TextField
              onChange={(event) => setNewTable(event.target.value)}
              sx={{ width: "100%" }}
              placeholder="Table Name"
            />
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}
            >
              <Button onClick={createNewTable} variant="contained">
                Create
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default Tables;

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { config } from "../../config/config";
import { getAccessToken } from "../../utils";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateAddon = ({ open, setOpen }: Props) => {
  const { addonCategories, fetchData } = useContext(AppContext);

  const accessToken = getAccessToken();

  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });

  const handleCreateAddon = async () => {
    const isValid = newAddon.name && newAddon.addonCategoryId;
    if (!isValid) return alert("You need to fill your addon requirement");
    await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddon),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>Create Addon</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <TextField
            sx={{ width: "100%" }}
            onChange={(event) =>
              setNewAddon({ ...newAddon, name: event.target.value })
            }
            placeholder="Name"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            sx={{ width: "100%" }}
            onChange={(event) =>
              setNewAddon({ ...newAddon, price: Number(event.target.value) })
            }
            placeholder="Price"
            type="number"
          />
        </Box>
        <Box>
          <FormControl sx={{ m: 1, width: "20rem" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Addon Category
            </InputLabel>
            <Select
              value={newAddon.addonCategoryId}
              onChange={(event) =>
                setNewAddon({
                  ...newAddon,
                  addonCategoryId: event.target.value,
                })
              }
              autoWidth
              label="Addon Category"
            >
              {addonCategories.map((item) => {
                return (
                  <MenuItem sx={{ p: 2 }} key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ mr: 2, mb: 1.5 }}
          onClick={handleCreateAddon}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAddon;

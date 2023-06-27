import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import Autocomplete from "../Autocomplete/Autocomplete";
import { config } from "../../config/config";
import { getAccessToken } from "../../utils";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateMenuCategory = ({ open, setOpen }: Props) => {
  const { locations, fetchData } = useContext(AppContext);

  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
  });

  const accessToken = getAccessToken();

  const mappedLocations = locations.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const createMenuCategory = async () => {
    const isValid = newMenuCategory.name && newMenuCategory.locationIds.length;
    if (!isValid) return alert("Hey! You need to fill all the requirement");
    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", py: 3 }}>
        Create New Menu Category
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ width: "100%", mb: 3 }}
          onChange={(event) =>
            setNewMenuCategory({ ...newMenuCategory, name: event.target.value })
          }
          placeholder="Name"
        />
        <Autocomplete
          options={mappedLocations}
          label="Locations"
          placeholder="Locations"
          onChange={(values) =>
            setNewMenuCategory({
              ...newMenuCategory,
              locationIds: values.map((item) => item.id),
            })
          }
        />
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 3 }}>
        <Button onClick={createMenuCategory} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMenuCategory;

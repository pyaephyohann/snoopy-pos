import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
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

const CreateAddonCategory = ({ open, setOpen }: Props) => {
  const { menus, fetchData } = useContext(AppContext);

  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });

  const accessToken = getAccessToken();

  const mappedMenus = menus.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const createAddonCategory = async () => {
    const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
    if (!isValid) return alert("Hey! You need to fill all the requirement");
    await fetch(`${config.apiBaseUrl}/addon-categories`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", py: 3 }}>
        Create New Addon Category
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ width: "100%", mb: 3 }}
          onChange={(event) =>
            setNewAddonCategory({
              ...newAddonCategory,
              name: event.target.value,
            })
          }
          placeholder="Name"
        />
        <Autocomplete
          options={mappedMenus}
          label="Menus"
          placeholder="Menus"
          onChange={(values) =>
            setNewAddonCategory({
              ...newAddonCategory,
              menuIds: values.map((item) => item.id),
            })
          }
        />
        <Box sx={{ mt: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={newAddonCategory.isRequired}
                onChange={(event) =>
                  setNewAddonCategory({
                    ...newAddonCategory,
                    isRequired: event.target.checked,
                  })
                }
              />
            }
            label="Required"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 3 }}>
        <Button onClick={createAddonCategory} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAddonCategory;

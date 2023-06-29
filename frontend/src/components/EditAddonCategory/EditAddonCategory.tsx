import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { getAccessToken, getMenusByAddonCategoryId } from "../../utils";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { Menus } from "../../typings/types";
import { config } from "../../config/config";

const EditAddonCategory = () => {
  const { addonCategories, menusAddonCategories, menus, fetchData } =
    useContext(AppContext);

  const params = useParams();

  const [open, setOpen] = useState(false);

  const accessToken = getAccessToken();

  const [chosenMenuToRemove, setChosenMenuToRemove] = useState<Menus>();

  const [updatedAddonCategory, setUpdatedAddonCategory] = useState({
    name: "",
    isRequired: false,
    addonCategoryId: "",
  });

  const addonCategoryId = params.id as string;
  if (!addonCategoryId) return null;

  const addonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  );

  const validMenus = getMenusByAddonCategoryId(
    menusAddonCategories,
    menus,
    addonCategoryId
  );

  const handleRemoveMenu = async () => {
    if (!chosenMenuToRemove) return;
    await fetch(`${config.apiBaseUrl}/addon-categories/removeMenu`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menuId: chosenMenuToRemove.id, addonCategoryId }),
    });
    fetchData();
  };

  const handleUpdateAddonCategory = async () => {
    updatedAddonCategory.addonCategoryId = addonCategoryId;
    await fetch(`${config.apiBaseUrl}/addon-categories`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAddonCategory),
    });
  };

  if (!addonCategory)
    return (
      <Layout title="Edit Addon Category">
        <Typography>Addon Category not found</Typography>
      </Layout>
    );

  return (
    <Layout title="Edit Addon Category">
      <Box>
        <Box sx={{ mt: 8, ml: 20 }}>
          <TextField
            onChange={(event) =>
              setUpdatedAddonCategory({
                ...updatedAddonCategory,
                name: event.target.value,
              })
            }
            defaultValue={addonCategory.name}
          />
        </Box>
        <Box sx={{ mt: 4, ml: 20 }}>
          <FormControlLabel
            control={
              <Switch
                onChange={(event) =>
                  setUpdatedAddonCategory({
                    ...updatedAddonCategory,
                    isRequired: event.target.checked,
                  })
                }
                checked={updatedAddonCategory.isRequired}
              />
            }
            label="Required"
          />
        </Box>
        <Box sx={{ mt: 4, ml: 20 }}>
          <Button onClick={handleUpdateAddonCategory} variant="contained">
            Update
          </Button>
        </Box>
        <Box>
          <Typography sx={{ textAlign: "center", mt: 3 }} variant="h4">
            Menus
          </Typography>
          <Box sx={{ display: "flex" }}>
            {validMenus.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      m: 3,
                      width: "fit-content",
                      p: 2,
                      backgroundColor: "lightgray",
                      borderRadius: "2rem",
                    }}
                  >
                    <img
                      style={{ height: "12rem", borderRadius: "2rem" }}
                      alt={item.name}
                      src={item.asset_url}
                    />
                    <Typography
                      sx={{ textAlign: "center", mt: 1, fontWeight: "bold" }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setChosenMenuToRemove(item);
                    }}
                    sx={{ mb: 5 }}
                    variant="contained"
                    color="error"
                  >
                    Remove
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          title="Are you sure you want to remove this menu from this addon category"
          callBack={handleRemoveMenu}
        />
      </Box>
    </Layout>
  );
};

export default EditAddonCategory;

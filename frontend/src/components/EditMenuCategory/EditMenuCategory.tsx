import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  getAccessToken,
  getLocationsByMenuCategoryId,
  getMenusByMenuCategoryId,
  getSelectedLocationId,
} from "../../utils";
import Autocomplete from "../Autocomplete/Autocomplete";
import { config } from "../../config/config";
import MenuCard from "../MenuCard/MenuCard";
import { Menus } from "../../typings/types";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";

const EditMenuCategory = () => {
  const {
    menuCategories,
    locations,
    menusMenuCategoriesLocations,
    menus,
    fetchData,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [selectedMenuToDelete, setSelectedMenuToDelete] = useState<Menus>();

  const [open, setOpen] = useState(false);

  const [openDeleteMenuCategory, setOpenDeleteMenuCategory] = useState(false);

  const params = useParams();
  const menuCategoryId = params.id as string;

  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
    menuCategoryId,
  });

  if (!menuCategoryId) return null;
  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );

  const validLocations = getLocationsByMenuCategoryId(
    locations,
    menusMenuCategoriesLocations,
    menuCategoryId
  );

  const mappedValidLocations = validLocations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const accessToken = getAccessToken();

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const updateMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
  };

  const selectedLocationId = getSelectedLocationId();

  const validMenus = getMenusByMenuCategoryId(
    menus,
    menusMenuCategoriesLocations,
    menuCategoryId
  );

  const handleDeleteMenuFromMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories/removeMenu`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuId: selectedMenuToDelete?.id,
        menuCategoryId,
        locationId: selectedLocationId,
      }),
    });
    fetchData();
  };

  const handleDeleteMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories/${menuCategoryId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locationId: selectedLocationId }),
    });
    fetchData();
    navigate("/menu-categories");
  };

  if (!menuCategory)
    return (
      <Layout title="Edit Menu Category">
        <Typography>Menu Category not found</Typography>
      </Layout>
    );
  return (
    <Layout title="Edit Menu Category">
      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5 }}>
          <Button
            onClick={() => setOpenDeleteMenuCategory(true)}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ ml: 10, mt: 5 }}>
          <TextField
            onChange={(event) =>
              setNewMenuCategory({
                ...newMenuCategory,
                name: event.target.value,
              })
            }
            defaultValue={menuCategory.name}
          />
        </Box>
        <Box sx={{ mt: 6, ml: 10 }}>
          <Autocomplete
            options={mappedLocations}
            defaultValue={mappedValidLocations}
            label="Locations"
            placeholder="Locations"
            onChange={(options) =>
              setNewMenuCategory({
                ...newMenuCategory,
                locationIds: options.map((item) => item.id),
              })
            }
          />
        </Box>
        <Box sx={{ mt: 6, ml: 10 }}>
          <Button onClick={updateMenuCategory} variant="contained">
            Update
          </Button>
        </Box>
        <Box sx={{ mt: 6, ml: 10, display: "flex" }}>
          {validMenus.map((item) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={item.id}
              >
                <MenuCard menu={item} />
                <Button
                  onClick={() => {
                    setOpen(true);
                    setSelectedMenuToDelete(item);
                  }}
                  sx={{ mt: 3, mb: 5 }}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            );
          })}
        </Box>
        <Box>
          <DeleteDialog
            title="Are you sure you want to delete this menu from this menu category"
            open={open}
            setOpen={setOpen}
            callBack={handleDeleteMenuFromMenuCategory}
          />
        </Box>
        <Box>
          <DeleteDialog
            title="Are you sure you want to delete this menu category"
            open={openDeleteMenuCategory}
            setOpen={setOpenDeleteMenuCategory}
            callBack={handleDeleteMenuCategory}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default EditMenuCategory;

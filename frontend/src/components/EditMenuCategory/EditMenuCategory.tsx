import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getAccessToken, getLocationsByMenuCategoryId } from "../../utils";
import Autocomplete from "../Autocomplete/Autocomplete";
import { config } from "../../config/config";

const EditMenuCategory = () => {
  const { menuCategories, locations, menusMenuCategoriesLocations } =
    useContext(AppContext);

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

  if (!menuCategory)
    return (
      <Layout title="Edit Menu Category">
        <Typography>Menu Category not found</Typography>
      </Layout>
    );
  return (
    <Layout title="Edit Menu Category">
      <Box sx={{ mt: 8, ml: 10 }}>
        <TextField
          onChange={(event) =>
            setNewMenuCategory({ ...newMenuCategory, name: event.target.value })
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
    </Layout>
  );
};

export default EditMenuCategory;

import { Box, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  getAddonCategoriesByLocation,
  getAddonsByLocationId,
} from "../../utils";

const Addons = () => {
  const {
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories,
    addons,
  } = useContext(AppContext);

  const validAddonCategories = getAddonCategoriesByLocation(
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories
  );

  const validAddons = getAddonsByLocationId(validAddonCategories, addons);

  return (
    <Layout title="Addons">
      <Box sx={{ display: "flex" }}>
        {validAddons.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                width: "10rem",
                height: "10rem",
                borderRadius: "3rem",
                border: "2px solid lightgray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: "3rem",
                mt: "3rem",
              }}
            >
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};

export default Addons;

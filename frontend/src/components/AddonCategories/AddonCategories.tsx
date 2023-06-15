import { Box, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getAddonCategoriesByLocation } from "../../utils";

const AddonCategories = () => {
  const {
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories,
  } = useContext(AppContext);

  const validAddonCategories = getAddonCategoriesByLocation(
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories
  );

  return (
    <Layout title="AddonCategories">
      <Box sx={{ display: "flex" }}>
        {validAddonCategories.map((item) => {
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

export default AddonCategories;

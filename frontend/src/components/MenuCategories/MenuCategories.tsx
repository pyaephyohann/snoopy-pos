import { Box, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getMenuCategoriesByLocationId } from "../../utils";

const MenuCategories = () => {
  const { menusMenuCategoriesLocations, menuCategories } =
    useContext(AppContext);
  const validMenuCategories = getMenuCategoriesByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  return (
    <Layout title="MenuCategories">
      <Box sx={{ display: "flex" }}>
        {validMenuCategories.map((item) => {
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

export default MenuCategories;

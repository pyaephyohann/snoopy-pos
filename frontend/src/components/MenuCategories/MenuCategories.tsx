import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import {
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "../../utils";
import Layout from "../Layout/Layout";

const MenuCategories = () => {
  const { menusMenuCategoriesLocations, menuCategories } =
    useContext(AppContext);
  const validMenuCategories = getMenuCategoriesByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  const selectedLocationId = getSelectedLocationId();

  const getMenusCount = (menuCategoryId: number) => {
    return menusMenuCategoriesLocations.filter(
      (item) =>
        item.menu_categories_id === menuCategoryId &&
        item.menus_id &&
        item.locations_id === Number(selectedLocationId)
    ).length;
  };

  return (
    <Layout title="MenuCategories">
      <Box sx={{ display: "flex" }}>
        {validMenuCategories.map((item) => {
          return (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              key={item.id}
              to={`${item.id}`}
            >
              <Box
                sx={{
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#9575DE",
                  ml: "3rem",
                  mt: "3rem",
                  position: "relative",
                  color: "white",
                }}
              >
                <Typography sx={{ mt: 1 }} variant="h5">
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "8px",
                    p: "0.5rem",
                    backgroundColor: "#FF78C4",
                    borderRadius: "3rem",
                  }}
                >
                  {getMenusCount(item.id)} menus
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Layout>
  );
};

export default MenuCategories;

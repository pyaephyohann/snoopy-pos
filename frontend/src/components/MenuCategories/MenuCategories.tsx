import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import {
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "../../utils";
import CreateMenuCategory from "../CreateMenuCategory/CreateMenuCategory";
import Layout from "../Layout/Layout";

const MenuCategories = () => {
  const { menusMenuCategoriesLocations, menuCategories } =
    useContext(AppContext);
  const validMenuCategories = getMenuCategoriesByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  const [open, setOpen] = useState(false);

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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, mr: 5 }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Menu Category
        </Button>
      </Box>
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
                    fontSize: "0.8rem",
                  }}
                >
                  {getMenusCount(item.id)} menus
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
      <CreateMenuCategory open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default MenuCategories;

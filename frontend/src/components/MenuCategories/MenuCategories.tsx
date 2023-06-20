import { Box, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getMenuCategoriesByLocationId } from "../../utils";
import { Link } from "react-router-dom";

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
            <Link
              style={{ textDecoration: "none", color: "black" }}
              key={item.id}
              to={`${item.id}`}
            >
              <Box
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
            </Link>
          );
        })}
      </Box>
    </Layout>
  );
};

export default MenuCategories;

import { useContext } from "react";
import Layout from "../Layout/Layout";
import { AppContext } from "../../contexts/AppContext";
import { Box, Typography } from "@mui/material";
import { getMenusByLocationId } from "../../utils";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useContext(AppContext);

  const validMenus = getMenusByLocationId(menusMenuCategoriesLocations, menus);

  return (
    <Layout title="Menus">
      <Box sx={{ display: "flex" }}>
        {validMenus.map((item) => {
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

export default Menus;

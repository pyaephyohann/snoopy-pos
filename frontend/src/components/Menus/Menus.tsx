import { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import { AppContext } from "../../contexts/AppContext";
import { Box, Button, Typography } from "@mui/material";
import { getMenusByLocationId } from "../../utils";
import AddIcon from "@mui/icons-material/Add";
import CreateMenu from "../CreateMenu/CreateMenu";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const validMenus = getMenusByLocationId(menusMenuCategoriesLocations, menus);

  return (
    <Layout title="Menus">
      <Box sx={{ mt: 4, mr: 5, display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Menu
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        {validMenus.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                ml: "3rem",
                mt: "3rem",
                backgroundColor: "lightgray",
                padding: "1rem",
                borderRadius: "1rem",
              }}
            >
              <Typography
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                {item.name}
              </Typography>
              <img
                style={{ height: "10rem", borderRadius: "1rem" }}
                src={item.asset_url}
                alt={item.asset_url}
              />
            </Box>
          );
        })}
      </Box>
      <Box>
        <CreateMenu open={open} setOpen={setOpen} />
      </Box>
    </Layout>
  );
};

export default Menus;

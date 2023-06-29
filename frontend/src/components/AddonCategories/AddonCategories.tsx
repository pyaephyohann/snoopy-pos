import { Box, Button, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getAddonCategoriesByLocation } from "../../utils";
import AddIcon from "@mui/icons-material/Add";
import CreateAddonCategory from "../CreateAddonCategory/CreateAddonCategory";
import { Link } from "react-router-dom";

const AddonCategories = () => {
  const {
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories,
  } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const validAddonCategories = getAddonCategoriesByLocation(
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories
  );

  return (
    <Layout title="AddonCategories">
      <Box sx={{ mt: 4, mr: 5, display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Addon Category
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        {validAddonCategories.map((item) => {
          return (
            <Link
              to={`${item.id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={item.id}
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
      <CreateAddonCategory open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default AddonCategories;

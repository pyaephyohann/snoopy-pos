import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import FileDropZoneForNewMenu from "../FileDropZone/FileDropZoneForNewMenu";
import { config } from "../../config/config";
import { getAccessToken, getSelectedLocationId } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const EditMenu = () => {
  const params = useParams();

  const menuId = params.id as string;

  const { menus, fetchData } = useContext(AppContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const accessToken = getAccessToken();

  const selectedLocationId = getSelectedLocationId();

  const [updatedMenu, setUpdatedMenu] = useState({
    menuId,
    name: "",
    price: 0,
    description: "",
    assetUrl: "",
  });
  const [selectedAssetUrl, setSelectedAssetUrl] = useState<string>("");

  if (!menuId) return null;

  const menu = menus.find((item) => item.id === Number(menuId));

  const onFileSelected = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const fileType = acceptedFiles[0].type.split("/")[0] === "image";
      if (!fileType) return alert("Only Image can be uploaded");
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseJson = await response.json();
      const assetUrlFromSpace = responseJson.assetUrl;
      setSelectedAssetUrl(assetUrlFromSpace);
      setUpdatedMenu({ ...updatedMenu, assetUrl: assetUrlFromSpace });
    }
  };

  const handleUpdateMenu = async () => {
    await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMenu),
    });
    fetchData();
  };

  const handleDeleteMenu = async () => {
    await fetch(`${config.apiBaseUrl}/menus`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menuId, locationId: selectedLocationId }),
    });
    fetchData();
    navigate("/menus");
  };

  if (!menu)
    return (
      <Layout title="Edit Menu">
        <Typography>Menu not found</Typography>
      </Layout>
    );

  return (
    <Layout title="Edit Menu">
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 3 }}>
          <Button
            onClick={() => setOpen(true)}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: 5 }}>
            <TextField
              onChange={(event) =>
                setUpdatedMenu({ ...updatedMenu, name: event.target.value })
              }
              defaultValue={menu.name}
            />
          </Box>
          <Box sx={{ mb: 5 }}>
            <TextField
              type="number"
              onChange={(event) =>
                setUpdatedMenu({
                  ...updatedMenu,
                  price: Number(event.target.value),
                })
              }
              defaultValue={menu.price}
            />
          </Box>
          <Box sx={{ mb: 5 }}>
            <TextField
              onChange={(event) =>
                setUpdatedMenu({
                  ...updatedMenu,
                  description: event.target.value,
                })
              }
              defaultValue={menu.description}
            />
          </Box>
          <Box>
            <FileDropZoneForNewMenu
              onFileSelected={onFileSelected}
              assetUrl={selectedAssetUrl || menu.asset_url}
            />
          </Box>
          <Box sx={{ mt: 3, mb: 5 }}>
            <Button onClick={handleUpdateMenu} variant="contained">
              Update
            </Button>
          </Box>
        </Box>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          title="Are you sure you want to delete this menu?"
          callBack={handleDeleteMenu}
        />
      </Box>
    </Layout>
  );
};

export default EditMenu;

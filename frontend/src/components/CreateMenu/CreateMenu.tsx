import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import FileDropZone from "../FileDropZone/FileDropZone";
import { config } from "../../config/config";
import {
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "../../utils";
import { AppContext } from "../../contexts/AppContext";
import Autocomplete from "../Autocomplete/Autocomplete";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateMenu = ({ open, setOpen }: Props) => {
  const { menusMenuCategoriesLocations, menuCategories, fetchData } =
    useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const selectedLocationId = getSelectedLocationId();
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
    menuCategorieIds: [] as number[],
    locationId: selectedLocationId,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const oneFileSelected = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  const validMenuCategories = getMenuCategoriesByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  const mappedValidMenuCategories = validMenuCategories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const createNewMenu = async () => {
    const isValid = newMenu.name && newMenu.description;
    if (!isValid) return alert("Name and Description are required");
    console.log(newMenu);
    if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      newMenu.assetUrl = responseData.assetUrl;
    }
    await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle variant="h5" sx={{ textAlign: "center", mb: 1 }}>
          Create New Menu
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "25rem",
              m: "0 auto",
            }}
          >
            <TextField
              placeholder="Name"
              sx={{ mb: 3 }}
              onChange={(event) => {
                setNewMenu({ ...newMenu, name: event.target.value });
              }}
            />
            <TextField
              placeholder="Description"
              sx={{ mb: 3 }}
              onChange={(event) => {
                setNewMenu({ ...newMenu, description: event.target.value });
              }}
            />
            <TextField
              placeholder="Price"
              type="number"
              sx={{ mb: 3 }}
              onChange={(event) => {
                setNewMenu({ ...newMenu, price: Number(event.target.value) });
              }}
            />
            <Box sx={{ mb: 3 }}>
              <Autocomplete
                options={mappedValidMenuCategories}
                label="Menu Categories"
                placeholder="Menu Categories"
                onChange={(values) =>
                  setNewMenu({
                    ...newMenu,
                    menuCategorieIds: values.map((item) => item.id),
                  })
                }
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <FileDropZone oneFileSelected={oneFileSelected} />
            </Box>
            <Box sx={{ mb: 2 }}>
              {selectedFiles.map((selectedFile) => {
                return (
                  <Chip
                    sx={{ mb: 2, mr: 3 }}
                    key={selectedFile.name}
                    label={selectedFile.name.split(".")[0]}
                    onDelete={() => {
                      const filteredFiles = selectedFiles.filter((file) => {
                        return file.name !== selectedFile.name;
                      });
                      setSelectedFiles(filteredFiles);
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ mb: 2, mr: 2 }}>
            <Button
              onClick={createNewMenu}
              sx={{ width: "fit-content" }}
              variant="contained"
            >
              Create Menu
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateMenu;

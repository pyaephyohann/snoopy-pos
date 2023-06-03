import { Box, Button, Chip, TextField } from "@mui/material";
import Layout from "../Layout/Layout";
import { useState } from "react";
import FileDropZone from "../FileDropZone/FileDropZone";
import { config } from "../../config/config";

const CreateMenu = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const oneFileSelected = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  const createNewMenu = async () => {
    const isValid = newMenu.name && newMenu.description;
    if (!isValid) return alert("Name and Description are required");
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
  };

  return (
    <Layout title="Create Menu">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "20rem",
          m: "0 auto",
          mt: "5rem",
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
          <FileDropZone oneFileSelected={oneFileSelected} />
        </Box>
        <Box sx={{ mb: 2 }}>
          {selectedFiles.map((selectedFile) => {
            return (
              <Chip
                sx={{ mb: 3, mr: 3 }}
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
        <Button
          onClick={createNewMenu}
          sx={{ width: "fit-content", m: "0 auto" }}
          variant="contained"
        >
          Create Menu
        </Button>
      </Box>
    </Layout>
  );
};

export default CreateMenu;

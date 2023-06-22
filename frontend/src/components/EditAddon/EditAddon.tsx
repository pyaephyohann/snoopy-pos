import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Box, Button, TextField } from "@mui/material";
import { Addons } from "../../typings/types";
import { config } from "../../config/config";
import { getAccessToken } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const EditAddon = () => {
  const { addons, fetchData } = useContext(AppContext);
  const params = useParams();
  const addonId = params.id;
  const [addon, setAddon] = useState<Addons>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const accessToken = getAccessToken();

  useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addons]);

  const updateAddon = async () => {
    if (!addon?.name) return;
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addon),
    });
  };

  const deleteAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    fetchData();
    setOpen(false);
    navigate("/addons");
  };

  if (!addon) return null;

  return (
    <Layout title="Edit Addon">
      <Box sx={{ ml: 9, mt: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4, mr: 5 }}>
          <Button
            onClick={() => setOpen(true)}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
        <Box>
          <TextField
            onChange={(event) =>
              setAddon({ ...addon, name: event.target.value })
            }
            label="Name"
            defaultValue={addon.name}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <TextField
            onChange={(event) =>
              setAddon({ ...addon, price: Number(event.target.value) })
            }
            type="number"
            label="Price"
            defaultValue={addon.price}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <Button onClick={updateAddon} variant="contained">
            Update
          </Button>
        </Box>
      </Box>
      <Box>
        <DeleteDialog
          title="Are you sure you want to delete this addon"
          open={open}
          setOpen={setOpen}
          callBack={deleteAddon}
        />
      </Box>
    </Layout>
  );
};

export default EditAddon;

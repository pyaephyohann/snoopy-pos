import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { config } from "../../config/config";
import { getAccessToken } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const EditTable = () => {
  const { tables, fetchData } = useContext(AppContext);

  const params = useParams();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const accessToken = getAccessToken();

  const [updatedTable, setUpdatedTable] = useState("");

  const tableId = params.id as string;
  if (!tableId) return null;

  const table = tables.find((item) => item.id === Number(tableId));

  const handleUpdateTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedTable, tableId }),
    });
    fetchData();
  };

  const handleDeleteTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    fetchData();
    navigate("/tables");
  };

  if (!table)
    return (
      <Layout title="Edit Table">
        <Typography>Table not found</Typography>
      </Layout>
    );

  return (
    <Layout title="Edit Table">
      <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end", mr: 5 }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ mt: 5, ml: 15 }}>
        <TextField
          onChange={(event) => setUpdatedTable(event.target.value)}
          defaultValue={table.name}
        />
      </Box>
      <Box sx={{ mt: 5, ml: 15 }}>
        <Button onClick={handleUpdateTable} variant="contained">
          Update
        </Button>
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this table"
        open={open}
        setOpen={setOpen}
        callBack={handleDeleteTable}
      />
    </Layout>
  );
};

export default EditTable;

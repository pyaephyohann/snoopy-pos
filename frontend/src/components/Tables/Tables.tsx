import { Box, Button, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getSelectedLocationId } from "../../utils";
import CreateTable from "../CreateTable/CreateTable";
import { Link } from "react-router-dom";

const Tables = () => {
  const { tables } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const selectedLocationId = getSelectedLocationId();

  const currentLocationTables = tables.filter(
    (item) => item.locations_id === Number(selectedLocationId)
  );

  return (
    <Layout title="Tables">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: "3rem",
          px: "4rem",
        }}
      >
        <Button onClick={() => setOpen(true)} variant="contained">
          + Create Table
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          px: "3rem",
        }}
      >
        {currentLocationTables.map((table) => {
          return (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`${table.id}`}
            >
              <Box
                key={table.id}
                sx={{
                  width: "9rem",
                  height: "9rem",
                  border: "1px solid gray",
                  borderRadius: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 5,
                  mb: 5,
                }}
              >
                <Typography>{table.name}</Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
      <CreateTable open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Tables;

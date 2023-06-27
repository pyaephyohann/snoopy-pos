import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Layout from "../Layout/Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

const Settings = () => {
  const { locations, fetchData } = useContext(AppContext);

  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    if (locations.length) {
      const locationIdFromLocalStorage =
        localStorage.getItem("selectedLocationId");
      if (locationIdFromLocalStorage) {
        setSelectedLocationId(locationIdFromLocalStorage);
      } else {
        const firstLocationId = locations[0].id;
        setSelectedLocationId(String(firstLocationId));
        localStorage.setItem("selectedLocationId", String(firstLocationId));
      }
    }
  }, [locations]);

  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectedLocationId", locationId);
    fetchData();
  };

  return (
    <Layout title="Settings">
      <Box sx={{ width: "15rem", m: "0 auto", mt: "5rem" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Autocomplete</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocationId}
            label="Autocomplete"
            onChange={handleChange}
          >
            {locations.map((location) => {
              return (
                <MenuItem key={location.id} value={location.id}>
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Layout>
  );
};

export default Settings;

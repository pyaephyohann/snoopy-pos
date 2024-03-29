import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  title?: string;
}

const NavBar = ({ title }: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const navBarTitle = title ? `Snoopy POS - ${title}` : `Snoopy POS`;

  const sidebarMenuItems = [
    { id: 1, label: "Orders", icon: <LocalMallIcon />, route: "/" },
    { id: 2, label: "Menus", icon: <LocalDiningIcon />, route: "/menus" },
    {
      id: 3,
      label: "Menu Categories",
      icon: <CategoryIcon />,
      route: "/menu-categories",
    },
    { id: 4, label: "Addons", icon: <LunchDiningIcon />, route: "/addons" },
    {
      id: 5,
      label: "Addon Categories",
      icon: <ClassIcon />,
      route: "/addon-categories",
    },
    {
      id: 6,
      label: "Tables",
      icon: <TableBarIcon />,
      route: "/tables",
    },
    {
      id: 7,
      label: "Locations",
      icon: <LocationOnIcon />,
      route: "/locations",
    },
    { id: 8, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
  ];

  const renderDrawer = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        {sidebarMenuItems.slice(0, 7).map((menuItem) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={menuItem.route}
            key={menuItem.id}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((menuItem) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            key={menuItem.id}
            to={menuItem.route}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#C9A7EB", padding: "0 1rem" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {navBarTitle}
          </Typography>
          {accessToken ? (
            <Typography
              sx={{ cursor: "pointer", userSelect: "none" }}
              variant="h6"
              component="div"
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/logout");
              }}
            >
              Log out
            </Typography>
          ) : (
            <Typography
              sx={{ cursor: "pointer", userSelect: "none" }}
              variant="h6"
              component="div"
              onClick={() => {
                navigate("/login");
              }}
            >
              {window.location.pathname === "/login" ? "" : "Login"}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box>
        <Drawer open={open} onClose={() => setOpen(false)}>
          {renderDrawer()}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;

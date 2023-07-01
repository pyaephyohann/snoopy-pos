import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Menus from "../components/Menus/Menus";
import MenuCategories from "../components/MenuCategories/MenuCategories";
import Addons from "../components/Addons/Addons";
import AddonCategories from "../components/AddonCategories/AddonCategories";
import Locations from "../components/Locations/Locations";
import Settings from "../components/Settings/Settings";
import Login from "../components/Login/Login";
import Logout from "../components/Logout/Logout";
import Register from "../components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Tables from "../components/Tables/Tables";
import EditMenuCategory from "../components/EditMenuCategory/EditMenuCategory";
import EditAddon from "../components/EditAddon/EditAddon";
import EditMenu from "../components/EditMenu/EditMenu";
import EditAddonCategory from "../components/EditAddonCategory/EditAddonCategory";
import EditTable from "../components/EditTable/EditTable";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/orders" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/menus/:id" Component={EditMenu} />
          <Route path="/menu-categories" Component={MenuCategories} />
          <Route path="/menu-categories/:id" Component={EditMenuCategory} />
          <Route path="/addons" Component={Addons} />
          <Route path="/addons/:id" Component={EditAddon} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/addon-categories/:id" Component={EditAddonCategory} />
          <Route path="/locations" Component={Locations} />
          <Route path="/tables" Component={Tables} />
          <Route path="/tables/:id" Component={EditTable} />
          <Route path="/settings" Component={Settings} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

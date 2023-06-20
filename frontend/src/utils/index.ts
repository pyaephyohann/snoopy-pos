import {
  AddonCategories,
  Addons,
  Locations,
  MenuCategories,
  Menus,
  MenusAddonCategories,
  MenusMenuCategoriesLocations,
} from "../typings/types";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getSelectedLocationId = () => {
  return localStorage.getItem("selectedLocationId");
};

export const getMenuCategoriesByLocationId = (
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menuCategories: MenuCategories[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuCategoriesIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  return menuCategories.filter((item) =>
    validMenuCategoriesIds.includes(item.id)
  );
};

export const getMenusByLocationId = (
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menus: Menus[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenusIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenusIds.includes(item.id));
};

export const getAddonCategoriesByLocation = (
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menusAddonCategories: MenusAddonCategories[],
  addonCategories: AddonCategories[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenusIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.locations_id && item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);
  const validAddonCategoriesIds = menusAddonCategories
    .filter((item) => validMenusIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id);
  return addonCategories.filter((item) =>
    validAddonCategoriesIds.includes(item.id)
  );
};

export const getAddonsByLocationId = (
  addonCategories: AddonCategories[],
  addons: Addons[]
) => {
  const validAddonCategoriesIds = addonCategories.map((item) => item.id);
  return addons.filter((item) =>
    validAddonCategoriesIds.includes(item.addon_categories_id)
  );
};

export const getLocationsByMenuCategoryId = (
  locations: Locations[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menuCategoryId: string
) => {
  const validLocationIds = menusMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.locations_id);
  return locations.filter((item) => validLocationIds.includes(item.id));
};

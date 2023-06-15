interface BaseType {
  id: number;
  name: string;
}

export interface User extends BaseType {
  email: string;
  password: string;
  companies_id: number;
}

export interface Company extends BaseType {}

export interface Locations extends BaseType {
  address: string;
  companies_id: number;
}

export interface Menus extends BaseType {
  price: number;
  description: string;
  asset_url: string;
}

export interface MenuCategories extends BaseType {}

export interface AddonCategories extends BaseType {
  is_required: boolean;
}

export interface Addons extends BaseType {
  price: number;
  addon_categories_id: number;
}

export interface Tables extends BaseType {
  locations_id: number;
}

export interface MenusMenuCategoriesLocations {
  id: number;
  menus_id: number;
  menu_categories_id: number;
  locations_id: number;
}

export interface MenusAddonCategories {
  id: number;
  menus_id: number;
  addon_categories_id: number;
}

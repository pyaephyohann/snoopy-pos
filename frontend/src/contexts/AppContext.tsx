import { createContext, useEffect, useState } from "react";
import {
  AddonCategories,
  Addons,
  Company,
  Locations,
  MenuCategories,
  Menus,
  User,
} from "../typings/types";
import { config } from "../config/config";

interface DefaultContextType {
  user: User | null;
  company: Company | null;
  locations: Locations[];
  menus: Menus[];
  menuCategories: MenuCategories[];
  addonCategories: AddonCategories[];
  addons: Addons[];
  updateData: (value: any) => void;
  fetchData: () => void;
  isLoading: boolean;
}

const defaultContext = {
  user: null,
  company: null,
  locations: [],
  menus: [],
  menuCategories: [],
  addonCategories: [],
  addons: [],
  updateData: () => {},
  fetchData: () => {},
  isLoading: false,
};

export const AppContext = createContext<DefaultContextType>(defaultContext);

const AppProvider = ({ children }: any) => {
  const [data, updateData] = useState<DefaultContextType>(defaultContext);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const fetchData = async () => {
    updateData({ ...data, isLoading: true });
    const response = await fetch(config.apiBaseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    const {
      user,
      company,
      locations,
      menus,
      menuCategories,
      addonCategories,
      addons,
    } = responseJson;
    console.log(responseJson);
    updateData({
      ...data,
      user,
      company,
      locations,
      menus,
      menuCategories,
      addonCategories,
      addons,
      isLoading: false,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

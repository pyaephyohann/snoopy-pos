export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getSelectedLocationId = () => {
  return localStorage.getItem("selectedLocationId");
};

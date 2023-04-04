export const setSelectedLocationReducer = (data: any) => {
  return {
    type: "SET_SELECTED_LOCATION",
    payload: data,
  };
};

export const setFavoriateRoom = (data: any) => {
  return {
    type: "SET_FAVORITE_ROOM",
    payload: data,
  };
};

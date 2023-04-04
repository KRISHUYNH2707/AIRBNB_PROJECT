// import { combineReducers, createStore } from "redux";
// import { selectedLocationReducer } from "./reducers/selectedLocationReducer";
// import { favoriteRoomReducer } from "./reducers/favoriteRoomReducer";
// const rootReducer = combineReducers({
//     selectedLocationReducer: selectedLocationReducer,
//     favoriteRoomReducer: favoriteRoomReducer
// });

// export const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// import { commentReducer } from "./reducers/commentReducer";
// import { roomReservationReducer } from "./reducers/roomReservationReducer";
// import { roomReducer } from "./reducers/roomReducer";
// import { addressReducer } from "./reducers/addressReducer";
import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { loginReducer } from "./reducers/loginReducer";
// import { userReducer } from "./reducers/userReducer";
import { locationReducer } from "./reducers/locationReducer";

const rootReducer = combineReducers({
  // loginReducer: loginReducer,
  // userReducer: userReducer,
  locationReducer: locationReducer,
  // addressReducer: addressReducer,
  // roomReducer: roomReducer,
  // roomReservationReducer: roomReservationReducer,
  // commentReducer: commentReducer,
});

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage: storage,
      whitelist: ["addressReducer"],
    },
    rootReducer
  ),
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store["getState"]>;
export type RootDispatch = typeof store["dispatch"] &
  ThunkDispatch<RootState, any, AnyAction>;

import { reviewReducer } from "./reducers/reviewReducer";

import { roomReservationReducer } from "./reducers/roomReservationReducer";
import { roomReducer } from "./reducers/roomReducer";
import { addressReducer } from "./reducers/addressReducer";
import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginReducer } from "./reducers/loginReducer";
import { userReducer } from "./reducers/userReducer";
import { locationReducer } from "./reducers/locationReducer";

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  userReducer: userReducer,
  locationReducer: locationReducer,
  addressReducer: addressReducer,
  roomReducer: roomReducer,
  roomReservationReducer: roomReservationReducer,
  reviewReducer: reviewReducer,
});

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage: storage,
      whitelist: ["addressReducer"],
      blacklist: [],
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

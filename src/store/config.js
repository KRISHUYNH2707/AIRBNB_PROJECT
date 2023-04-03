import { combineReducers, createStore } from "redux";
import { selectedLocationReducer } from "./reducers/selectedLocationReducer";
import { favoriteRoomReducer } from "./reducers/favoriteRoomReducer";
const rootReducer = combineReducers({
    selectedLocationReducer: selectedLocationReducer,
    favoriteRoomReducer: favoriteRoomReducer
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

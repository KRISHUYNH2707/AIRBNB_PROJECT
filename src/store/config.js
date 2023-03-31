import { combineReducers, createStore } from "redux";
import { selectedLocationReducer } from "./reducers/selectedLocationReducer";

const rootReducer = combineReducers({
    selectedLocationReducer: selectedLocationReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

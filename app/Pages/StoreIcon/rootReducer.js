// rootReducer.js
import { combineReducers } from "redux";
import cartReducer from "./cartReducer"; // Adjust the path based on your project structure

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers if needed
});

export default rootReducer;

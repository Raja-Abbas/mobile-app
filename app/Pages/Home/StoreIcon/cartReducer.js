// cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartActions";

const getInitialCartState = () => {
  if (typeof window !== "undefined") {
    const storedCartItems = localStorage.getItem("cartItems");
    return {
      cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
    };
  } else {
    return {
      cartItems: [],
    };
  }
};

const initialState = getInitialCartState();

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (typeof window !== "undefined") {
        const updatedCartAdd = [...state.cartItems, action.payload];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartAdd));
        return {
          ...state,
          cartItems: updatedCartAdd,
        };
      }
      return state;
    case REMOVE_FROM_CART:
      if (typeof window !== "undefined") {
        const updatedCartRemove = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCartRemove));
        return {
          ...state,
          cartItems: updatedCartRemove,
        };
      }
      return state;
    default:
      return state;
  }
};

export default cartReducer;

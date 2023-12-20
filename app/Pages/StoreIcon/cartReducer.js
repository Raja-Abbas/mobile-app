// cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartActions";

const getInitialCartState = () => {
  const storedCartItems = localStorage.getItem("cartItems");
  return {
    cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
  };
};

const initialState = getInitialCartState();

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCartAdd = [...state.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartAdd));
      return {
        ...state,
        cartItems: updatedCartAdd,
      };
    case REMOVE_FROM_CART:
      const updatedCartRemove = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartRemove));
      return {
        ...state,
        cartItems: updatedCartRemove,
      };
    default:
      return state;
  }
};

export default cartReducer;

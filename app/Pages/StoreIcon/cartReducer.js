// cartReducer.js
const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    // Handle other cases if needed
    default:
      return state;
  }
};

export default cartReducer;

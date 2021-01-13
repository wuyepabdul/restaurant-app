import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
} from "../constants/productConstants";

const Initial_State = { products: [] };

const productReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        products: [...state.products, action.payload],
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };
    case DELETE_PRODUCT:
      return {
        products: state.products.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export default productReducer;

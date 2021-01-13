import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
} from "../constants/productConstants";

const { default: Axios } = require("axios");
const {
  START_LOADING,
  STOP_LOADING,
} = require("../constants/loadingConstants");
const {
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
} = require("../constants/messageConstants");

export const createProduct = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: START_LOADING });
    const response = await Axios.post("/api/product", formData, config);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successMessage,
    });
    dispatch({ type: CREATE_PRODUCT, payload: response.data.product });
  } catch (error) {
    console.log("api create product error", error.message);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload:
        error.response.data && error.response.data.errorMessage
          ? error.response.data.errorMessage
          : error.message,
    });
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await Axios.get("/api/product");
    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_PRODUCTS, payload: response.data.products });
  } catch (error) {
    console.log("api get product error", error.message);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload:
        error.response.data && error.response.data.errorMessage
          ? error.response.data.errorMessage
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await Axios.delete(`/api/product/${productId}`);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: DELETE_PRODUCT, payload: response.data });
  } catch (error) {
    console.log("api delete product error", error.message);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload:
        error.response.data && error.response.data.errorMessage
          ? error.response.data.errorMessage
          : error.message,
    });
  }
};

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
  } catch (error) {
    console.log("api create product error", error.message);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
  }
};

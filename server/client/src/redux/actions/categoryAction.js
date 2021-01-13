import Axios from "axios";
import {
  CREATE_CATEGORIES,
  GET_CATEGORIES,
} from "../constants/categoryConstants";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../constants/messageConstants";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await Axios.get("/api/category");
    dispatch({ type: STOP_LOADING });
    console.log("response", response.data);
    dispatch({ type: GET_CATEGORIES, payload: response.data.categories });
  } catch (error) {
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload:
        error.response.data && error.response.data.errorMessage
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: START_LOADING });
    const response = await Axios.post("/api/category", formData, config);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successMessage,
    });
    dispatch({ type: CREATE_CATEGORIES, payload: response.data.category });
  } catch (error) {
    console.log("dispatch create category api error: ", error.message);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
  }
};

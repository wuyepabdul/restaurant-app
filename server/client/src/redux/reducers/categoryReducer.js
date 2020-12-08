const {
  GET_CATEGORIES,
  CREATE_CATEGORIES,
} = require("../constants/categoryConstants");

const INITIAL_STATE = {
  categories: [],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case CREATE_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    default:
      return state;
  }
};

export default categoryReducer;

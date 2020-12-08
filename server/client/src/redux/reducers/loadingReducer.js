const {
  START_LOADING,
  STOP_LOADING,
} = require("../constants/loadingConstants");

const INITIAL_STATE = {
  loading: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        loading: true,
      };
    case STOP_LOADING:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;

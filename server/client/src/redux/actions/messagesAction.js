const { CLEAR_MESSAGES } = require("../constants/messageConstants");

export const clearMessages = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};

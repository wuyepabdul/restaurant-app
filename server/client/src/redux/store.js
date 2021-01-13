import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loadingReducer from "./reducers/loadingReducer";
import messagesReducer from "./reducers/messagesReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";

const reducer = combineReducers({
  loading: loadingReducer,
  messages: messagesReducer,
  categories: categoryReducer,
  products: productReducer,
});
const innitialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

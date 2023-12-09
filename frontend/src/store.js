import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//import reducers
import { userLoginReducer } from "./reducers/userReducers";
import { postCreateReducer } from "./reducers/postReducers";
import {
  groupCreateReducer,
  groupListReducer,
  messageCreateReducer,
  messageListReducer,
} from "./reducers/messageReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  postCreate: postCreateReducer,
  groupCreate: groupCreateReducer,
  groupList: groupListReducer,
  messageCreate: messageCreateReducer,
  messageList: messageListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

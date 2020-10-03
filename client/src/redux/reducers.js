import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import requestingReducer from "./requesting/requestingReducer";
import relation from "./relation/reducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    requesting: requestingReducer,
    users: relation,
  });

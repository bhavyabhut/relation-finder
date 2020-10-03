// middlewares
import { createHashHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import reducers from "./reducers";
import sagas from "./sagas";

// middlewares
const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware({
  onError: (error, stack) => {
    console.log(error);
  },
});
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers(history),
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middlewares))
);
export { history, store, sagaMiddleware, sagas };

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { history, store, sagaMiddleware, sagas } from "./redux";

import "./global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
sagaMiddleware.run(sagas);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
export { store, history };

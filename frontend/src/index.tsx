import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { init, RematchRootState } from "@rematch/core";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import * as models from "./models";
import { store } from "./store";
import "./index.css";

const persistor = getPersistor();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

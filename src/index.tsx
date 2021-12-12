import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import i18n from "&config/i18n";
import { App } from "./App";
import { I18nextProvider } from "react-i18next";
import { store, persistor } from "./store/store";

ReactDOM.render(
  /* Configures i18n */
  /* Links store to redux store */
  <Provider store={store}>
    {/* Persists redux store using imported persister */}
    <PersistGate loading={null} persistor={persistor}>
      {/* Configures i18n */}
      <I18nextProvider i18n={i18n}>
        {/* App main entry*/}
        <App />
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

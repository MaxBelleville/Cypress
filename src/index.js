import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import en from "./Translations/en.json";
import fr from "./Translations/fr.json";
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // language to use
  resources: {
    en: {
      common: en, // 'common' is our custom namespace
    },
    fr: {
      common: fr,
    },
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById("root")
);

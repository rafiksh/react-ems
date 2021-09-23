import React from "react";
import { useTranslation } from "react-i18next";
import "./App.css";

const App = () => {
  const { t, i18n } = useTranslation(["common"]);
  return (
    <div className="App">
      {t("HEMO")}
      <button onClick={() => i18n.changeLanguage("ar")}>Arabic</button>
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
    </div>
  );
};

export default App;

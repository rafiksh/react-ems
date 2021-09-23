import { useEffect } from "react";
import { ConfigProvider, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { usePromiseTracker } from "react-promise-tracker";

import "./App.css";
import "antd/dist/antd.css";
import { AppRouter } from "./App.router";

const App = () => {
  const { i18n } = useTranslation();
  const { promiseInProgress } = usePromiseTracker();

  /** This useEffect rerenders dir */
  useEffect(() => {}, [i18n.language]);

  return (
    /* This wrapper handles rtl and ltr directions for i18n */
    <ConfigProvider direction={i18n.dir()}>
      <AppRouter />
      <Spin spinning={promiseInProgress} />
    </ConfigProvider>
  );
};

export { App };

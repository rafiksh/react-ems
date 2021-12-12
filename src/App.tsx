import React, { CSSProperties } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ConfigProvider, Layout, message } from "antd";
import { useTranslation } from "react-i18next";

import "antd/dist/antd.css";

import "./App.css";
import { RootState } from "&store/store";
import { AppRouter } from "./App.router";
import { AppHeader } from "./App.header";
import { AppSider } from "./App.sider";

const { Content } = Layout;

type ReduxProps = ConnectedProps<typeof connector>;

const App = (props: ReduxProps) => {
  const { isMenuCollapsed } = props;
  const { i18n } = useTranslation();

  message.config({ maxCount: 1, duration: 2 });

  const renderContentStyle = (): CSSProperties => ({
    marginTop: 70,
    marginInlineStart: isMenuCollapsed ? 64 : 250,
    overflow: "auto",
    padding: 40,
    background: "#fafafa",
  });

  return (
    /* This wrapper handles rtl and ltr directions for i18n */
    <ConfigProvider direction={i18n.dir()}>
      <Layout>
        <AppHeader />
        <Layout>
          {/* Side Bar component */}
          <AppSider />
          <Content style={renderContentStyle()}>
            <AppRouter />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

/**
 * Maps state variables from redux store to props of current component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  isMenuCollapsed: state.core.isMenuCollapsed,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppRedux = connector(App);

export { AppRedux as App };

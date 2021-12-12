import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { push } from "redux-first-history";
import { RootState } from "&store/store";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";

import { SideMenu } from "&styled/menu/menu.styled";

import { ReactComponent as Tabs } from "&assets/images/ic-tabs.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const { Sider } = Layout;
const { Item, ItemGroup } = Menu;

const COLLAPSED_WIDTH = 64;
const EXPANDED_WIDTH = 250;

const AppSider = (props: ReduxProps) => {
  const { push, pathname, isMenuCollapsed } = props;
  const { t } = useTranslation(["common"]);

  return (
    <Sider
      id="sider"
      collapsible
      trigger={null}
      breakpoint="md"
      collapsed={isMenuCollapsed}
      collapsedWidth={COLLAPSED_WIDTH}
      width={EXPANDED_WIDTH}
    >
      <SideMenu selectedKeys={[pathname]}>
        <ItemGroup key="main" title={t("MAIN")}>
          <Item key="/" icon={<Tabs />} onClick={() => push("/")}>
            {t("EMPLOYEES")}
          </Item>
        </ItemGroup>
      </SideMenu>
    </Sider>
  );
};

/**
 * Maps state variables from redux store to props of current component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  pathname: state.router.location.pathname,
  isMenuCollapsed: state.core.isMenuCollapsed,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppSiderRedux = connector(AppSider);

export { AppSiderRedux as AppSider };

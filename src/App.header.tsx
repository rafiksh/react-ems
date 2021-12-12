import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { push } from "redux-first-history";
import { useTranslation } from "react-i18next";
import { Layout, Row, Menu } from "antd";

import { RootState } from "&store/store";
import { coreActions } from "&features/core/core.slice";
import { LinkButton } from "&styled/button/button.styled";

import { TopMenu } from "&styled/menu/menu.styled";

import { ReactComponent as MenuIcon } from "&assets/images/ic-menu.svg";
import { ReactComponent as Collapse } from "&assets/images/ic-collapse.svg";
import { ReactComponent as Translate } from "&assets/images/ic-translate.svg";

type ReduxProps = ConnectedProps<typeof connector>;

const { Header } = Layout;
const { SubMenu, Item } = Menu;

const AppHeader = (props: ReduxProps) => {
  const { toggleMenu, isMenuCollapsed } = props;
  const { i18n } = useTranslation(["common"]);

  const loadLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <Header id="header">
      <Row align="middle" justify="space-between">
        <LinkButton onClick={() => toggleMenu()}>
          {isMenuCollapsed ? <MenuIcon /> : <Collapse />}
        </LinkButton>
        <TopMenu>
          <SubMenu icon={<Translate />}>
            <Item
              onClick={() => {
                loadLanguage("en");
              }}
            >
              English
            </Item>
            <Item
              onClick={() => {
                loadLanguage("ar");
              }}
            >
              العربية
            </Item>
          </SubMenu>
        </TopMenu>
      </Row>
    </Header>
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
  toggleMenu: coreActions.toggleMenu,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppHeaderRedux = connector(AppHeader);

export { AppHeaderRedux as AppHeader };

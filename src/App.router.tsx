import { Router, Route, Switch, Redirect } from "react-router";
import { connect, ConnectedProps } from "react-redux";

import { history, RootState } from "&store/store";
import { EmployeesComponent } from "&features/employees/employees.component";

type ReduxProps = ConnectedProps<typeof connector>;

const AppRouter = (props: ReduxProps) => {
  return (
    <Router history={history}>
      {/* App main routing switch */}
      <Switch>
        {/* TODO remove the coming demo routes and add your's */}
        <Route exact path="/" component={() => <EmployeesComponent />} />

        {/* TODO This block handles unmatched routes. Add your custom 404 component */}
        <Route path="/404" render={() => <div>page not found</div>} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: RootState) => ({});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppRouteRedux = connector(AppRouter);

export { AppRouteRedux as AppRouter };

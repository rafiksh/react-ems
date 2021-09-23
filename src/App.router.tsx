import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      {/* App main routing switch */}
      <Switch>
        {/* TODO remove the coming demo routes and add your's */}
        <Route exact path="/" component={() => <>home</>} />
        <Route exact path="/hi" component={() => <>hi</>} />
        <Route exact path="/bye" component={() => <>bye</>} />

        {/* TODO This block handles unmatched routes. Add your custom 404 component */}
        <Route path="/404" render={() => <div>page not found</div>} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export { AppRouter };

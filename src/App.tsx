import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";

const App: React.FC = () => {
  return (
    <Switch>
      <>
        <Route exact path="/dashboard" component={Dashboard} />
      </>
    </Switch>
  );
};

export default App;

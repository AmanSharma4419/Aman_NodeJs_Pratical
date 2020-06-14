import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/Dashboard" component={Dashboard} />
      </Router>
    </>
  );
}
export default App;

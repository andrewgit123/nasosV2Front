import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="container">
        Hello!!
        <Switch>
          <Route path="/login" component={LoginForm} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;

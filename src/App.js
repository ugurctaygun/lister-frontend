import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
//Components
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Alert from "./components/layout/Alert";
import SingleList from "./components/pages/SingleList";
import CreateList from "./components/pages/CreateList";
import Bookmarks from "./components/pages/Bookmarks";
//CSS
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Alert />
          <Route exact path="/create-list" component={CreateList} />
          <Route exact path="/lists/:id" component={SingleList} />
          <Route exact path="/bookmarks" component={Bookmarks} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import SignleMeme from "./components/memes/SingleMeme";

import "./App.css";

import { ContextController } from "./context";

const App = () => {
  return (
    <ContextController>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/meme/:id" component={SignleMeme} />
            </Switch>
          </div>
        </>
      </Router>
    </ContextController>
  );
};

export default App;

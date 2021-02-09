import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import SingleMeme from "./components/memes/SingleMeme";
import EditMeme from "./components/memes/EditMeme";

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
              <Route exact path="/meme/:id" component={SingleMeme} />
              <Route exact path="/editmeme/:id" component={EditMeme} />
            </Switch>
          </div>
        </>
      </Router>
    </ContextController>
  );
};

export default App;

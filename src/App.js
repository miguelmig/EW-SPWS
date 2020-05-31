import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateCrosswalkPage from "./CreateCrosswalkPage"
import HomePage from "./HomePage";
import CreatePedestrianPage from './CreatePedestrianPage';
import CreateVehiclePage from './CreateVehiclePage';
import CrosswalkDetailPage from './CrosswalkDetailPage';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/create_crosswalk" component={CreateCrosswalkPage} />
        <Route path="/create_pedestrian" component={CreatePedestrianPage} />
        <Route path="/create_vehicle" component={CreateVehiclePage} />
        <Route path="/crosswalk/:crosswalkID" component={CrosswalkDetailPage} />
      </Switch>
      </div>
    </Router>
  );
}

/*
<Route path="/update" exact component={SelectPedestrianPage} />
<Route path="/update/:pedestrianID" component={UpdatePositionPage} />
*/


export default App;

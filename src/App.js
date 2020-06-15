import React from "react";
import "./App.css";
import {Link, Route} from "react-router-dom";
import Pizza from "./components/Pizza";

const App = () => {
  return (
    <>
      <Route exact path = "/"> 
      <Link to ="/pizza"><button>Order Form</button></Link>
      </Route>
        
      <Route exact path = "/pizza">
        <Pizza />
      </Route>

    </>
  );
};
export default App;

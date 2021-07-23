import React from 'react';
import './stylesheets/scss/global.scss';
import {Routes} from "./components/Routes";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <>
       <Router>
         <Routes />
       </Router>
    </>
  );
}

export default App;

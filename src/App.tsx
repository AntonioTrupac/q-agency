import React from 'react';
import './stylesheets/scss/global.scss';
import { Routes } from './components/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import FetchContext from './context/FetchContext';

function App() {
  return (
    <>
      <FetchContext>
        <Router>
          <Routes />
        </Router>
      </FetchContext>
    </>
  );
}

export default App;

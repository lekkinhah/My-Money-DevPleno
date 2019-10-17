import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './elements/Header';
import Home from './pages/Home';
import Movs from './pages/Movs';


function App() {

  return (
    <Router>
      <Header />
      <Route path='/' exact component={Home} />
      <Route path='/movimentacoes/:data' component={Movs} />
    </Router>
  );
}

export default App;

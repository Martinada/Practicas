import React, { Component } from 'react';
import Header from './componentes/Header';
import Productos from './componentes/productos';
import Detalle from './componentes/detalle';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  render(){
    return (
      <div className="App">
        <Header/>
      <Router>
        <Switch>
          <Route exact path="/items" component={Productos}/>
          <Route path="/items/:id" component={Detalle}/>
        </Switch>
      </Router>
    </div>
    )
  }
}

export default App;

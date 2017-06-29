import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import HomeContainer from './containers/home-container'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/home' component={HomeContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

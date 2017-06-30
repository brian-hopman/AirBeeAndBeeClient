import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import HomeContainer from './containers/home-container'
import VendorSignUp from './components/vendor-sign-up'
import ApiaryLister from './components/apiary-lister'
import ThankYou from './components/thank-you-page'
import Apiary from './components/individual-apiary'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/home' component={HomeContainer} />
            <Route path='/ApiaryLister' component={ApiaryLister} />
            <Route path='/vendorSignUp' render={() => <VendorSignUp component={VendorSignUp}/>} />
            <Route path='/ThankYou' component={ThankYou} />
            <Route path='/Apiaries' component={Apiary} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

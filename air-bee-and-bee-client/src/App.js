import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import HomeContainer from './containers/home-container'
import VendorSignUp from './components/vendor-sign-up'
import ApiaryLister from './components/apiary-lister'
import ThankYou from './components/thank-you-page'
import Apiary from './components/individual-apiary'
import ApiaryInfo from './components/apiary-info'

import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state= {
      //search
      searchTerm: '',
      //consumer
      consumerId: '',
      //vendor
      vendorId: ''
    }
    this.handlesSearch=this.handlesSearch.bind(this)
    this.setConsumerId=this.setConsumerId.bind(this)
    this.setVendorId=this.setVendorId.bind(this)
  }

  // SEARCH

  handlesSearch(event) {
    this.setState({
      searchTerm: event.target.value
    })

    fetch(`http://localhost:3000/consumers/show/${this.state.searchTerm}`, { method: 'GET',
                 headers: '',
                 mode: 'cors',
                 cache: 'default' }
          )
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }


  setConsumerId(id) {
    this.setState({
      consumerId: id
    })
    console.log(this.state.consumerId)

  }

  setVendorId(id) {
    this.setState({
        vendorId: id
      })
    console.log(this.state)
    }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/home' component={() => <HomeContainer handlesSearch={this.handlesSearch} searchTerm={this.state.searchTerm} setConsumerId={this.setConsumerId} appState={this.state}/>} />
            <Route path='/ApiaryLister' component={()=> ApiaryLister} />
            <Route path='/vendorSignUp' component={() => <VendorSignUp appState={this.state} setVendorId={this.setVendorId}/>}/>
            <Route path='/ThankYou' component={ThankYou} />
            <Route path='/Apiary' component={Apiary} />
            <Route path='/ApiaryInfo' component={ApiaryInfo} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

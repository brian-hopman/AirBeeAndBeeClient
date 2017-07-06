import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom'

import HomeContainer from './containers/home-container'
import VendorSignUp from './components/vendor-sign-up'
import ApiaryLister from './components/apiary-lister'
import ThankYou from './components/thank-you-page'
import Apiary from './components/individual-apiary'
import ApiaryInfo from './components/apiary-info'
import Cart from './components/cart'
import SearchBar from './components/searchbar'

import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state= {
      apiaryId: '',
      //search
      searchTerm: '',
      //consumer
      consumerId: '',
      //vendor
      vendorId: '',
      //product
      productId: '',

      cart: '',

      productInCartId: ''
    }
    this.handlesSearch=this.handlesSearch.bind(this)
    this.setConsumerId=this.setConsumerId.bind(this)
    this.setVendorId=this.setVendorId.bind(this)
    this.setProductId=this.setProductId.bind(this)
    this.handlesClick=this.handlesClick.bind(this)
    this.setCart=this.setCart.bind(this)
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

  handlesClick(event) {
    let ary = event.target.href.split('/')
    let id = parseInt(ary[ary.length-1])
    this.setState({
      apiaryId: id
    })
  }


  setConsumerId(id) {
    this.setState({
      consumerId: id
    })
  }

  setVendorId(id) {
    this.setState({
        vendorId: id
      })
    }

  setProductId(id) {
    this.setState({
        productId: id
      })
    }

  // setProductInCartId(e) {
  //   debugger
  //   this.setState({
  //       productInCartId: e
  //     })
  //   }

  setCart(e) {
    this.setState({
      cart: e.target.innerText
    })
    console.log(this.state.cart)
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
          <SearchBar handlesSearch={this.handlesSearch} searchTerm={this.state.searchTerm}/>

            <Switch>
              <Route path='/home' component={() => <HomeContainer handlesSearch={this.handlesSearch} searchTerm={this.state.searchTerm} setConsumerId={this.setConsumerId} appState={this.state}/>} />
              <Route path='/ApiaryLister' component={() => <ApiaryLister handlesClick={this.handlesClick}/>} />
              <Route path='/vendorSignUp' component={() => <VendorSignUp appState={this.state} setVendorId={this.setVendorId} setProductId={this.setProductId}/>}/>
              <Route path='/ThankYou' component={ThankYou} />
              <Route path='/Apiary/:id' component={() => <Apiary apiaryId={this.state.apiaryId} setCart={this.setCart}/>} />
              <Route path='/ApiaryInfo' component={ApiaryInfo} />
              <Route path='/cart' component={() => <Cart state={this.state}/>}/>
            </Switch>

      </div>
    );
  }
}

export default App;

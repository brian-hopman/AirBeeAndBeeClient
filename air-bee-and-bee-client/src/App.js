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
import AddProduct from './components/add-product'

import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state= {
      apiaryId: '',
      //search
      searchTerm: '',

      resultsAry: [],
      //consumer
      consumerId: '',
      //vendor
      vendorId: '',
      //product
      productId: '',

      cart: [],

      productAry: [],

      price: 0
    }
    this.handlesSearch=this.handlesSearch.bind(this)
    this.setConsumerId=this.setConsumerId.bind(this)
    this.setVendorId=this.setVendorId.bind(this)
    this.setProductId=this.setProductId.bind(this)
    this.handlesClick=this.handlesClick.bind(this)
    this.setCookie=this.setCookie.bind(this)
    //this.setCart=this.setCart.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.newCart = this.newCart.bind(this)
    this.setsPrice = this.setsPrice.bind(this)
    //this.handlesProductAry=this.handlesProductAry.bind(this)
  }

  // SEARCH

  handlesSearch(event) {
    this.setState({
      searchTerm: event.target.value
    })

    fetch(`http://localhost:3000/products/search/${event.target.value}`, { method: 'GET',
                 headers: '',
                 mode: 'cors',
                 cache: 'default' }
          )
    .then(resp => resp.json())
    .then(resp => this.setsResultsAry(resp))
  }

  setsResultsAry(resp) {
    this.setState({
      resultsAry: resp
    })
    console.log(this.state.resultsAry)
  }


  handlesClick(event) {
    let ary = event.target.href.split('/')
    let id = parseInt(ary[ary.length-1])
    this.setState({
      apiaryId: id
    })
    this.setCookie('apiaryId', id)
  }


  setConsumerId(id) {
    debugger
    this.setState({
      consumerId: id
    })
    this.setCookie('consumerId', id)
    console.log(this.state.consumerId)
    console.log(document.cookie)
  }

  setVendorId(id) {
    this.setState({
        vendorId: id
      })
    this.setCookie('vendorId', id)
  }

  setProductId(id) {
    this.setState({
        productId: id
      })
  }

  // handlesProductAry(resp) {
  //   //debugger
  //   this.setState({
  //     productAry: resp
  //   })
  // }

  setsPrice() {
    var results = [];
    let price = 0
    let obj = this.state.cart

    for (var p in obj) {
      if( obj.hasOwnProperty(p) ) {
        results.push(obj[p])
      }
    }

    results.forEach((item, i, arr) => (
      price += item.p * item.q
      )
    )

    this.setState({price})
  }

  newCart(item) {
    //Get current state
    let prevState = this.state.cart
    //Determine product quantity
    let productQuantity = () => (prevState[`HoneyId-${item.id}`] ? (prevState[`HoneyId-${item.id}`].q + 1) : (1))
    //Initially set the cart and set the quantity to the existing quantity + 1 or null plus 1 which will equal 1
    let cartItem = {[`HoneyId-${item.id}`]:{q:productQuantity(),d:item.title, p:item.price}}
    //Determine the next value of cart
    let nextCart = Object.assign( {},prevState,cartItem )
    //set the new state
    this.setState({
      cart: nextCart
    })

    this.setsPrice()
  }

  addToCart(event) {
    let item = JSON.parse(event.target.dataset.product)

    this.newCart(item)
    console.log(this.state.cart)
    }

  setCookie(name, id) {
    var d = new Date();
    d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + id + ";" + expires + ";path=/";
  }

  // shouldComponentUpdate(nextProps,nextState) {
  //   debugger
  //   let array1 = this.state.productAry
  //   let array2 = nextState.productAry
  //   if (array1.length == array2.length) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }


  render() {
    return (
      <div className="App">
          <SearchBar handlesSearch={this.handlesSearch} searchTerm={this.state.searchTerm} resultsAry={this.state.resultsAry} displaysSearchResult={this.displaysSearchResult}/>

            <Switch>
              <Route path='/AddProduct' component={() => <AddProduct appState={this.state}  setProductId={this.setProductId}/>}/>
              <Route path='/signUp' component={() => <HomeContainer handlesSearch={this.handlesSearch} searchTerm={this.state.searchTerm} setConsumerId={this.setConsumerId} appState={this.state}/>} />
              <Route path='/vendorSignUp' component={() => <VendorSignUp appState={this.state} setVendorId={this.setVendorId}/>}/>
              <Route path='/ThankYou' component={ThankYou} />
              <Route path='/Apiary/:id' component={() => <Apiary apiaryId={this.state.apiaryId} setCart={this.setCart} addToCart={this.addToCart}/>} />
              <Route path='/ApiaryInfo' component={ApiaryInfo} />
              <Route path='/cart' component={() => <Cart cart={this.state.cart} setsPrice={this.setsPrice} price={this.state.price}/>}/>
              <Route path='/' component={() => <ApiaryLister handlesClick={this.handlesClick}/>} />
            </Switch>

      </div>
    );
  }
}

export default App;

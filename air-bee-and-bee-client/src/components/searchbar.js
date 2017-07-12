import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Search, Grid, Header, Menu, Dropdown } from 'semantic-ui-react'

import ApiaryLister from './apiary-lister'

class SearchBar extends Component {
  constructor(props) {
    super(props)



    this.redirectsToCart=this.redirectsToCart.bind(this)
    this.redirectsToSignUp=this.redirectsToSignUp.bind(this)
    this.redirectsApiaryLister=this.redirectsApiaryLister.bind(this)
    this.redirectsToHome=this.redirectsToHome.bind(this)
    this.redirectsToAddProduct=this.redirectsToAddProduct.bind(this)
    this.getCookie=this.getCookie.bind(this)
    this.deleteCookie=this.deleteCookie.bind(this)
    this.checksForUsername=this.checksForUsername.bind(this)
    this.handleResultSelect=this.handleResultSelect.bind(this)
  }

  redirectsToCart() {
    this.props.history.push('/cart')
  }

  redirectsApiaryLister() {
    this.props.history.push('/')
  }

  redirectsToHome() {
    this.props.history.push('/home')
  }

  redirectsToAddProduct() {
    this.props.history.push('/AddProduct')
  }

  redirectsToSignUp() {
    this.props.history.push('/SignUp')
  }



  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  deleteCookie( name ) {
    document.cookie = 'username' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'vendorId' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'consumerId' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.props.history.push('/')
  }

  checksForUsername() {
    return this.getCookie('username') ? `Welcome ${this.getCookie('username')}` : false
  }

  handleResultSelect(e, result) {
    this.props.history.push(`/Apiary/${result.vendor_id}`)
  }





  render() {
    let signup = ''
    let addProduct = ''
    let welcomeMessage = ''
    let logout = ''
    let cart = ''

    let isUser = document.cookie.includes('username')
    let isLoggedIn = document.cookie.includes('username') || document.cookie.includes('vendorId')
    let isVendor = document.cookie.includes('vendorId')

    if (!isLoggedIn) {
       signup = <Menu.Item name='Sign Up' onClick={this.redirectsToSignUp}/>
    }

    if ( isVendor ) {
       addProduct = <Menu.Item name='add product' className='hidden content' onClick={this.redirectsToAddProduct}/>
    }

    if ( isLoggedIn ) {
      logout = <Menu.Item name='Logout' onClick={this.deleteCookie}/>
    }

    if ( isUser ) {
      welcomeMessage = <Menu.Item name={this.checksForUsername()}/>
    }

    if ( isLoggedIn ) {
      cart = <Menu.Item name='Your Cart' onClick={this.redirectsToCart}/>
    }

    return (
      <div>
      <Menu>
        {signup}
        <Menu.Item name= 'Air Bee And Bee' onClick={this.redirectsToHome}/>
        {addProduct}
        {cart}
        {welcomeMessage}
        {logout}
        <Search className="search-bar"
            results={this.props.resultsAry}
            onResultSelect={this.handleResultSelect}
            placeholder='search'
            onSearchChange={this.props.handlesSearch}
            value={this.props.searchTerm}
          />
      </Menu>

      </div>
    )
  }
}

export default withRouter(SearchBar)

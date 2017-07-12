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
    this.props.history.push('/')
  }

  checksForUsername() {
    return this.getCookie('username') ? `Welcome ${this.getCookie('username')}` : false
  }

  handleResultSelect(e, result) {
    this.props.history.push(`/Apiary/${result.vendor_id}`)
  }





  render() {
    return (
      <div>
      <Menu secondary >

        <Menu.Item name='Sign Up' onClick={this.redirectsToSignUp}/>
        <Menu.Item name= 'Home' onClick={this.redirectsToHome}/>

        <Search
            results={this.props.resultsAry}
            onResultSelect={this.handleResultSelect}
            placeholder='search'
            onSearchChange={this.props.handlesSearch}
            value={this.props.searchTerm}
          />

        <Menu.Item name='add-product' onClick={this.redirectsToAddProduct}/>
        <Menu.Item name='Your Cart' onClick={this.redirectsToCart}/>
        <Menu.Item name='Log Out' onClick={this.deleteCookie}/>
        <h2 className='ui header'>Air Bee And Bee</h2>
        <h4>{this.checksForUsername()}</h4>
      </Menu>
      </div>
    )
  }
}

export default withRouter(SearchBar)

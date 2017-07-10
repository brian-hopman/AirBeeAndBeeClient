import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Search, Grid, Header, Menu } from 'semantic-ui-react'

import ApiaryLister from './apiary-lister'

class SearchBar extends Component {
  constructor(props) {
    super(props)



    this.redirectsToCart=this.redirectsToCart.bind(this)
    this.redirectsApiaryLister=this.redirectsApiaryLister.bind(this)
    this.redirectsToHome=this.redirectsToHome.bind(this)
    this.redirectsToAddProduct=this.redirectsToAddProduct.bind(this)
    this.getCookie=this.getCookie.bind(this)
  }

  redirectsToCart() {
    this.props.history.push('/cart')
  }

  redirectsApiaryLister() {
    this.props.history.push('/ApiaryLister')
  }

  redirectsToHome() {
    this.props.history.push('/home')
  }

  redirectsToAddProduct() {
    this.props.history.push('/AddProduct')
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




  render() {
    return (
      <div>
      <Menu secondary>
        <Menu.Item name='Our Apiaries' onClick={this.redirectsApiaryLister}/>
        <Menu.Item name= 'Home' onClick={this.redirectsToHome}/>

        <Search aligned='right' placeholder='search...' value={this.props.searchTerm} onChange={console.log('asdasd')}   />

        <Menu.Item name='add-product' onClick={this.redirectsToAddProduct}/>
        <Menu.Item name='Your Cart' onClick={this.redirectsToCart}/>
        <h2 className='ui header'>Air Bee And Bee</h2>
        <h2>  Welcome {this.getCookie('money')}</h2>
      </Menu>
      </div>
    )
  }
}

export default withRouter(SearchBar)

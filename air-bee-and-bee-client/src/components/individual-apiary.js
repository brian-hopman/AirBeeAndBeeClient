import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import SearchBar from './searchbar'


class Apiary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      productAry: [],
      cart: []
    }

    // this.deleteCookie = this.deleteCookie.bind(this)
    // this.setCookie = this.setCookie.bind(this)
    // this.getCookie = this.getCookie.bind(this)
    this.handlesProductAry = this.handlesProductAry.bind(this)
    this.getsProducts = this.getsProducts.bind(this)
    //this.setCart = this.setCart.bind(this)
    this.rendersAllProducts = this.rendersAllProducts.bind(this)
  }

      //Mock the existance of a state
    //this.state = []
    //Mock the existance of the cart object
    //this.state.cart = {}
    //Mock a setState function
  //  this.setState = (nextState) => ( this.state.cart = Object.assign({},this.state.cart,nextState) )

    newCart = (item) => {
      let prevCart = this.state.cart
      //Function to calculate the product quanity
      let productQuantity = () => (prevCart[item.id] ? (prevCart[item.id].q + 1) : (1))
      //Initially set the cart and set the quantity to the existing quantity + 1 or null plus 1 which will equal 1
      let cartItem = {[item.id]:{q:productQuantity(),d:item.desc}}
      //set the new state
      this.setState(cartItem)
    }

    //Structure of a product
    // let item = {id:1,desc:'Honey from the Flatiron School, kind of sweet but very reactive'}
    // let item2 = {id:2,desc:'Redux honey, predictible taste but assumes a lot of react'}

    //Start from an emtphy cart and add one item
  //  cart1 = newCart(item)
    //console.log(`Cart with one item`)
    //console.log(this.state.cart[item.id])

    //add and existing item
    //console.log(`Cart with one item but increased quantity`)
    //cart2 = newCart(item)
    //console.log(this.state.cart[item.id])

    //add a new item
    // console.log(`Cart with two items`)
    // cart3 = newCart(item2)
    // cart3 = newCart(item2)
    // cart3 = newCart(item2)
    // cart3 = newCart(item2)
    // console.log(this.state.cart[item.id])
    // console.log(this.state.cart[item2.id])



  // setCookie() {
  //   var d = new Date();
  //   d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
  //   var expires = "expires="+d.toUTCString();
  //   document.cookie = 'productId' + "=" + this.state.productId + ";" + expires + ";path=/";
  //   console.log(document.cookie)
  //   }
  //
  // getCookie(cname) {
  //   var name = cname + "=";
  //   var ca = document.cookie.split(';');
  //   for(var i = 0; i < ca.length; i++) {
  //       var c = ca[i];
  //       while (c.charAt(0) == ' ') {
  //           c = c.substring(1);
  //       }
  //       if (c.indexOf(name) == 0) {
  //           return c.substring(name.length, c.length);
  //       }
  //   }
  //   return "";
  // }

  // deleteCookie( name ) {
  //   document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // }



  getsIndividulApiary() {
      let id = JSON.stringify(this.props.apiaryId)
      fetch(`http://localhost:3000/vendors/${window.location.href.split('/')[4]}`, {
                   method: 'GET',
                   headers: id,
                   mode: 'cors',
                   cache: 'default' }
            )
      .then(resp => resp.json())
      .then(resp => this.handlesState(resp))
  }

  //need to get apiary id into state in app, then fetch from there
  getsProducts() {
    fetch(`http://localhost:3000/products/${window.location.href.split('/')[4]}`, {
                 method: 'GET',
                 headers: '',
                 mode: 'cors',
                 cache: 'default' }
          )
    .then(resp => resp.json())
    .then(resp => this.handlesProductAry(resp))
  }


  componentDidMount() {
    this.getsIndividulApiary()
    this.getsProducts()
  }

  handlesState(resp) {
    this.setState({
      name: resp.name
    })
  }

  handlesProductAry(resp) {
    this.setState({
      productAry: resp
    })
  }

  // setCart(product) {
  //   this.setState((prevState) => {
  //     return {cart: prevState.cart + product.id}
  //   })
  //   console.log(this.state.cart)
  // }


  rendersAllProducts() {


    let allProducts = this.state.productAry.map(product => {
    let id = product.id

        return (
            <div key={product.id}>
              <h1>{product.title}</h1>
              <img alt='' src={product.product_image}></img>
              <input data-product={JSON.stringify(product)} type='button' onClick={this.props.addToCart} id={id} value='Add to Cart'></input>
            </div>
        )
      })
    return allProducts
  }



  render() {

    return (
      <div>
        <h1>{this.state.name}</h1>
        {this.rendersAllProducts()}

      </div>
    )
  }
}

export default withRouter(Apiary)

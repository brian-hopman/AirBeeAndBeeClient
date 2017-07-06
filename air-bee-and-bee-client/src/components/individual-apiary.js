import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import SearchBar from './searchbar'


class Apiary extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      productAry: [],
      productName: '',
      productId: '',
      productImage: ""
    }

    this.deleteCookie = this.deleteCookie.bind(this)
    this.setCookie = this.setCookie.bind(this)
    this.getCookie = this.getCookie.bind(this)
  }


  setCookie() {
    var d = new Date();
    d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = 'productId' + "=" + this.state.productId + ";" + expires + ";path=/";
    console.log(document.cookie)
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
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }


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

  getsProducts() {
    fetch(`http://localhost:3000/products/${window.location.href.split('/')[4]}`, {
                 method: 'GET',
                 headers: '',
                 mode: 'cors',
                 cache: 'default' }
          )
    .then(resp => resp.json())
    .then(resp => this.handlesProductState(resp))
  }

  componentDidMount() {
    this.getsIndividulApiary()
    this.getsProducts()
  }

  handlesState(resp) {
    this.setState({
      name: resp.name,
    })
  }

  handlesProductState(resp) {
    let content = [resp]
    this.setState({
      productAry: resp,
      productName: content[0][0].title,
      productImage: content[0][0].product_image,
      productId:content[0][0].id
    })
  }


  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h1>{this.state.productName}</h1>
        <img alt='' src={this.state.productImage}></img>
        <input type='submit' onClick={this.setCookie} value='Add to Cart'></input>
      </div>
    )
  }
}

export default withRouter(Apiary)

import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Input, Button } from 'semantic-ui-react'


class Cart extends Component {
  constructor(props) {
    super(props)


    this.redirectsToThankYou=this.redirectsToThankYou.bind(this)
    this.getCookie=this.getCookie.bind(this)
    this.handlesTransactionSubmit=this.handlesTransactionSubmit.bind(this)
    this.mapsCart=this.mapsCart.bind(this)
  }

  handlesTransactionSubmit(e) {
    e.preventDefault()
    this.redirectsToThankYou()
    let state={
          cart: this.state.cart.map(item => item)
        }

    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let data = JSON.stringify(state)
    debugger
    fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: headers,
      body: data
    })
    .then(res => res.json())
    .then(res => this.props.setProductId(res.productId))
  }


  redirectsToThankYou() {
    this.props.history.push('/ThankYou')
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

  fetchesProducts() {
    fetch('http://localhost:3000/products/', {
      method: 'GET',
      headers: '',
      mode: 'cors',
      cache: 'default'
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      vendors: data}))
  }

  showObject(obj) {
    var results = [];
      for (var p in obj) {
        if( obj.hasOwnProperty(p) ) {
          results.push(obj[p])
        }
      }
    return results;
  }



  mapsCart() {
    let results = this.showObject(this.props.cart)

    return (
      results.map(item =>
        (
          <li>{item.d} x {item.q}</li>
        )
      )
    )
  }


  render() {
    return (

      <div>
      <h2>Purchase {this.getCookie('money')}</h2>
        <div>
          {this.mapsCart()}
        </div>
        <div className="ui raised very padded text container segment">
          <form onSubmit={this.redirectsToThankYou}>
            <label>Ship To<input type='text' id='shippingAddress' ></input></label><br/>
            <label>Shipping Address<input type='text' id='shippingAddress' ></input></label><br/>
            <label>City<input type='text' id='city' ></input></label><br/>
            <label>State<input type='text' id='city' ></input></label><br/>
            <label>Zip<input type='text' id='CCinfo' ></input></label><br/>
            <br/>
            <br/>
            <br/>
            <label>Credit Card Number<input type='text' id='CCinfo' ></input></label><br/>
            <label>Security Code<input type='text' id='CCinfo' ></input></label><br/>
            <label>Expiration Date<input type='text' id='CCinfo' ></input></label><br/>
            <Button primary animated='fade'>
              <Button.Content visible onClick={this.handlesProductFormSubmit}>
                Checkout
              </Button.Content>
              <Button.Content hidden>
                $ {this.props.price}
              </Button.Content>
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Cart)

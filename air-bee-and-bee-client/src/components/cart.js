import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Input, Button, Image } from 'semantic-ui-react'


class Cart extends Component {
  constructor(props) {
    super(props)

    this.checkOut=this.checkOut.bind(this)
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
          <div>
          <Image src={item.pic} as='a' size='small'/>
          <li>{item.d} x {item.q}</li>
          </div>
        )
      )
    )
  }

  checkOut(event) {
    event.preventDefault()
    let ccNumber = document.getElementById('cc-number').value
    let ccValidation = ccNumber.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)

    if (ccValidation == null) {
      alert('Sorry, the Credit Card number does not appear to be valid')
    } else if (ccValidation.length > 0) {
      this.props.history.push('/ThankYou')
    } else {
      console.log("I don't know what is going on")
    }
  }


  render() {
    return (

      <div>
      <h2>Your Cart</h2>
        <div>
          {this.mapsCart()}
        </div>
        <div className="ui raised very padded text container segment checkout-form-container">
          <form className='checkout-form' onSubmit={this.checkOut}>
            <label>Ship To:<br/><input type='text' id='shippingAddress' ></input></label><br/><br/>
            <label>Shipping Address:<br/><input type='text' id='shippingAddress' ></input></label><br/><br/>
            <label>City:<br/><input type='text' id='city' ></input></label><br/><br/>
            <label>State:<br/><input type='text' id='city' ></input></label><br/><br/>
            <label>Zip:<br/><input type='text' id='CCinfo' ></input></label><br/><br/>
            <br/>
            <br/>
            <br/>
            <label>Credit Card Number:<br/><input type='text' id='cc-number' ></input></label><br/><br/>
            <label>Security Code:<br/><input type='text' id='CCinfo' ></input></label><br/><br/>
            <label>Expiration Date:<br/><input type='text' id='CCinfo' ></input></label><br/><br/>
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

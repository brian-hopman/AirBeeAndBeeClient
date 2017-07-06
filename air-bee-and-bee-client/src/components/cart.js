import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Input, Button } from 'semantic-ui-react'


class Cart extends Component {
  constructor(props) {
    super(props)

    this.redirectsToThankYou=this.redirectsToThankYou.bind(this)
    this.getCookie=this.getCookie.bind(this)
  }

  handlesProductFormSubmit(e) {
    e.preventDefault()
    this.redirectsToThankYou()
    // let state={
    //       cart: 'asd'
    //     }
    //
    // let headers = new Headers();
    // headers.set('Content-Type', 'application/json');
    // let data = JSON.stringify(state)
    // fetch('http://localhost:3000/transactions', {
    //   method: 'POST',
    //   headers: headers,
    //   body: data
    // })
    // .then(res => res.json())
    // .then(res => this.props.setProductId(res.productId))
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


  render() {
    console.log(this.props.state)
    return (

      <div>
      <h2>Purchase {this.getCookie('money')}</h2>
        <form onSubmit={this.redirectsToThankYou}>
          <label>Credit Card Number:<input type='text' id='CCinfo' ></input></label><br/>
          <Button animated='fade'>
            <Button.Content visible>
              Checkout
            </Button.Content>
            <Button.Content hidden>
              Purchase {document.cookie}
            </Button.Content>
          </Button>
        </form>
      </div>
    )
  }
}

export default withRouter(Cart)

import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Input, Button } from 'semantic-ui-react'


class Cart extends Component {
  constructor(props) {
    super(props)

    this.redirectsToThankYou=this.redirectsToThankYou.bind(this)
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


  render() {
    console.log(this.props.state)
    return (

      <div>
        <form onSubmit={this.redirectsToThankYou}>
          <label>Credit Card Number:<input type='text' id='CCinfo' ></input></label><br/>
          <Button animated='fade'>
            <Button.Content visible>
              Checkout
            </Button.Content>
            <Button.Content hidden>
              Price
            </Button.Content>
          </Button>
        </form>
      </div>
    )
  }
}

export default withRouter(Cart)

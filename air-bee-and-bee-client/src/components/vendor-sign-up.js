import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

import SearchBar from './searchbar'

class VendorSignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiaryName: '',
      apiaryImage: '',
      productTitle: '',
      productImage: ''
    }

    this.handlesChange=this.handlesChange.bind(this)
    this.handlesFormSubmit=this.handlesFormSubmit.bind(this)
    this.handlesProductFormSubmit=this.handlesProductFormSubmit.bind(this)
  }

  handlesChange(e) {
    this.setState({
      apiaryName: document.getElementById('apiaryName').value,
      apiaryImage: document.getElementById('apiaryImage').value,
    })
  }

  handlesFormSubmit() {
  let state={
       name: this.state.apiaryName,
       apiary_image: this.state.apiaryImage
      }

    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let data = JSON.stringify(state)
    fetch('http://localhost:3000/vendors', {
      method: 'POST',
      headers: headers,
      body: data
    })
    .then(res => res.json())
    .then(res => this.props.setVendorId(res.vendorId))
    this.props.history.push('/AddProduct')
  }





// THIS DOES THE PRODUCT SUBMIT
  handlesProductFormSubmit() {
    debugger


  let state={
       consumer_id: this.props.appState.consumerId,
       vendor_id: this.props.appState.vendorId,
       vendor_image: this.state.apiaryImage,
       title: this.state.productTitle,
       product_image: this.state.productImage
      }

    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let data = JSON.stringify(state)
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: headers,
      body: data
    })
    .then(res => res.json())
    .then(res => this.props.setProductId(res.productId))
  }



  render() {
    return (
    <div className="ui raised very padded text container segment">
          <form onSubmit={this.handlesFormSubmit} onChange={this.handlesChange}>
            <label>Name of Apiary:<input type='text' id='apiaryName' value={this.state.apiaryName}></input></label><br/>
            <label>Imaged of Apiary:<input type='text' id='apiaryImage' value={this.state.apiaryImage}></input></label><br/>
            <Button primary type='submit'>Submit</Button>
          </form>

     </div>
    )
  }
}

export default withRouter(VendorSignUp)

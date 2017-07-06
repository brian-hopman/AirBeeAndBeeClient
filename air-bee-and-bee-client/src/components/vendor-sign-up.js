import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

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
      productTitle: document.getElementById('productTitle').value,
      productImage: document.getElementById('productImage').value
    })
  }

  handlesFormSubmit(e) {
  e.preventDefault()
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
  }




// THIS DOES THE PRODUCT SUBMIT
  handlesProductFormSubmit(e) {
  e.preventDefault()

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

          <br></br>

          <form onSubmit={this.handlesProductFormSubmit} onChange={this.handlesChange}>
            <label>Products:<input type='text' id='productTitle' value={this.state.productTitle}></input></label><br/>
            <br></br>
            <label>Product Image:<input type='text' id='productImage' value={this.state.productImage}></input></label><br/>

            <Button primary type='submit'>Submit</Button>
          </form>

     </div>
    )
  }
}

export default VendorSignUp

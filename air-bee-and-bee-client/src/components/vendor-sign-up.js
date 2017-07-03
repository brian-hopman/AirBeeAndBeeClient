import React, { Component } from 'react'

class VendorSignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiaryName: '',
      productTitle: ''
    }

    this.handlesChange=this.handlesChange.bind(this)
    this.handlesFormSubmit=this.handlesFormSubmit.bind(this)
    this.handlesProductFormSubmit=this.handlesProductFormSubmit.bind(this)
  }

  handlesChange(e) {
    this.setState({
      apiaryName: document.getElementById('apiaryName').value,
      productTitle: document.getElementById('productTitle').value
    })
  }

  handlesFormSubmit(e) {
  e.preventDefault()
  let state={
       name: this.state.apiaryName,
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
  debugger
  let state={
       consumer_id: this.props.appState.consumerId,
       vendor_id: this.props.appState.vendorId,
       title: this.state.productTitle
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
    .then(res => console.log(res))
  }

  render() {
    return (
    <div>
        <form onSubmit={this.handlesFormSubmit} onChange={this.handlesChange}>
          <label>Name of Apiary:<input type='text' id='apiaryName' value={this.state.apiaryName}></input></label><br/>
          <input type='submit' value='submit'></input>
        </form>

        <form onSubmit={this.handlesProductFormSubmit} onChange={this.handlesChange}>
          <label>Products:<input type='text' id='productTitle' value={this.state.productTitle}></input></label><br/>
          <input type='submit' value='submit'></input>
        </form>
     </div>
    )
  }
}

export default VendorSignUp

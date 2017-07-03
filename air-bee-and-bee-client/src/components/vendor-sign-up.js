import React, { Component } from 'react'

class VendorSignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiaryName: ''
    }

    this.handlesChange=this.handlesChange.bind(this)
    this.handlesFormSubmit=this.handlesFormSubmit.bind(this)
  }

  handlesChange(e) {
    this.setState({
      apiaryName: document.getElementById('apiaryName').value
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

  render() {
    return (
      <form onSubmit={this.handlesFormSubmit} onChange={this.handlesChange}>
         <label>Name of Apiary:<input type='text' id='apiaryName' value={this.state.apiaryName}></input></label><br/>
         <input type='submit' value='submit'></input>
     </form>
    )
  }
}

export default VendorSignUp

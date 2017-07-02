import React from 'react'
import { Component } from 'react'

class ApiaryInfo extends Component {
  constructor() {
    super()

    this.state = {
      title: ''
    }
    this.handlesChange = this.handlesChange.bind(this)
    this.handlesFormSubmit = this.handlesFormSubmit.bind(this)
  }

  handlesChange(e) {
    this.setState({
      title: document.getElementById('productTitle').value,
    })
  }

  handlesFormSubmit(e) {
    e.preventDefault()
    let state={
         title: this.state.title
       }
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let data = JSON.stringify(state)
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: headers,
      body: data
    })
  }

  render() {
    return (
      <form onChange ={this.handlesChange} onSubmit={this.handlesFormSubmit}>
         <label>product title:<input type='text' id='productTitle' value={this.state.lastName}></input></label><br/>
         <input type='submit' value='submit'></input>
     </form>
    )
  }


}

export default ApiaryInfo

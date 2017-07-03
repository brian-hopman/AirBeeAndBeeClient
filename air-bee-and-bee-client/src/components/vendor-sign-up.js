import React, { Component } from 'react'

class VendorSignUp extends Component {
  constructor() {
    super()



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
    console.log('asasdasdasd')
  }

  render() {
    return (
      <form onSubmit={this.props.handlesFormSubmit} onChange={this.props.handlesChange}>
         <label>Name of Apiary:<input type='text' id='apiaryName' value={this.state.apiaryName}></input></label><br/>
         <input type='submit' value='submit'></input>
     </form>
    )
  }
}

export default VendorSignUp

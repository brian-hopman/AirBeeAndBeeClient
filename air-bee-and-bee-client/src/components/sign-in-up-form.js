import React, { Component } from 'react'



class SignInUpForm extends Component {



 //should contain own state
 //state onject will have all of input fields
 //onSubmit takes local state and makes the post request
 constructor(props){
   super(props)
   this.state = {
     firstName: '',
     lastName: '',
     email: '',
     vendorAccount: false
   }
   this.handlesChange = this.handlesChange.bind(this)
   this.handlesFormSubmit = this.handlesFormSubmit.bind(this)
   this.redirectsToVendorSignUp = this.redirectsToVendorSignUp.bind(this)
 }

 handlesChange(e) {
   this.setState({
     firstName: document.getElementById('firstName').value,
     lastName: document.getElementById('lastName').value,
     email: document.getElementById('email').value,
     vendorAccount: document.getElementById('isVendor').checked
   })
 }

 redirectsToVendorSignUp() {
   if (this.state.vendorAccount === true) {
     window.location.assign('/vendorSignUp')
   }
 }


 handlesFormSubmit(e) {
   e.preventDefault()
   let state={
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        vendorAccount: this.state.vendorAccount
      }
   let headers = new Headers();
   headers.set('Content-Type', 'application/json');
   let data = JSON.stringify(state)
   fetch('http://localhost:3000/consumers', {
     method: 'POST',
     headers: headers,
     body: data
   })
   this.redirectsToVendorSignUp()
 }

 render(){
   return (
     <form onChange={this.handlesChange} onSubmit={this.handlesFormSubmit}>
        <label>First Name:<input type='text' id='firstName' value={this.state.firstName}></input></label><br/>
        <label>Last Name:<input type='text' id='lastName' value={this.state.lastName}></input></label><br/>
        <label>Email:<input type='text' id='email' value={this.state.category}></input></label><br/>
        <label>Is This a Vendor Account?:<input type='checkbox' id='isVendor' onChange={this.handlesChange}></input></label><br/>
        <input type='submit' value='submit'></input>
      </form>
    )
  }
}

export default SignInUpForm

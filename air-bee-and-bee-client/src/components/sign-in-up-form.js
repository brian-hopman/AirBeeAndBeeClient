import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'



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
      vendorAccount: ''
  }
  this.handlesFormSubmit = this.handlesFormSubmit.bind(this)
  this.handleFormState = this.handleFormState.bind(this)
  this.redirectsToVendorSignUp = this.redirectsToVendorSignUp.bind(this)
 }



 redirectsToVendorSignUp() {
   if (this.state.vendorAccount === true) {
     this.props.history.push('/vendorSignup')
   }
 }


 handlesFormSubmit(e) {
   e.preventDefault()
   let headers = new Headers();
   headers.set('Content-Type', 'application/json');
   let data = JSON.stringify(this.state)
   fetch('http://localhost:3000/consumers', {
     method: 'POST',
     headers: headers,
     body: data
   })
   .then( resp => resp.json() )
   .then( data => {this.props.setConsumerId(data.consumerId)} )
   this.redirectsToVendorSignUp()
 }

 handleFormState() {
   this.setState({
     firstName: document.getElementById('firstName').value,
     lastName: document.getElementById('lastName').value,
     email: document.getElementById('email').value,
     vendorAccount: document.getElementById('isVendor').checked
   })
   console.log(this.state)
 }

 render(){
   return (
     <form onSubmit={this.handlesFormSubmit}>
        <label>First Name:<input type='text' id='firstName' onChange={this.handleFormState} ></input></label><br/>
        <label>Last Name:<input type='text' id='lastName' onChange={this.handleFormState} ></input></label><br/>
        <label>Email:<input type='text' id='email' onChange={this.handleFormState}></input></label><br/>
        <label>Is This a Vendor Account?:<input type='checkbox' id='isVendor' onChange={this.handleFormState}></input></label><br/>
        <input type='submit' value='submit'></input>
     </form>
    )
  }
}

export default withRouter(SignInUpForm)

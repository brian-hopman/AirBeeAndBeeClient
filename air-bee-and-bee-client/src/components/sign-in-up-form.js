import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Input, Form, Checkbox } from 'semantic-ui-react'



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
     vendorAccount: true
   })
   console.log(this.state)
 }

 render(){
   return (
     <div className="ui raised very padded text container segment">
       <Form onSubmit={this.handlesFormSubmit}>
        <Form.Field>
          <label>First Name:<input type='text' id='firstName' onChange={this.handleFormState} ></input></label><br/>
        </Form.Field>
          <label>Last Name:<input type='text' id='lastName' onChange={this.handleFormState} ></input></label><br/>
        <Form.Field>
          <label>Email:<input type='text' id='email' onChange={this.handleFormState}></input></label><br/>
        </Form.Field>
          <label>Is This a Vendor Account?:<Checkbox toggle id='isVendor' onChange={this.handleFormState}/></label><br/>
          <Input type='submit' value='submit'></Input>
       </Form>
      </div>
    )
  }
}

export default withRouter(SignInUpForm)

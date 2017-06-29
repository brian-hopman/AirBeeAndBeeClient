import React, { Component } from 'react'

class SignInUpForm extends Component {
  //consider what 'control component' really means



 //should contain own state
 //state onject will have all of input fields
 //onSubmit takes local state and makes the post request
 constructor(){
   super()
   this.state = {
     name: '',
     category: ''
   }
   this.handlesChange = this.handlesChange.bind(this)
   this.handlesFormSubmit = this.handlesFormSubmit.bind(this)
 }


 handlesChange(e) {
   this.setState({
     name: document.getElementById('name').value,
     category: document.getElementById('category').value
   })
 }

 handlesFormSubmit(e) {
   e.preventDefault()
   let state={username: this.state.name}
   let headers = new Headers();
   headers.set('Content-Type', 'application/json');
   let data = JSON.stringify(state)
   fetch('http://localhost:3000/consumers', {
     method: 'POST',
     headers: headers,
     body: data
   })
 }


 render(){
   return (
     <form onChange={this.handlesChange} onSubmit={this.handlesFormSubmit}>
        <label>Name:<input type='text' id='name' value={this.state.name}></input></label><br/>
        <label>Category:<input type='text' id='category' value={this.state.category}></input></label><br/>
        <input type='submit' value='submit'></input>
      </form>
    )
  }
}

export default SignInUpForm

import React, { Component } from 'react'


import SignInUpForm from '../components/sign-in-up-form'




class HomeContainer extends Component {
  constructor() {
    super()

    this.state= {
      name: ''
    }
  }




  componentDidMount() {
    fetch('http://localhost:3000/consumers', { method: 'GET',
                 headers: '',
                 mode: 'cors',
                 cache: 'default' }
          )
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }






  render() {
    return (
      <div>
      <h1>a</h1>
      <SignInUpForm />
      </div>
    )
  }
}



export default HomeContainer

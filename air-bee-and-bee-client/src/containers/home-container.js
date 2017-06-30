import React, { Component } from 'react'
import { Link } from 'react-router-dom'


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
      <Link to='vendorSignUp'>Sign Up</Link>
      <SignInUpForm />
      <Link to='ApiaryLister'>Our Apiaries</Link>
      </div>
    )
  }
}
export default HomeContainer

import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import SignInUpForm from '../components/sign-in-up-form'
import SearchBar from '../components/searchbar'

class HomeContainer extends Component {
  constructor() {
    super()

    this.state= {
      //search
      searchTerm: ''
    }
    this.handlesSearch=this.handlesSearch.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:3000/products', { method: 'GET',
                 headers: '',
                 mode: 'cors',
                 cache: 'default' }
          )
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }

  handlesSearch(event) {
    this.setState({
      searchTerm: event.target.value
    })

    fetch(`http://localhost:3000/consumers/show/${this.state.searchTerm}`, { method: 'GET',
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
      <SearchBar handlesSearch={this.handlesSearch}/>
      <h1>a</h1>
      <Link to='vendorSignUp'>Sign Up</Link>
      <SignInUpForm />
      <Link to='ApiaryLister'>Our Apiaries</Link>
      </div>
    )
  }
}
export default HomeContainer

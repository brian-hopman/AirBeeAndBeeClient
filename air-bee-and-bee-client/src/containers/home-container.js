import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import SignInUpForm from '../components/sign-in-up-form'
import SearchBar from '../components/searchbar'

class HomeContainer extends Component {
  constructor() {
    super()


  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/products', { method: 'GET',
  //                headers: '',
  //                mode: 'cors',
  //                cache: 'default' }
  //         )
  //   .then(resp => resp.json())
  //   .then(resp => console.log(resp))
  // }


  render() {
    return (
      <div>
      <SearchBar searchTerm={this.props.searchTerm} handlesSearch={this.props.handlesSearch}/>
      <h1>a</h1>
      <Link to='vendorSignUp'>Sign Up</Link>
      <SignInUpForm setConsumerId={this.props.setConsumerId} state={this.props.state} handlesFormSubmit={this.props.handlesFormSubmit} appState={this.props.appState}/>
      <Link to='ApiaryLister'>Our Apiaries</Link>
      </div>
    )
  }
}
export default HomeContainer

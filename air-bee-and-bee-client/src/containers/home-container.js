import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


import SignInUpForm from '../components/sign-in-up-form'
import SearchBar from '../components/searchbar'

class HomeContainer extends Component {
  constructor(props) {
    super(props)

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
            <SignInUpForm setConsumerId={this.props.setConsumerId} state={this.props.state} handlesFormSubmit={this.props.handlesFormSubmit} appState={this.props.appState}/>
      </div>
    )
  }
}
//<BrowserRouter???>
export default withRouter(HomeContainer)

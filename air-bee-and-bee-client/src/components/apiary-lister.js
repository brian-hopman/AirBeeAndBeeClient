import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Apiary from './individual-apiary'

class ApiaryLister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vendors: []
    }
  }

  componentDidMount() {
    this.getsVendors()
  }

  getsVendors() {
    fetch('http://localhost:3000/vendors/', {
      method: 'GET',
      headers: '',
      mode: 'cors',
      cache: 'default'
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      vendors: data}))
  }


  render() {
    return (
      <div>
      <p>heelo</p>
        <ul>
          {this.state.vendors.map((obj) => <li><Link to={`/Apiary/${obj.id}`} key={obj.id} onClick={this.props.handlesClick}>{obj.name}</Link></li>)}
        </ul>
      </div>
    )
  }
}

export default ApiaryLister

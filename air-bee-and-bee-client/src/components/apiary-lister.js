import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Image } from 'semantic-ui-react'

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
        <div className="ui list">
          {this.state.vendors.map((obj) =>
            <div className='item'><Image
              src='http://www.well-beingsecrets.com/wp-content/uploads/honey-caugh-supressant.jpg'
              as='a' size='medium'
              href='http://google.com'
              target='_blank'/>
            </div>)}
        </div>
      </div>
    )
  }
}

export default ApiaryLister

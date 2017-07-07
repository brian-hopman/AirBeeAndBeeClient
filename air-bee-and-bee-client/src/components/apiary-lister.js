import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { List, Image } from 'semantic-ui-react'

import Apiary from './individual-apiary'

class ApiaryLister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vendors: []
    }
    this.redirectsToApiary=this.redirectsToApiary.bind(this)
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

  redirectsToApiary(e, apiary) {
    this.props.history.push('/ThankYou')
  }


  render() {
    return (
      <div>
        <div className="ui list">
          {this.state.vendors.map((apiary) =>
            <div>
              <Image
                key={apiary.id}
                onClick={this.redirectsToApiary}
                src={apiary.apiary_image}
                as='a' size='medium'/>
              <Link to={`/apiary/${apiary.id}`}>{apiary.name}</Link>
            </div>
            )}
        </div>
      </div>
    )
  }
}

export default withRouter(ApiaryLister)

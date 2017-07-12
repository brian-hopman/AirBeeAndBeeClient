import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { List, Image } from 'semantic-ui-react'

import Apiary from './individual-apiary'

class ApiaryLister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vendors: [],
      mounted:true
    }
    this.redirectsToApiary=this.redirectsToApiary.bind(this)
  }

  componentDidMount() {
    this.getsVendors()
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel()
    //this.state.mounted = false
  }

  getsVendors() {
    var makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

    this.cancelablePromise = makeCancelable(
      fetch('http://localhost:3000/vendors/', {
        method: 'GET',
        headers: '',
        mode: 'cors',
        cache: 'default'
      })
    )


    this.cancelablePromise.promise
    .then(resp => resp.json())
    .then(data => {
      if (this.state.mounted == true) {
        this.setState({
          vendors: data})
      }
    })
    console.log(this)
  }

  redirectsToApiary(e, apiary) {

  }


  render() {
    return (
      <div>

        <div className="ui list">
          {this.state.vendors.map((apiary) =>
            <Link to={`/apiary/${apiary.id}`}>
            <div className="apiary-listing">
              <Image
                key={apiary.id}
                onClick={this.redirectsToApiary}
                src={apiary.apiary_image}
                as='a' size='medium'/>
                <div className='apiary-description-container'><h1 className='apiary-name'>{apiary.name}</h1>
                  <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
                </div>
            </div>

            </Link>
            )}

        </div>
      </div>
    )
  }
}

export default withRouter(ApiaryLister)

import React, { Component } from 'react'


class HomeContainer extends Component {
  constructor() {
    super()

    this.state= {

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
      <h1>a</h1>
    )
  }
}



export default HomeContainer

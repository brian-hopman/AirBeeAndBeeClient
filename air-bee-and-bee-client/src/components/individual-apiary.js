import React, { Component } from 'react'


class Apiary extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      id: '',
      productAry: []
    }
  }

  getsIndividulApiary() {
      let id = JSON.stringify(this.props.apiaryId)
      fetch(`http://localhost:3000/vendors/${this.props.apiaryId}`, {
                   method: 'GET',
                   headers: id,
                   mode: 'cors',
                   cache: 'default' }
            )
      .then(resp => resp.json())
      .then(resp => this.handlesState(resp))
  }

  getsProducts() {
    fetch(`http://localhost:3000/products/${this.props.apiaryId}`, {
                 method: 'GET',
                 headers: '',
                 mode: 'cors',
                 cache: 'default' }
          )
    .then(resp => resp.json())
    .then(resp => this.handlesProductState(resp))
  }

  componentDidMount() {
    this.getsIndividulApiary()
    this.getsProducts()
  }

  handlesState(resp) {
    this.setState({
      name: resp.name,
      id:resp.id
    })
    console.log(this.state)
  }

  handlesProductState(resp) {
    let content = [resp]
    debugger
    this.setState({
      productAry: content[0][0].title
    })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h1>{this.state.productAry}</h1>
      </div>
    )
  }
}

export default Apiary

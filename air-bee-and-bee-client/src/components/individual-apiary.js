import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import SearchBar from './searchbar'


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
  }

  handlesProductState(resp) {
    let content = [resp]
    this.setState({
      productAry: content[0][0].title
    })
  }

  render() {
    return (
      <div>
        <SearchBar />
        <h1>{this.state.name}</h1>
        <h1>{this.state.productAry}</h1>
        <h3>Add {this.state.productAry} to Cart:</h3>
        <h4 onClick={this.props.setCart}>{this.state.productAry}</h4>
        <Link to='/cart'>Checkout</Link>
      </div>
    )
  }
}

export default Apiary

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import SearchBar from './searchbar'


class Apiary extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      id: '',
      productAry: [],
      productName: '',
      productImage: "http://www.chicagointernalcleansing.com/wp-content/uploads/2014/10/honeyjar.jpg"
    }
  }

  getsIndividulApiary() {
      let id = JSON.stringify(this.props.apiaryId)
      fetch(`http://localhost:3000/vendors/${window.location.href.split('/')[4]}`, {
                   method: 'GET',
                   headers: id,
                   mode: 'cors',
                   cache: 'default' }
            )
      .then(resp => resp.json())
      .then(resp => this.handlesState(resp))
  }

  getsProducts() {
    fetch(`http://localhost:3000/products/${window.location.href.split('/')[4]}`, {
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
      id: resp.id
    })
  }

  handlesProductState(resp) {


    let content = [resp]
    this.setState({
      productName: content[0][0].title,
      productImage: content[0][0].product_image
    })
  }

  render() {
    return (
      <div>
        <SearchBar />
        <h1>{this.state.name}</h1>
        <h1>{this.state.productName}</h1>
        <img alt='' src={this.state.productImage}></img>
        <h3>Add {this.state.productAry} to Cart:</h3>
        <h4 onClick={this.props.setCart}>{this.state.productName}</h4>
        <Link to='/cart'>Checkout</Link>
      </div>
    )
  }
}

export default Apiary

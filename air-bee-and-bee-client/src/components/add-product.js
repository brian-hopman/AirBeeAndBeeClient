import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class AddProduct extends Component {
  constructor(props) {
    super(props)


    this.state = {
      productTitle: '',
      productImage: '',
      productTag: '',
      productTag2: '',
      productTag3: '',
      price: ''
    }

    this.handlesProductFormSubmit=this.handlesProductFormSubmit.bind(this)
    this.handlesChange=this.handlesChange.bind(this)
    this.getCookie=this.getCookie.bind(this)
  }

  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  handlesProductFormSubmit(e) {
    e.preventDefault()
//needs to be tested
  let state={
       consumer_id: this.getCookie('consumerId'),
       vendor_id: this.getCookie('vendorId'),
       tag :this.state.productTag,
       tag2 :this.state.productTag2,
       tag3 :this.state.productTag3,
       title: this.state.productTitle,
       price: this.state.price,
       product_image: this.state.productImage
      }

    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let data = JSON.stringify(state)
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: headers,
      body: data
    })
    .then(res => res.json())
    .then(res => this.props.setProductId(res.productId))
  }


  handlesChange(e) {
    this.setState({
      productTitle: document.getElementById('productTitle').value,
      productImage: document.getElementById('productImage').value,
      productTag: document.getElementById('productTag').value,
      productTag2: document.getElementById('productTag2').value,
      productTag3: document.getElementById('productTag3').value,
      price: document.getElementById('price').value
    })
  }



  render() {
    return (
        <div className="ui raised very padded text container segment">

              <form onSubmit={this.handlesProductFormSubmit} onChange={this.handlesChange}>
                <label>Products:<input type='text' id='productTitle' value={this.state.productTitle}></input></label><br/>
                <br></br>
                <label>Product Image:<input type='text' id='productImage' value={this.state.productImage}></input></label><br/>
                <br></br>
                <label>Retail Price:<input type='text' id='price' value={this.state.price}></input></label><br/>
                <br></br>
                <label>Product Tag:<input type='text' id='productTag' value={this.state.productTag}></input></label><br/>
                <br></br>
                <label>Product Tag:<input type='text' id='productTag2' value={this.state.productTag2}></input></label><br/>
                <br></br>
                <label>Product Tag:<input type='text' id='productTag3' value={this.state.productTag3}></input></label><br/>

                <Button primary type='submit'>Submit</Button>
              </form>
      
        </div>
      )
  }
}

export default withRouter(AddProduct)

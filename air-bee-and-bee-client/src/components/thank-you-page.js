import React from 'react'


const ThankYou = (props) => {
  debugger
  return (

    <div className="thank-you-page">

      <h2>Thank You</h2>
      <br></br>
      <h2>Your purchase will be shipped to:</h2>

      <h4>{props.shippingInfo.name}</h4>

      <h4>{props.shippingInfo.shipping}</h4>

      <h4>{props.shippingInfo.city}</h4>

      <h4>{props.shippingInfo.state}</h4>
  
      <h4>{props.shippingInfo.zip}</h4>
    </div>
  )
}

export default ThankYou

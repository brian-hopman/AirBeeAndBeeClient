import React from 'react'
import { Link } from 'react-router-dom'

const SearchBar = (props) => {
  return (
    <div>
      <Link to='/cart'>Cart</Link>
      <Link to='/ApiaryLister'>Our Apiaries</Link>
      <input type='text' value={props.searchTerm} onChange={props.handlesSearch}></input>
    </div>
  )
}

export default SearchBar

import React from 'react'

const SearchBar = (props) => {
  return (
    <input type='text' onChange={props.handlesSearch}></input>
  )
}

export default SearchBar

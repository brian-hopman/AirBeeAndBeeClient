import React from 'react'

const SearchBar = (props) => {
  return (
    <input type='text' value={props.searchTerm} onChange={props.handlesSearch}></input>
  )
}

export default SearchBar

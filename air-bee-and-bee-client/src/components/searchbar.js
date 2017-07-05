import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Grid, Header } from 'semantic-ui-react'

const SearchBar = (props) => {
  return (
    <div>
    <Grid>
      <Grid.Column width={8}>
        <Search value={props.searchTerm} onChange={props.handlesSearch}   />
      </Grid.Column>
    </Grid>
      <Link to='/cart'>Cart</Link>
      <Link to='/ApiaryLister'>Our Apiaries</Link>
    </div>
  )
}

export default SearchBar

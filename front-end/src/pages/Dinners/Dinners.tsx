import React from 'react';
import SearchBar from './SearchBar'
import DinnerList from './DinnerList'
import { Container } from '@material-ui/core';


export default function DinnerPage() {
  return (
    <Container maxWidth="sm">
      <SearchBar />
      <DinnerList />
    </Container>
  )
}


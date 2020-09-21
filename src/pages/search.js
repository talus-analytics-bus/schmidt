import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'

const Search = ({ setPage }) => {
  // EFFECT HOOKS
  // on initial page load, set current page
  // useEffect(() => console.log('search'), [])

  // JSX
  return (
    <Layout page={'search'}>
      <SEO title="Search results" />
      <h1 style={{ textAlign: 'center' }}>Search results</h1>
    </Layout>
  )
}

export default Search

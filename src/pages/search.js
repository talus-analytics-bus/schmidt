// 3rd party components
import React, { useState, useEffect } from 'react'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import Results from '../components/Search/Results/Results'
import Options from '../components/Search/Options/Options'

// styles and assets
import styles from '../components/Search/search.module.scss'

const Search = ({ setPage }) => {
  // STATE
  // order by parameters
  const [orderBy, setOrderBy] = useState('date')
  const [isDesc, setIsDesc] = useState(true)

  // search bar text
  const [searchText, setSearchText] = useState('')

  // EFFECT HOOKS
  // on initial page load, set current page
  // useEffect(() => console.log('search'), [])

  // JSX
  return (
    <Layout page={'search'}>
      <SEO title="Search results" />
      <div className={styles.search}>
        <Options
          {...{
            orderBy,
            setOrderBy,
            isDesc,
            setIsDesc,
            searchText,
            setSearchText,
          }}
        />
        <Results {...{ searchText, setSearchText }} />
      </div>
    </Layout>
  )
}

export default Search

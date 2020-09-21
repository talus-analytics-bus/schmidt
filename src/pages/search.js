// 3rd party components
import React, { useState, useEffect } from 'react'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import Results from '../components/Search/Results/Results'
import Options from '../components/Search/Options/Options'

// local utility functions
import SearchQuery from '../components/misc/SearchQuery'

// styles and assets
import styles from '../components/Search/search.module.scss'

const Search = ({ setPage }) => {
  // STATE
  // card data from API response to search query
  const [searchData, setSearchData] = useState(null)

  // order by parameters
  const [orderBy, setOrderBy] = useState('date')
  const [isDesc, setIsDesc] = useState(true)

  // current page and pagesize of paginator
  const [curPage, setCurPage] = useState(1)
  const [pagesize, setPagesize] = useState(5)

  // search bar text
  const [searchText, setSearchText] = useState('')

  // CONSTANTS
  const resultsHaveLoaded = searchData !== null

  // FUNCTIONS
  // get result of search query whenever filters or search text are updated
  const getData = async () => {
    const results = await SearchQuery({
      page: curPage,
      pagesize,
      search_text: searchText,
      filters: {}, // TODO filters
      order_by: orderBy,
      is_desc: isDesc,
      explain_results: false,
      // explain_results: true,
    })
    console.log(results)
    setSearchData(results.data)
  }

  // EFFECT HOOKS
  // when filters or search text change, get updated search data
  useEffect(() => {
    getData()
  }, [searchText, pagesize, curPage, orderBy])

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
        {true && (
          <Results
            {...{
              searchText,
              setSearchText,
              curPage,
              setCurPage,
              pagesize,
              setPagesize,
              searchData,
            }}
          />
        )}
      </div>
    </Layout>
  )
}

export default Search

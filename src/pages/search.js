// 3rd party components
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import Results from '../components/Search/Results/Results'
import Options from '../components/Search/Options/Options'

// local utility functions
import SearchQuery from '../components/misc/SearchQuery'
import { execute } from '../components/misc/Util'

// styles and assets
import styles from '../components/Search/search.module.scss'

// constants
const API_URL = process.env.GATSBY_API_URL

const Search = ({ setPage }) => {
  // STATE
  // card and filter counts data from API response to search query
  const [searchData, setSearchData] = useState(null)
  const [baselineFilterCounts, setBaselineFilterCounts] = useState(null)

  // order by parameters
  const [orderBy, setOrderBy] = useState('date')
  const [isDesc, setIsDesc] = useState(true)

  // current page and pagesize of paginator
  const [curPage, setCurPage] = useState(1)
  const [pagesize, setPagesize] = useState(5)

  // search bar text and filters
  const [searchText, setSearchText] = useState('')
  const [filters, setFilters] = useState({})
  const [fromYear, setFromYear] = useState('null')
  const [toYear, setToYear] = useState('null')

  // CONSTANTS
  const resultsHaveLoaded = searchData !== null

  // FUNCTIONS
  // get result of search query whenever filters or search text are updated
  const getData = async () => {
    const queries = {}
    queries.searchQuery = SearchQuery({
      page: curPage,
      pagesize,
      search_text: searchText,
      filters,
      fromYear,
      toYear,
      order_by: orderBy,
      is_desc: isDesc,
      is_desc: isDesc,
      explain_results: true,
    })
    queries.filterCountsQuery = axios.get(`${API_URL}/get/filter_counts`)

    const results = await execute({ queries })
    setSearchData(results.searchQuery.data)
    setBaselineFilterCounts(results.filterCountsQuery.data.data)
  }

  // EFFECT HOOKS
  // when xxx
  useEffect(() => {
    if (curPage !== 1) {
      setCurPage(1)
    } else getData()
  }, [searchText, pagesize, orderBy, isDesc, filters])

  // when filters or search text change, get updated search data
  useEffect(() => {
    getData()
  }, [curPage])

  // JSX
  return (
    <Layout page={'search'}>
      <SEO title="Search results" />
      <div className={styles.search}>
        <Options
          {...{
            showFilterSections:
              searchData !== null && baselineFilterCounts !== null,
            filterCounts: searchData !== null ? searchData.filter_counts : {},
            baselineFilterCounts,
            orderBy,
            setOrderBy,
            isDesc,
            setIsDesc,
            searchText,
            setSearchText,
            filters,
            setFilters,
            fromYear,
            setFromYear,
            toYear,
            setToYear,
          }}
        />
        <Results
          {...{
            searchData,
            searchText,
            setSearchText,
            curPage,
            setCurPage,
            pagesize,
            setPagesize,
            searchData,
          }}
        />
      </div>
    </Layout>
  )
}

export default Search

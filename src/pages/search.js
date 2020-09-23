// 3rd party components
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import Results from '../components/Search/Results/Results'
import Options from '../components/Search/Options/Options'
import { StickyHeader } from '../components/common'

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
  const [initialized, setInitialized] = useState(false)

  // get URL params to parse for filters, search text, pagination settings,
  // and sorting settings
  const urlParams = new URLSearchParams(window.location.search)

  // order by parameters
  const [orderBy, setOrderBy] = useState(urlParams.get('order_by') || 'date')
  const isDescStr = urlParams.get('is_desc') || 'true'
  const [isDesc, setIsDesc] = useState(isDescStr === 'true')

  // search bar text and filters
  /**
   * Get filters stored in URL, if any, as JSON
   * @method getFiltersFromUrlParams
   * @param  {[type]}                urlParams [description]
   * @return {[type]}                          [description]
   */
  const getFiltersFromUrlParams = urlParams => {
    // If filters are specific in the url params, and they are for the current
    // entity class, use them. Otherwise, clear them
    const urlFilterParams = urlParams.get('filters')
    const useUrlFilters = urlFilterParams !== null
    const newFilters = useUrlFilters ? JSON.parse(urlFilterParams) : {}
    return newFilters
  }

  // define init filters
  const initFilters = getFiltersFromUrlParams(urlParams)
  const [filters, setFilters] = useState(initFilters)

  // define init search text
  const initSearchText = urlParams.get('search_text') || ''
  const [searchText, setSearchText] = useState(initSearchText)

  // define init years
  const [fromYear, setFromYear] = useState(urlParams.get('from') || 'null')
  const [toYear, setToYear] = useState(urlParams.get('to') || 'null')

  // current page and pagesize of paginator
  const pageStr = urlParams.get('page') || '1'
  // const [curPage, setCurPage] = useState(1)
  const [curPage, setCurPage] = useState(+pageStr)
  const [pagesize, setPagesize] = useState(urlParams.get('pagesize') || 5)

  // simple header/footer reference
  const [simpleHeaderRef, setSimpleHeaderRef] = useState({ current: null })
  const [showScrollToTop, setShowScrollToTop] = useState(false)

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

    // update URL params to contain relevant options
    // TODO
  }

  // EFFECT HOOKS
  // when xxx
  useEffect(() => {
    if (initialized) {
      if (curPage !== 1) {
        setCurPage(1)
      } else {
        getData()
      }
    }
  }, [searchText, pagesize, orderBy, isDesc, filters])

  // when filters or search text change, get updated search data
  useEffect(() => {
    getData()
    if (!initialized) setInitialized(true)
  }, [curPage])

  // set scroll event to show "scroll to top" as appropriate
  useEffect(() => {
    const displayThresh = 20
    if (simpleHeaderRef.current !== null) {
      window.addEventListener('scroll', () => {
        setShowScrollToTop(window.scrollY > displayThresh)
      })
    }
  }, [simpleHeaderRef])

  // JSX
  return (
    <Layout page={'search'}>
      <SEO title="Search results" />
      <div className={styles.search}>
        <StickyHeader
          {...{
            show: showScrollToTop,
            name: 'Name',
            setSimpleHeaderRef,
            img: null,
          }}
        />
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

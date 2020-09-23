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
  const [popstateTriggeredUpdate, setPopstateTriggeredUpdate] = useState(false)
  const [checkingPopState, setCheckingPopState] = useState(false)

  // get URL params to parse for filters, search text, pagination settings,
  // and sorting settings
  let urlParams
  if (window !== undefined) {
    urlParams = new URLSearchParams(window.location.search)
  }

  // order by parameters
  // const [orderBy, setOrderBy] = useState('date')
  // const [isDesc, setIsDesc] = useState(true)
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
  // const [filters, setFilters] = useState({})
  const initFilters = getFiltersFromUrlParams(urlParams)
  const [filters, setFilters] = useState(!initialized ? initFilters : {})

  // define init search text
  // const [searchText, setSearchText] = useState('')
  const initSearchText = urlParams.get('search_text') || ''
  const [searchText, setSearchText] = useState(
    !initialized ? initSearchText : ''
  )

  // define init years
  // const [fromYear, setFromYear] = useState('null')
  // const [toYear, setToYear] = useState('null')
  const [fromYear, setFromYear] = useState(
    !initialized ? urlParams.get('from') || 'null' : 'null'
  )
  const [toYear, setToYear] = useState(
    !initialized ? urlParams.get('to') || 'null' : 'null'
  )

  // current page and pagesize of paginator
  // const [curPage, setCurPage] = useState(1)
  // const [pagesize, setPagesize] = useState(5)
  const pageStr = !initialized ? urlParams.get('page') || '1' : '1'
  const [curPage, setCurPage] = useState(+pageStr)

  const [pagesize, setPagesize] = useState(
    !initialized ? urlParams.get('pagesize') || 5 : 5
  )

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

    // update URL params to contain relevant options, unless this update was
    // triggered by a state pop in history
    if (!popstateTriggeredUpdate) {
      const newUrlParams = new URLSearchParams()
      newUrlParams.set('filters', JSON.stringify(filters))
      newUrlParams.set('page', curPage)
      newUrlParams.set('pagesize', pagesize)
      newUrlParams.set('search_text', searchText)
      newUrlParams.set('order_by', orderBy)
      newUrlParams.set('is_desc', isDesc)
      const newUrl =
        newUrlParams.toString() !== '' ? `/search?${newUrlParams}` : '/search'
      const newState = {
        filters,
        curPage,
        pagesize,
        orderBy,
        isDesc,
        searchText,
      } // TODO check
      if (window !== undefined) {
        window.history.pushState(newState, '', newUrl)
      }
    } else {
      setPopstateTriggeredUpdate(false)
    }
  }

  // EFFECT HOOKS
  // when update triggered by popstate, use those vars only
  useEffect(() => {
    if (initialized) {
      if (popstateTriggeredUpdate) {
        getData()
      }
    }
  }, [popstateTriggeredUpdate])

  // when xxx
  useEffect(() => {
    if (initialized) {
      if (!popstateTriggeredUpdate && !checkingPopState) {
        if (curPage !== 1) {
          setCurPage(1)
        } else {
          getData()
        }
      }
    }
  }, [searchText, pagesize, orderBy, isDesc, filters])

  // when filters or search text change, get updated search data
  useEffect(() => {
    if (!popstateTriggeredUpdate && !checkingPopState) {
      getData()
      if (!initialized) {
        // set page to initialized so data retrieval from filters, etc. happens
        setInitialized(true)

        // add event to process URL params when a history state is popped
        if (window !== undefined) {
          window.onpopstate = function (e) {
            setCheckingPopState(true)
            const state = e.state
            if (state !== undefined && state !== null) {
              const toCheck = [
                ['curPage', setCurPage, curPage],
                ['filters', setFilters, filters],
                ['pagesize', setPagesize, pagesize],
                ['orderBy', setOrderBy, orderBy],
                ['isDesc', setIsDesc, isDesc],
                [
                  'searchText',
                  setSearchText,
                  searchText,
                  () => setSearchText(''),
                ],
              ]
              // update all state variables and then trigger a data fetch
              toCheck.forEach(([key, updateFunc, curVal, fallbackFunc]) => {
                if (state[key] !== undefined) {
                  updateFunc(state[key])
                } else {
                  if (fallbackFunc) fallbackFunc()
                }
              })
              setPopstateTriggeredUpdate(true)
              setCheckingPopState(false)
            }
          }
        }
      }
    }
  }, [curPage])

  // set scroll event to show "scroll to top" as appropriate
  useEffect(() => {
    const displayThresh = 20
    if (simpleHeaderRef.current !== null) {
      if (window !== undefined)
        window.addEventListener('scroll', () => {
          if (window !== undefined)
            setShowScrollToTop(window.scrollY > displayThresh)
        })
    }
  }, [simpleHeaderRef])

  // JSX
  return (
    <>
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
      <LoadingSpinner loading={!initialized} />
    </>
  )
}

export default Search

// 3rd party components
import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip'
import axios from 'axios'
import { navigate } from 'gatsby'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import DetailOverlay from '../components/Detail/DetailOverlay'
import Results from '../components/Search/Results/Results'
import Options from '../components/Search/Options/Options'
import { StickyHeader, LoadingSpinner } from '../components/common'
import { appContext } from '../components/misc/ContextProvider'
import MobileDisclaimer from '../components/MobileDisclaimer/MobileDisclaimer'

// local utility functions
import SearchQuery from '../components/misc/SearchQuery'
import {
  execute,
  withBookmarkedIds,
  defaultContext,
} from '../components/misc/Util'

// styles and assets
import styles from '../components/Search/search.module.scss'

// constants
const API_URL = process.env.GATSBY_API_URL

const Search = ({ setPage }) => {
  // CONTEXT
  const context = useContext(appContext) || defaultContext

  // STATE
  // card and filter counts data from API response to search query
  const [searchData, setSearchData] = useState(null)
  const [baselineFilterCounts, setBaselineFilterCounts] = useState(null)
  const [popstateTriggeredUpdate, setPopstateTriggeredUpdate] = useState(false)
  const [freezeDataUpdates, setFreezeDataUpdates] = useState(false)

  //filters modal on mobile
  const [optionsVisible, setOptionsVisible] = useState(false)

  // bookmarked items
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

  // has first data load for page occurred?
  const [initialized, setInitialized] = useState(false)

  // is page currently fetching search data?
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchingText, setIsSearchingText] = useState(false)

  // callback for pressing enter key on search
  const [onEnter, setOnEnter] = useState()

  // get URL params to parse for filters, search text, pagination settings,
  // and sorting settings
  let urlParams
  if (typeof window !== 'undefined') {
    urlParams = new URLSearchParams(window.location.search)
  } else {
    urlParams = new URLSearchParams()
  }

  // order by parameters
  const [orderBy, setOrderBy] = useState(urlParams.get('order_by') || 'date')
  const isDescStr = urlParams.get('is_desc') || 'true'
  const [isDesc, setIsDesc] = useState(isDescStr === 'true')

  // showing detail overlay?
  const [showOverlay, setShowOverlay] = useState(
    urlParams.get('show_overlay') || false
  )

  const [keepScroll, setKeepScroll] = useState(false)

  // track original Y scroll position when overlay was launched so it can be
  // set back when it is closed
  const [origScrollY, setOrigScrollY] = useState(0)

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
  const [filters, setFilters] = useState(!initialized ? initFilters : {})

  // define init search text
  const initSearchText = urlParams.get('search_text') || ''
  const [searchText, setSearchText] = useState(
    !initialized ? initSearchText : ''
  )

  // define init years
  const [fromYear, setFromYear] = useState(
    !initialized ? urlParams.get('from') || 'null' : 'null'
  )
  const [toYear, setToYear] = useState(
    !initialized ? urlParams.get('to') || 'null' : 'null'
  )

  // current page and pagesize of paginator
  const pageStr = !initialized ? urlParams.get('page') || '1' : '1'
  const [curPage, setCurPage] = useState(+pageStr)

  const [pagesize, setPagesize] = useState(
    !initialized ? urlParams.get('pagesize') || 10 : 10
  )

  // simple header/footer reference
  const [simpleHeaderRef, setSimpleHeaderRef] = useState({ current: null })
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // CONSTANTS
  const resultsHaveLoaded = searchData !== null

  // fire when view details buttons are pressed to display the detail overlay
  const onViewDetails = ({ newId, related = false }) => {
    if (typeof window !== undefined && !related) {
      // set scroll Y value
      setOrigScrollY(window.scrollY)
    }
    // set show overlay value
    setShowOverlay(newId)
  }

  // FUNCTIONS
  // update state object, URL, and history entry when key params change
  const updateHistory = ({}) => {
    const newUrlParams = new URLSearchParams()
    newUrlParams.set('filters', JSON.stringify(filters))
    newUrlParams.set('page', curPage)
    newUrlParams.set('pagesize', pagesize)
    newUrlParams.set('search_text', searchText)
    newUrlParams.set('show_overlay', showOverlay)
    newUrlParams.set('order_by', orderBy)
    newUrlParams.set('is_desc', isDesc)
    const newUrl =
      newUrlParams.toString() !== '' ? `/search/?${newUrlParams}` : '/search/'
    const newState = {
      filters,
      curPage,
      pagesize,
      orderBy,
      isDesc,
      searchText,
      showOverlay: showOverlay.toString(),
    }
    if (typeof window !== 'undefined') {
      if (initialized && !popstateTriggeredUpdate) {
        navigate(newUrl, {
          state: {
            ...newState,
            scrollY: keepScroll ? window.scrollY : undefined,
          },
        })
        setKeepScroll(false)
      }
    }
  }

  // get result of search query whenever filters or search text are updated
  const getData = async () => {
    // if the page has already initialized, then a search is being done
    setIsSearching(true)

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
      explain_results: true,
    })

    // get filter counts if not yet retrieved
    const getFilterCounts = true
    if (getFilterCounts) {
      let urlParams = ''
      if (
        searchText !== null &&
        searchText !== undefined &&
        searchText.trim() !== ''
      ) {
        urlParams = '?search_text=' + searchText
      }
      queries.filterCountsQuery = axios.get(
        `${API_URL}/get/filter_counts${urlParams}`
      )
    }
    const results = await execute({ queries })
    setSearchData(results.searchQuery.data)
    if (getFilterCounts) {
      const filterCounts = results.filterCountsQuery.data.data
      setBaselineFilterCounts(filterCounts)
      context.setData({ ...context.data, filterCounts })
    } else {
      setBaselineFilterCounts(context.data.filterCounts)
    }

    // update URL params to contain relevant options, unless this update was
    // triggered by a state pop in history
    if (!popstateTriggeredUpdate && initialized) {
      updateHistory({})
    } else {
      setPopstateTriggeredUpdate(false)
    }

    // set page to initialized so data retrieval from filters, etc. happens
    if (!initialized) setInitialized(true)
    setIsSearching(false)
    setIsSearchingText(false)
  }

  // DEBUG
  const updateDataHistory = () => {
    // // if the page has already initialized, then a search is being done
    // setIsSearching(true)
    //
    // setSearchData(searchData)

    // update URL params to contain relevant options, unless this update was
    // triggered by a state pop in history
    if (!popstateTriggeredUpdate && initialized) {
      updateHistory({})
    } else {
      setPopstateTriggeredUpdate(false)
    }

    // // // set page to initialized so data retrieval from filters, etc. happens
    // // if (!initialized) setInitialized(true)
    // setIsSearching(false)
    // setIsSearchingText(false)
  }

  // EFFECT HOOKS
  // get bookmarked ids initially
  useEffect(() => {
    if (bookmarkedIds === null)
      withBookmarkedIds({ callback: setBookmarkedIds })
  }, [bookmarkedIds])

  // when overlay is changed, store new state
  useEffect(() => {
    if (initialized) {
      if (!popstateTriggeredUpdate && !freezeDataUpdates) {
        updateDataHistory()
      }
    }
    // if (!popstateTriggeredUpdate && initialized) {
    //   updateHistory({})
    // }
    // setIsSearching(showOverlay !== false)
  }, [showOverlay])

  // when update triggered by popstate, use those vars only
  useEffect(() => {
    if (initialized) {
      if (popstateTriggeredUpdate) {
        getData()
      }
    }
  }, [popstateTriggeredUpdate])

  // when key search params are changed, update the data
  useEffect(() => {
    if (initialized) {
      if (!popstateTriggeredUpdate && !freezeDataUpdates) {
        if (curPage !== 1) {
          setCurPage(1)
        } else {
          getData()
        }
      }
    }
    // rebuild tooltips when things change
    ReactTooltip.hide()
    ReactTooltip.rebuild()
  }, [searchText, pagesize, orderBy, isDesc, filters])

  // when filters or search text change, get updated search data
  useEffect(() => {
    if (!popstateTriggeredUpdate && !freezeDataUpdates) {
      getData()
      if (!initialized) {
        // add event to process URL params when a history state is popped
        if (typeof window !== 'undefined') {
          window.onpopstate = function (e) {
            setFreezeDataUpdates(true)
            const state = e.state

            // track whether any params were updated that should trigger
            // the API request for new data
            if (state !== undefined && state !== null) {
              const toCheck = [
                ['showOverlay', setShowOverlay, showOverlay],
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
                  const newVal = state[key]
                  updateFunc(newVal)
                } else {
                  if (fallbackFunc) fallbackFunc()
                }
              })
              setPopstateTriggeredUpdate(true)
              setFreezeDataUpdates(false)
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
      if (typeof window !== 'undefined')
        window.addEventListener('scroll', () => {
          if (typeof window !== 'undefined')
            setShowScrollToTop(window.scrollY > displayThresh)
        })
    }
  }, [simpleHeaderRef])

  // set initialized to false on unmount
  useEffect(() => {
    return () => {
      setInitialized(false)
    }
  }, [])

  // count bookmarks to show in nav
  const bookmarkArr =
    bookmarkedIds !== null ? bookmarkedIds.filter(d => d !== '') : []

  // JSX
  return (
    <>
      <Layout
        page={'search'}
        loading={isSearching && !isSearchingText && initialized}
        bookmarkCount={bookmarkArr.length}
      >
        <SEO title="Search results" />
        <div className={styles.search}>
          {showOverlay !== false && showOverlay !== 'false' && (
            <DetailOverlay
              {...{
                title: 'Test',
                id: showOverlay,
                close: () => {
                  setKeepScroll(true)
                  setShowOverlay(false)
                },
                filters,
                floating: true,
                setFilters,
                setSearchText,
                origScrollY,
                onViewDetails,
                origScrollY,
                onLoaded: () => setIsSearching(false),
                bookmarkedIds,
                setBookmarkedIds,
                simpleHeaderRef,
                bookmark: false,
              }}
            />
          )}
          {optionsVisible && (
            <Options
              {...{
                showFilterSections:
                  searchData !== null && baselineFilterCounts !== null,
                filterCounts:
                  searchData !== null ? searchData.filter_counts : {},
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
                mobile: true,
                setOptionsVisible,
                searchData,
                setShowOverlay,
              }}
            />
          )}
          <StickyHeader
            {...{
              show: showScrollToTop,
              name: 'Name',
              setSimpleHeaderRef,
              img: null,
            }}
          />
          <div className={styles.sections}>
            <Options
              {...{
                showFilterSections:
                  searchData !== null && baselineFilterCounts !== null,
                filterCounts:
                  searchData !== null ? searchData.filter_counts : {},
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
                mobile: false,
                setOptionsVisible,
                isSearchingText,
                setIsSearchingText,
                setFreezeDataUpdates,
                searchData,
                setShowOverlay,
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
                filters,
                setFilters,
                onViewDetails,
                setShowOverlay,
                setFreezeDataUpdates,
                orderBy,
                setOrderBy,
                isDesc,
                setIsDesc,
                bookmarkedIds,
                setBookmarkedIds,
                setOptionsVisible,
                loading: (isSearching && initialized) || isSearchingText,
                fromYear,
                toYear,
                setOnEnter,
              }}
            />
          </div>
        </div>
        <MobileDisclaimer />
        <ReactTooltip
          id={'searchHighlightInfo'}
          type="light"
          effect="float"
          delayHide={0}
          delayShow={500}
          scrollHide={true}
          getContent={content => content}
        />
      </Layout>
      <LoadingSpinner loading={!initialized} />
    </>
  )
}

export default Search

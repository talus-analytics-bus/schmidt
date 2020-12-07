// 3rd party components
import React, { useState, useEffect, useContext, useRef } from 'react'
import ReactTooltip from 'react-tooltip'
import axios from 'axios'
import { navigate } from 'gatsby'
import classNames from 'classnames'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import DetailOverlay from '../components/Detail/DetailOverlay'
import Results from '../components/Search/Results/Results'
import Options from '../components/Search/Options/Options'
import MobileDisclaimer from '../components/MobileDisclaimer/MobileDisclaimer'
import {
  StickyHeader,
  LoadingSpinner,
  Selectpicker,
  InfoTooltip,
} from '../components/common'
import { appContext } from '../components/misc/ContextProvider'

// local utility functions
import SearchQuery from '../components/misc/SearchQuery'
import {
  execute,
  withBookmarkedIds,
  defaultContext,
  filterDefs,
  getIconByName,
  iconNamesByField,
} from '../components/misc/Util'

// styles and assets
import styles from '../components/Browse/browse.module.scss'
import info from '../assets/icons/info.svg'

// constants
const API_URL = process.env.GATSBY_API_URL

// definitions for tooltips
const tooltipDefs = {
  key_topics: 'Key topics addressed in the work',
  authors: 'Organization that published the work or led the effort',
  author_types: 'Type of organization responsible for publishing the work',
  funders:
    'Organization or entity that provided funding for the research effort or publication',
  years: 'Year the publication was published',
  events: 'Specific event to which the document directly relates',
}

const Browse = ({ setPage }) => {
  // CONTEXT
  const context = useContext(appContext) || defaultContext

  // STATE
  // card and filter counts data from API response to search query
  const [searchData, setSearchData] = useState(null)
  const [baselineFilterCounts, setBaselineFilterCounts] = useState(null)
  const [popstateTriggeredUpdate, setPopstateTriggeredUpdate] = useState(false)
  const [freezeDataUpdates, setFreezeDataUpdates] = useState(false)

  // section currently being browsed
  const [browseSection, setBrowseSection] = useState('key_topics')
  const [browseList, setBrowseList] = useState({ unique: 0, by_value: [] })

  // search text for filters
  const [filterSearchText, setFilterSearchText] = useState('')

  //filters modal on mobile
  const [optionsVisible, setOptionsVisible] = useState(false)

  // bookmarked items
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

  // has first data load for page occurred?
  const [initialized, setInitialized] = useState(false)

  // is page currently fetching search data?
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchingText, setIsSearchingText] = useState(false)

  // ref to currently open drawer
  const clickedRef = useRef(null)

  // get URL params to parse for filters, search text, pagination settings,
  // and sorting settings
  let urlParams
  if (typeof window !== 'undefined') {
    urlParams = new URLSearchParams(window.location.search)
  } else {
    urlParams = new URLSearchParams()
  }

  // browse item clicked on
  const [clickedItem, setClickedItem] = useState(
    urlParams.get('clicked') || null
  )

  // order by parameters
  const [orderBy, setOrderBy] = useState(urlParams.get('order_by') || 'date')
  const isDescStr = urlParams.get('is_desc') || 'true'
  const [isDesc, setIsDesc] = useState(false)
  const [listDesc, setListDesc] = useState(urlParams.get('list_desc') || 'true')
  const [sortBy, setSortBy] = useState('results')
  // showing detail overlay?
  const [showOverlay, setShowOverlay] = useState(
    urlParams.get('show_overlay') || false
  )

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
    !initialized ? urlParams.get('pagesize') || 5 : 5
  )

  // simple header/footer reference
  const [simpleHeaderRef, setSimpleHeaderRef] = useState({ current: null })
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // CONSTANTS
  // sorting, case insensitive
  const caseInsensitiveSort = (a, b) => {
    a = a[0].toString().toLowerCase()
    b = b[0].toString().toLowerCase()
    let result
    if (a > b) result = 1
    if (a === b) result = 0
    if (a < b) result = -1
    return result
  }

  // sorting, by number of results
  const resultsSort = (a, b) => {
    const idx = browseSection === 'authors' ? 2 : 1
    a = a[idx]
    b = b[idx]
    let result
    if (a > b) result = 1
    if (a === b) result = 0
    if (a < b) result = -1
    return result
  }

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

  // FORMAT LIST OF RESULTS TO DISPLAY
  let rawList = browseList.by_value

  // sort list
  let listToDisplay
  if (sortBy === 'name') {
    listToDisplay =
      listDesc === 'true'
        ? rawList.sort(caseInsensitiveSort).reverse()
        : rawList.sort(caseInsensitiveSort)
  } else if (sortBy === 'results') {
    listToDisplay =
      listDesc === 'true'
        ? rawList.sort(resultsSort).reverse()
        : rawList.sort(resultsSort)
  }
  // filter with search term if applicable
  const filteredList = listToDisplay.filter(item =>
    item[0].toString().toLowerCase().includes(filterSearchText.toLowerCase())
  )
  let numDocuments = 0
  filteredList.forEach(item => {
    if (item[1] !== undefined) {
      numDocuments = numDocuments + item[1]
    }
  })

  // text to display above list
  const resultText = filterDefs[browseSection].resultLabel

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
    newUrlParams.set('clicked', clickedItem)
    newUrlParams.set('list_desc', listDesc)
    const newUrl =
      newUrlParams.toString() !== '' ? `/browse/?${newUrlParams}` : '/browse/'
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
        // provide scroll Y pos. so that it can be persisted after `navigate`
        navigate(newUrl, {
          state: { ...newState, scrollY: window.scrollY || 0 },
        })
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
    // NOTE: For "Browse" page, filter counts must always be retrieved because
    // the `exclude` URL param. is used on this page but not on "Search" page
    const getFilterCounts = true
    if (getFilterCounts) {
      const filterCountsParams = new URLSearchParams()
      const exclude = [
        'Other',
        'null',
        'Unspecified',
        'undefined',
        'Publishing organization is presumed to be the funder',
        '',
        'Funder not specified',
        'None',
      ]
      exclude.forEach(d => filterCountsParams.append('exclude', d))
      queries.filterCountsQuery = axios.get(
        `${API_URL}/get/filter_counts?${filterCountsParams.toString()}`
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

  const updateFilterSearchText = e => {
    setFilterSearchText(e.target.value)
  }

  // DEBUG
  const updateDataHistory = () => {
    // update URL params to contain relevant options, unless this update was
    // triggered by a state pop in history
    if (!popstateTriggeredUpdate && initialized) {
      updateHistory({})
    } else {
      setPopstateTriggeredUpdate(false)
    }
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

  // update list of items when different area is selected for browsing
  useEffect(() => {
    setBrowseList({ unique: 0, by_value: [] })
    setFilters({})
    if (context.data.filterCounts !== undefined) {
      setBrowseList(context.data.filterCounts[browseSection])
    } else {
      setBrowseList({ unique: 0, by_value: [] })
    }
    setClickedItem(null)
  }, [browseSection, initialized])

  // set initialized to false on unmount
  useEffect(() => {
    return () => {
      setInitialized(false)
    }
  }, [])

  // adjust scroll when new item is clicked
  useEffect(() => {
    if (clickedItem !== null && clickedRef.current) {
      clickedRef.current.scrollIntoView(true, { behavior: 'smooth' })
      window.scrollBy(0, -110)
    }
  }, [clickedItem])

  // count bookmarks to show in nav
  const bookmarkArr =
    bookmarkedIds !== null ? bookmarkedIds.filter(d => d !== '') : []

  const filterOptions =
    context.data.filterCounts !== undefined
      ? Object.keys(context.data.filterCounts)
      : []

  // generate buttons to browse by topic, event, year, etc.
  const BrowseButton = ({ type }) => {
    let icon
    if (type == 'events') {
      icon = 'caution_orange'
    } else {
      icon = iconNamesByField[type] || null
    }
    if (type === 'types_of_record') {
      return null
    } else {
      return (
        <>
          <div
            className={classNames(styles.browseButton, {
              [styles.selected]: browseSection == type,
            })}
            onClick={() => {
              setBrowseSection(type)
            }}
          >
            <div className={styles.buttonIcon}>
              {getIconByName({ iconName: icon })}
            </div>
            <div className={styles.buttonLabel}>
              <div>{filterDefs[type].label}</div>
              <img
                className={classNames(styles.tooltip, {
                  [styles.left]: type === 'authors',
                  [styles.manualFix]: type === 'key_topics',
                })}
                src={info}
                alt="info icon"
                data-for={type}
                data-tip={tooltipDefs[type]}
              />
            </div>
            <div
              className={classNames(styles.selectedRectangle, {
                [styles.selected]: browseSection == type,
              })}
            ></div>
          </div>
          <ReactTooltip
            id={type}
            type="light"
            effect="float"
            scrollHide={true}
          />
        </>
      )
    }
  }

  // generate items in list
  const Item = ({ content, children }) => {
    const name = content[0]
    const count = browseSection !== 'authors' ? content[1] : content[2]
    return (
      <div
        className={classNames(styles.item, {
          [styles.expanded]: clickedItem === name,
        })}
      >
        <div
          className={classNames(styles.header, {
            [styles.bigContainer]: clickedItem === name,
          })}
          ref={name === clickedItem ? clickedRef : null}
          onClick={() => {
            let id = null
            const arr = []
            if (browseSection === 'authors') {
              id = content[3]
            }
            let newFilters = {}
            switch (browseSection) {
              case 'authors':
                arr.push(id.toString())
                newFilters['author.id'] = arr
                break
              case 'key_topics':
                arr.push(name)
                newFilters['key_topics'] = arr
                break
              case 'author_types':
                arr.push(name)
                newFilters['author.type_of_authoring_organization'] = arr
                break
              case 'funders':
                arr.push(name)
                newFilters['funder.name'] = arr
                break
              case 'years':
                arr.push(name.toString())
                newFilters['years'] = arr
                break
              case 'types_of_record':
                arr.push(name)
                newFilters['type_of_record'] = arr
                break
              case 'events':
                arr.push(name)
                newFilters['event.name'] = arr
                break
              default:
            }
            setFilters(newFilters)
            if (clickedItem === name) {
              setClickedItem(null)
            } else {
              setClickedItem(name)
            }
          }}
        >
          <div className={styles.name}>{name}</div>
          <div className={styles.details}>
            {clickedItem !== name && (
              <div className={styles.count}>
                {count} document{count == 1 ? '' : 's'}
              </div>
            )}
            <div className={styles.caret}>
              <i
                className={classNames('material-icons', {
                  [styles.open]: clickedItem === name,
                })}
              >
                keyboard_arrow_down
              </i>
            </div>
          </div>
        </div>
        {clickedItem === name && (
          <div className={styles.resultContainer}>
            <div className={styles.nestedResults}>{children}</div>
          </div>
        )}
      </div>
    )
  }

  // get text for second "sort by" box labels
  const getSortText = value => {
    if (value) {
      if (sortBy === 'results') {
        return 'Most'
      } else {
        return browseSection === 'years' || browseSection === 'events'
          ? 'Most recent'
          : 'Z to A'
      }
    } else {
      if (sortBy === 'results') {
        return 'Least'
      } else {
        return browseSection === 'years' || browseSection === 'events'
          ? 'Least recent'
          : 'A to Z'
      }
    }
  }

  // JSX
  return (
    <>
      <Layout
        page={'browse'}
        loading={isSearching && !isSearchingText && initialized}
        bookmarkCount={bookmarkArr.length}
      >
        <SEO title="Browse library" />

        <div className={styles.browse}>
          {showOverlay !== false && showOverlay !== 'false' && (
            <DetailOverlay
              {...{
                title: 'Test',
                id: showOverlay,
                close: () => setShowOverlay(false),
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
                browse: true,
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
          <h1>Browse library</h1>
          <p>
            Explore documents by topic area, event, publishing organization,
            year published, and more.
          </p>

          {/* Browse buttons */}
          {context.data.filterCounts !== undefined && (
            <div className={styles.browseSelection}>
              {filterOptions.map((item, index) => {
                return <BrowseButton key={`${item} - ${index}`} type={item} />
              })}
            </div>
          )}

          {/* Search bar */}
          {/* <div className={styles.filterSearchBar}>
            <input
              onChange={updateFilterSearchText}
              type="text"
              placeholder={`Search`}
              value={filterSearchText}
            />
            <div className={styles.inner}>
              {filterSearchText !== '' && (
                <i
                  onClick={() => setFilterSearchText('')}
                  className={classNames('material-icons', styles.clearButton)}
                >
                  clear
                </i>
              )}
            </div>
            <div className={styles.bumper}>
              <i className={'material-icons'}>search</i>
            </div>
          </div> */}

          {/* Sort by row */}
          <div className={styles.sortByRow}>
            {browseList !== null && (
              <div className={styles.resultsText}>
                <p>
                  {filteredList.length} {resultText}
                  {filteredList.length !== 1 ? 's' : ''}
                  {` (${browseList.unique} total documents)`}
                </p>
                {(browseSection === 'events' ||
                  browseSection === 'funders') && (
                  <img
                    className={styles.tooltip}
                    src={info}
                    alt="info icon"
                    data-for="tooltip"
                    data-tip={`Some documents in the library may not be associated with a${
                      resultText === 'event' ? 'n' : ''
                    } ${resultText}`}
                  />
                )}
              </div>
            )}
            <div className={styles.sortBy}>
              <p className={styles.sortHeader}>Sort by</p>
              <div>
                <Selectpicker
                  {...{
                    setOption: setSortBy,
                    curSelection: sortBy,
                    allOption: null,
                    label: null,
                    optionList: [
                      {
                        label:
                          browseSection === 'years' ||
                          browseSection === 'events'
                            ? 'Year'
                            : 'Name',
                        value: 'name',
                      },
                      {
                        label: 'Results',
                        value: 'results',
                      },
                    ],
                  }}
                />
              </div>
              <div>
                <Selectpicker
                  {...{
                    setOption: setListDesc,
                    curSelection: listDesc,
                    allOption: null,
                    label: null,
                    optionList: [
                      {
                        label: getSortText(true),
                        value: true,
                      },
                      {
                        label: getSortText(false),
                        value: false,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>

          {/* Browse results */}
          {browseList !== null && (
            <div className={styles.results}>
              {filteredList.map((item, index) => (
                <Item key={`${item[0]} - ${index} - ${item[1]}`} content={item}>
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
                      isSearchingText,
                      setIsSearchingText,
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
                      loading: isSearching && !isSearchingText && initialized,
                      browse: true,
                    }}
                  />
                </Item>
                // <div>{item[0]}</div>
              ))}
            </div>
          )}
        </div>
        <MobileDisclaimer />
        <ReactTooltip
          id="searchHighlightInfo"
          type="light"
          effect="float"
          delayHide={0}
          delayShow={500}
          scrollHide={true}
        />
        <ReactTooltip
          id="tooltip"
          type="light"
          effect="float"
          scrollHide={true}
        />
      </Layout>
      <LoadingSpinner loading={!initialized} />
    </>
  )
}

export default Browse

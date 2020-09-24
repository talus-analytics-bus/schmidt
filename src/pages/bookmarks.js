// 3rd party components
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import Panel from '../components/Detail/content/Panel'
import DetailOverlay from '../components/Detail/DetailOverlay'
import {
  StickyHeader,
  LoadingSpinner,
  Paginator,
  CardList,
  PrimaryButton,
} from '../components/common'

// local utility functions
import ItemsQuery from '../components/misc/ItemsQuery'
import { execute, withBookmarkedIds, isEmpty } from '../components/misc/Util'

// styles and assets
import styles from '../components/Bookmarks/bookmarks.module.scss'

// constants
const API_URL = process.env.GATSBY_API_URL

const Bookmarks = ({}) => {
  // STATE
  // page initialized?
  const [initialized, setInitialized] = useState(false)

  // data loaded?
  const [loading, setLoading] = useState(!initialized)

  // page data -- bookmarked items
  const [bookmarkedItemData, setBookmarkedItemData] = useState({ data: [] })

  // is page currently fetching search data?
  const [isSearching, setIsSearching] = useState(false)

  // bookmarked items IDs
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

  // simple header/footer reference
  const [simpleHeaderRef, setSimpleHeaderRef] = useState({ current: null })
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // get URL params to parse for filters, search text, pagination settings,
  // and sorting settings
  let urlParams
  if (typeof window !== 'undefined') {
    urlParams = new URLSearchParams(window.location.search)
  } else {
    urlParams = new URLSearchParams()
  }

  // order by parameters
  const [orderBy, setOrderBy] = useState(
    urlParams.get('order_by') || 'relevance'
  )
  const isDescStr = urlParams.get('is_desc') || 'true'
  const [isDesc, setIsDesc] = useState(isDescStr === 'true')

  // current page and pagesize of paginator
  const pageStr = !initialized ? urlParams.get('page') || '1' : '1'
  const [curPage, setCurPage] = useState(+pageStr)

  const [pagesize, setPagesize] = useState(
    !initialized ? urlParams.get('pagesize') || 25 : 25
  )

  // showing detail overlay?
  const [showOverlay, setShowOverlay] = useState(
    urlParams.get('show_overlay') || false
  )

  // track original Y scroll position when overlay was launched so it can be
  // set back when it is closed
  const [origScrollY, setOrigScrollY] = useState(0)

  // CONSTANTS
  const showPaginator = true
  const start = curPage * pagesize - pagesize + 1
  const someBookmarks = bookmarkedItemData.data.length > 0

  // fire when view details buttons are pressed to display the detail overlay
  const onViewDetails = ({ newId, related = false }) => {
    if (typeof window !== undefined && !related) {
      // set scroll Y value
      setOrigScrollY(window.scrollY)
    }
    // set show overlay value
    setShowOverlay(newId)
    setLoading(true)
  }

  // // FUNCTIONS
  // // update state object, URL, and history entry when key params change
  // const updateHistory = ({}) => {
  //   const newUrlParams = new URLSearchParams()
  //   newUrlParams.set('filters', JSON.stringify(filters))
  //   newUrlParams.set('page', curPage)
  //   newUrlParams.set('pagesize', pagesize)
  //   newUrlParams.set('search_text', searchText)
  //   newUrlParams.set('show_overlay', showOverlay)
  //   newUrlParams.set('order_by', orderBy)
  //   newUrlParams.set('is_desc', isDesc)
  //   const newUrl =
  //     newUrlParams.toString() !== '' ? `/search?${newUrlParams}` : '/search'
  //   const newState = {
  //     filters,
  //     curPage,
  //     pagesize,
  //     orderBy,
  //     isDesc,
  //     searchText,
  //     showOverlay,
  //   }
  //   if (typeof window !== 'undefined') {
  //     window.history.pushState(newState, '', newUrl)
  //   }
  // }

  // get result of search query whenever filters or search text are updated
  const getData = async () => {
    // get all bookmarked items, placeholder for now
    const ids = bookmarkedIds.split(',').map(d => +d)
    if (ids.length > 0) {
      setLoading(true)
      const results = await ItemsQuery({
        ids: bookmarkedIds.split(',').map(d => +d),
        pagesize,
        page: curPage,
      })
      setBookmarkedItemData(results.data)
      setLoading(false)
    } else {
      setBookmarkedItemData({ data: [] })
    }
    if (!initialized) setInitialized(true)
  }

  // EFFECT HOOKS
  // get bookmarked ids initially
  useEffect(() => {
    if (bookmarkedIds === null)
      withBookmarkedIds({ callback: setBookmarkedIds })
  }, [bookmarkedIds])

  // re-fetch data if a parameter is changed after bookmarks are loaded
  useEffect(() => {
    if (bookmarkedIds !== null) {
      if (curPage !== 1) {
        setCurPage(1)
      } else {
        getData()
      }
    }
  }, [bookmarkedIds, pagesize, orderBy, isDesc])

  // get new data when page is changed
  useEffect(() => {
    if (initialized) {
      getData()
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

  // count bookmarks to show in nav
  const bookmarkArr =
    bookmarkedIds !== null ? bookmarkedIds.split(',').filter(d => d !== '') : []

  // JSX
  return (
    <>
      <Layout
        page={'bookmarks'}
        loading={loading}
        bookmarkCount={bookmarkArr.length}
      >
        <SEO title="Search results" />
        <div className={styles.bookmarks}>
          <StickyHeader
            {...{
              show: showScrollToTop,
              name: 'Name',
              setSimpleHeaderRef,
              img: null,
            }}
          />
          <Panel
            {...{
              title: <h2>Bookmarked items</h2>,
              iconName: 'bookmark',
              secondary: false,
              heading: true,
            }}
          >
            {initialized && (
              <>
                {!someBookmarks && (
                  <>
                    <div className={styles.noBookmarksInstructions}>
                      You have no bookmarked items yet. Click the{' '}
                      <i className={'material-icons'}>bookmark_border</i>
                      bookmark icon on any search result to save one.{'  '}
                      &nbsp;
                    </div>
                    <PrimaryButton
                      {...{
                        label: 'Go to search page',
                        iconName: 'search',
                        url: '/search',
                      }}
                    />
                  </>
                )}
                {showPaginator && someBookmarks && (
                  <>
                    <Paginator
                      {...{
                        curPage,
                        setCurPage,
                        nTotalRecords: bookmarkedItemData.total,
                        pagesize,
                        setPagesize,
                        showCounter: true, // TODO
                        // showCounter: bookmarkedItemData.data.length > 0,
                        noun: 'item',
                        nouns: 'items',
                      }}
                    />
                    <CardList
                      {...{
                        start,
                        cardData: bookmarkedItemData.data,
                        snippets: bookmarkedItemData.data_snippets || null,
                        onViewDetails: () => '',
                        bookmarkedIds,
                        setBookmarkedIds,
                        onViewDetails,
                        setNextPage:
                          bookmarkedItemData.page !==
                          bookmarkedItemData.num_pages
                            ? () => {
                                setCurPage(curPage + 1)
                                if (typeof window !== 'undefined') {
                                  window.scrollTo(0, 0)
                                }
                              }
                            : false,
                      }}
                    />
                  </>
                )}
              </>
            )}
          </Panel>
          {showOverlay !== false && (
            <DetailOverlay
              {...{
                title: 'Test',
                id: showOverlay,
                close: () => setShowOverlay(false),
                origScrollY,
                onViewDetails,
                origScrollY,
                onLoaded: () => setLoading(false),
                bookmarkedIds,
                setBookmarkedIds,
                simpleHeaderRef,
              }}
            />
          )}
        </div>
      </Layout>
      <LoadingSpinner loading={false} />
    </>
  )
}

export default Bookmarks

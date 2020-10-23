// 3rd party components
import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
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
import ToExcelQuery from '../components/misc/ToExcelQuery'
import {
  execute,
  withBookmarkedIds,
  isEmpty,
  getTooltipTextFunc,
} from '../components/misc/Util'

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
    !initialized ? urlParams.get('pagesize') || 10 : 10
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

  // get tooltip text function
  const getTooltipText = getTooltipTextFunc({
    bookmark: true,
    detail: false,
    related: false,
  })

  // get result of search query whenever filters or search text are updated
  const getData = async () => {
    // get all bookmarked items, placeholder for now
    if (bookmarkedIds.length > 0) {
      setLoading(true)
      const results = await ItemsQuery({
        ids: bookmarkedIds,
        pagesize,
        page: curPage,
      })
      setBookmarkedItemData(results.data)
      setLoading(false)
    } else {
      setBookmarkedItemData({ data: [] })
      setLoading(false)
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
  const bookmarkArr = bookmarkedIds !== null ? bookmarkedIds : []

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
              title: (
                <>
                  <h2>Bookmarked items</h2>
                  {someBookmarks && (
                    <div className={styles.actions}>
                      <PrimaryButton
                        {...{
                          label: 'Download Excel',
                          isSecondary: true,
                          isSmall: true,
                          iconName: 'get_app',
                          onClick: () => {
                            console.log('ToExcelQuery')
                            ToExcelQuery({ ids: bookmarkedIds })
                          },
                        }}
                      />
                    </div>
                  )}
                </>
              ),
              iconName: 'bookmark',
              secondary: false,
              heading: true,
              bgColor: false,
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
                    <CardList
                      {...{
                        start,
                        cardData: bookmarkedItemData.data,
                        snippets: bookmarkedItemData.data_snippets || null,
                        onViewDetails: () => '',
                        bookmarkedIds,
                        setBookmarkedIds,
                        onViewDetails,
                        bookmark: true,
                        getTooltipText,
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
                bookmark: true,
                floating: true,
              }}
            />
          )}
        </div>
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
      <LoadingSpinner loading={false} />
    </>
  )
}

export default Bookmarks

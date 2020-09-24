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
} from '../components/common'

// local utility functions
import ItemsQuery from '../components/misc/ItemsQuery'
import { execute, getIntArray } from '../components/misc/Util'

// styles and assets
import styles from '../components/Bookmarks/bookmarks.module.scss'

// constants
const API_URL = process.env.GATSBY_API_URL

const Bookmarks = ({}) => {
  // STATE
  // page initialized?
  const [initialized, setInitialized] = useState(false)
  const [bookmarkedItemData, setBookmarkedItemData] = useState({})

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
    !initialized ? urlParams.get('pagesize') || 5 : 5
  )

  // CONSTANTS
  const showPaginator = true
  const start = curPage * pagesize - pagesize + 1

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
    const results = await ItemsQuery({
      ids: getIntArray(1, 20),
      pagesize,
      page: curPage,
    })
    console.log('results')
    console.log(results)
    setBookmarkedItemData(results.data)
  }

  // EFFECT HOOKS
  // useEffect(() => {
  //   getData()
  // }, [])

  // when xxx
  useEffect(() => {
    if (true) {
      // if (!popstateTriggeredUpdate && !freezeDataUpdates) {
      if (curPage !== 1) {
        setCurPage(1)
      } else {
        getData()
        if (!initialized) setInitialized(true)
      }
    }
  }, [pagesize, orderBy, isDesc])
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

  // JSX
  return (
    <>
      <Layout page={'bookmarks'} loading={false}>
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
            {showPaginator && (
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
                    setNextPage:
                      bookmarkedItemData.page !== bookmarkedItemData.num_pages
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
          </Panel>
        </div>
      </Layout>
      <LoadingSpinner loading={false} />
    </>
  )
}

export default Bookmarks

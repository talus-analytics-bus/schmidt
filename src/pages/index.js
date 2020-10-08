// 3rd party components
import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip'
import { Link } from 'gatsby'
import axios from 'axios'

// local components
import SEO from '../components/seo'
import Nav from '../components/Layout/Nav/Nav'
import Footer from '../components/Layout/Footer/Footer'
import Collection from '../components/Home/content/Collection/Collection'
import {
  PrimaryButton,
  FloatButton,
  StickyHeader,
  SearchBar,
} from '../components/common'
import { appContext } from '../components/misc/ContextProvider'

// local utility functions
import { withBookmarkedIds, execute } from '../components/misc/Util'
import SearchQuery from '../components/misc/SearchQuery'

// assets and styles
import styles from '../assets/styles/homepage.module.scss'
import logo from '../assets/images/logo.svg'
import flag from '../assets/images/landing-test.png'

// constants
const API_URL = process.env.GATSBY_API_URL

const IndexPage = () => {
  // CONTEXT
  const context = useContext(appContext)

  // STATE  // --------------------------------------------------------------//
  // is page loaded yet? show nothing until it is
  const [loading, setLoading] = useState(true)

  // ids of bookmarked items to count for nav
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

  // track which collections to show: most items to least
  const [baselineFilterCounts, setBaselineFilterCounts] = useState(null)

  // track how many collections have been loaded
  const [numCollectionsLoaded, setNumCollectionsLoaded] = useState(1)

  // show scroll to top?
  const [simpleHeaderRef, setSimpleHeaderRef] = useState({ current: null })
  const [showScrollToTop, setShowScrollToTop] = useState(true)

  // search bar variables
  const [orderBy, setOrderBy] = useState('date')
  const [isDesc, setIsDesc] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [freezeDataUpdates, setFreezeDataUpdates] = useState(false)
  const [isSearchingText, setIsSearchingText] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  // data for collections displayed -- top 10 most recent items by topic or by
  // author name (type?)
  const [data, setData] = useState(null)

  // FUNCTIONS
  // get basic page data
  const getData = async () => {
    const queries = {}
    queries.filterCountsQuery = axios.get(`${API_URL}/get/filter_counts`)
    const results = await execute({ queries })
    setData(
      results.filterCountsQuery.data.data.key_topics.filter(d => d[1] > 0)
    )
    setLoading(false)
  }

  // get search data
  const getSearchData = async () => {
    const results = await SearchQuery({
      search_text: searchText,
      preview: true,
      explain_results: false,
    })

    setSearchResults(results.data)
    setIsSearchingText(false)
  }

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//
  // get bookmarked ids initially
  useEffect(() => {
    if (bookmarkedIds === null)
      withBookmarkedIds({ callback: setBookmarkedIds })
  }, [bookmarkedIds])

  // get data on which collections to show
  useEffect(() => {
    if (data === null) getData()
  }, [])

  // handle searching
  useEffect(() => {
    if (isSearchingText) getSearchData()
  }, [searchText])

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

  // JSX // -----------------------------------------------------------------//
  if (loading) return <div />
  else {
    // CONSTANTS
    // define collections to show
    const collectionsData = data.slice(0, numCollectionsLoaded) // DEBUG
    return (
      <>
        <SEO title="Home" description="Health Security Net landing page" />
        <Nav bookmarkCount={bookmarkedIds.length} page="index" />
        <img className={styles.largeFlag} src={flag}></img>
        <div className={styles.home}>
          <article className={styles.main}>
            <div className={styles.upper}>
              <img
                className={styles.mainLogo}
                src={logo}
                alt={'Health Security Net logo'}
              ></img>
              <div className={styles.textWrapShape}></div>
              <p className={styles.landingText}>
                Welcome to the Georgetown University Global Health Security
                Library, a publicly accessible, centralized database of
                warnings, evaluations, oversight efforts, strategies, and other
                documents that relate to pandemics prior to 2020. This is a
                coded and searchable database that enables access to documents
                written about pandemic risk and related issues.
              </p>
              <div className={styles.controls}>
                <div className={styles.mainButton}>
                  <PrimaryButton
                    {...{
                      label: 'Enter library',
                      url: '/search',
                    }}
                  />
                </div>

                <SearchBar
                  {...{
                    searchText,
                    setSearchText,
                    isSearchingText,
                    setIsSearchingText,
                    setFreezeDataUpdates,
                    setOrderBy,
                    setIsDesc,
                    previewResults: searchResults,
                    right: false,
                  }}
                />
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.lower}>
              <div className={styles.collectionSection}>
                <h1>Browse topic collections</h1>
                <div className={styles.collections}>
                  {collectionsData.map(
                    ([name, count]) =>
                      count > 0 && (
                        <Collection
                          {...{
                            key: name,
                            name,
                            value: name,
                            type: 'key_topics',
                            bookmarkedIds,
                            setBookmarkedIds,
                          }}
                        />
                      )
                  )}
                </div>
                {numCollectionsLoaded < data.length - 1 && (
                  <div className={styles.showAnotherButton}>
                    <FloatButton
                      {...{
                        label: 'Show another topic',
                        icon: <i className={'material-icons'}>expand_less</i>,
                        noOnToggle: true,
                        onClick: () =>
                          setNumCollectionsLoaded(numCollectionsLoaded + 1),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </article>
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
        <Footer />
      </>
    )
  }
}

export default IndexPage

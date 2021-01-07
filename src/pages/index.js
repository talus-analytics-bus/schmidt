// 3rd party components
import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

// local components
import SEO from '../components/seo'
import Nav from '../components/Layout/Nav/Nav'
import Footer from '../components/Layout/Footer/Footer'
import MobileDisclaimer from '../components/MobileDisclaimer/MobileDisclaimer'
import { PrimaryButton, SearchBar } from '../components/common'

// local utility functions
import { withBookmarkedIds, execute } from '../components/misc/Util'
import SearchQuery from '../components/misc/SearchQuery'

// assets and styles
import styles from '../assets/styles/homepage.module.scss'
import logo from '../assets/images/logo.svg'
import flag from '../assets/images/landing-image.png'

// constants

const IndexPage = () => {
  // STATE  // --------------------------------------------------------------//
  // is page loaded yet? show nothing until it is
  const [loading, setLoading] = useState(true)

  // ids of bookmarked items to count for nav
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

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
    setData()
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
  return (
    <>
      <SEO
        title="Home"
        description="Health Security Net is a publicly accessible, centralized library with documents providing information on how to prepare, plan, respond to, and recover from a pandemic."
      />
      <Nav bookmarkCount={loading ? 0 : bookmarkedIds.length} page="index" />
      <img
        className={styles.largeFlag}
        src={flag}
        alt="scientist in a lab"
      ></img>
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
              Welcome to Health Security Net, a publicly accessible, centralized
              library housing decades of documents related to pandemics. Prior
              to the 2020 COVID-19 pandemic, a wealth of work—research,
              government reviews, expert analyses, and hearings—had provided
              information for decisionmakers and others on threat and risk
              awareness for pandemic-prone diseases, and offered guidance on how
              to prepare for, plan, respond to, and recover from pandemics. This
              Library provides access to that body of work: the warnings,
              evaluations, oversight efforts, strategies, and other documents
              related to pandemics and pandemic risk prior to 2020.
            </p>
            <p className={styles.landingText}>
              Using this tool, you can search for specific documents using
              keywords and filters, or browse by category, publishing
              organization, specific event, and more. Documents can be
              bookmarked to view later or downloaded directly from this site
              (where available).
            </p>
            <div className={styles.controls}>
              <div className={styles.mainButtons}>
                <PrimaryButton
                  {...{
                    label: 'Explore library',
                    url: '/browse',
                  }}
                />
                {
                  <PrimaryButton
                    {...{
                      label: 'Go to User Guide',
                      isSecondary: true,
                      isSmall: true,
                      url: '/info/user_guide',
                    }}
                  />
                }
              </div>
              <div className={styles.searchBar}>
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
          </div>
        </article>
      </div>
      <MobileDisclaimer page="index" />
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

export default IndexPage

// 3rd party components
import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { Link } from 'gatsby'
import axios from 'axios'

// local components
import SEO from '../components/seo'
import Nav from '../components/Layout/Nav/Nav'
import Footer from '../components/Layout/Footer/Footer'
import Collection from '../components/Home/content/Collection/Collection'
import { PrimaryButton, FloatButton, StickyHeader } from '../components/common'

// local utility functions
import { withBookmarkedIds, execute } from '../components/misc/Util'

// assets and styles
import styles from '../assets/styles/homepage.module.scss'
import logo from '../assets/images/logo.svg'

// constants
const API_URL = process.env.GATSBY_API_URL

const IndexPage = () => {
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

  // data for collections displayed -- top 10 most recent items by topic or by
  // author name (type?)
  const [data, setData] = useState(null)

  // FUNCTIONS
  const getData = async () => {
    const queries = {}
    queries.filterCountsQuery = axios.get(`${API_URL}/get/filter_counts`)
    const results = await execute({ queries })
    setData(
      results.filterCountsQuery.data.data.key_topics.filter(d => d[1] > 0)
    )
    setLoading(false)
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
        <SEO title="Home" description="Pandemic Repository landing page" />
        <Nav bookmarkCount={bookmarkedIds.length} />
        <div className={styles.home}>
          <article className={styles.main}>
            <div className={styles.upper}>
              <img
                className={styles.mainLogo}
                src={logo}
                alt={'Pandemic Repository logo'}
              ></img>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                nec luctus felis. Donec magna mi, laoreet vitae rutrum sed,
                mollis non ante. Phasellus a tincidunt quam, id bibendum nibh.
                Nulla id finibus augue, nec luctus nisl. Duis at dolor bibendum,
                vestibulum elit ac, accumsan risus. Duis sit amet convallis leo.
              </p>
              <div className={styles.mainButton}>
                <PrimaryButton
                  {...{
                    label: 'Search entire repository',
                    iconName: 'search',
                    url: '/search',
                  }}
                />
              </div>
              <div className={styles.explainer}>
                <i>
                  This tool is designed to be used in Google Chrome or Mozilla
                  Firefox.
                </i>
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
        <StickyHeader
          {...{
            show: showScrollToTop,
            name: 'Name',
            setSimpleHeaderRef,
            img: null,
          }}
        />
      </>
    )
  }
}

export default IndexPage

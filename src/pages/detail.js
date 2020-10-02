// 3rd party components
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import DetailOverlay from '../components/Detail/DetailOverlay'
import { StickyHeader, LoadingSpinner } from '../components/common'

// local utility functions
import SearchQuery from '../components/misc/SearchQuery'
import { execute, withBookmarkedIds } from '../components/misc/Util'

// styles and assets
import styles from '../components/Detail/detail.module.scss'

// constants
const API_URL = process.env.GATSBY_API_URL

const Detail = ({}) => {
  // CONSTANTS
  // get url param for id to feed to <DetailOverlay />
  let urlParams
  if (typeof window !== 'undefined') {
    urlParams = new URLSearchParams(window.location.search)
  } else {
    urlParams = new URLSearchParams()
  }
  const id = urlParams.get('id')

  // STATE
  // bookmarked items IDs
  const [bookmarkedIds, setBookmarkedIds] = useState([])

  // page title
  const [pageTitle, setPageTitle] = useState('Details')

  // loading?
  const [loading, setLoading] = useState(true)

  // get bookmarked ids
  useEffect(() => {
    withBookmarkedIds({ callback: setBookmarkedIds })
  }, [])

  // JSX
  return (
    <>
      <Layout
        page={'detail'}
        loading={false}
        bookmarkCount={bookmarkedIds.length}
      >
        <SEO title={pageTitle} />
        <div className={styles.detail}>
          <DetailOverlay
            {...{
              id,
              setPageTitle,
              bookmarkedIds,
              setBookmarkedIds,
              onLoaded: () => setLoading(false),
            }}
          />
        </div>
      </Layout>
      <LoadingSpinner {...{ loading }} />
    </>
  )
}

export default Detail

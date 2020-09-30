// 3rd party components
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import DetailOverlay from '../components/Detail/DetailOverlay'
// import Results from '../components/Detail/Results/Results'
// import Options from '../components/Detail/Options/Options'
import { StickyHeader, LoadingSpinner } from '../components/common'

// local utility functions
import SearchQuery from '../components/misc/SearchQuery'
import { execute } from '../components/misc/Util'

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

  return (
    <Layout page={'detail'} loading={false}>
      <SEO title="Detail" />
      <div className={styles.detail}>
        <DetailOverlay id={id !== null ? id : 1} />
      </div>
    </Layout>
  )
}

export default Detail

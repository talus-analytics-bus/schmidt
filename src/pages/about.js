// 3rd party components
import React, { useState, useEffect } from 'react'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import { PrimaryButton } from '../components/common'

// styles and assets
import styles from '../components/About/about.module.scss'

// local utility functions
import { withBookmarkedIds } from '../components/misc/Util'

const About = ({}) => {
  // STATE  // --------------------------------------------------------------//
  // is page loaded yet? show nothing until it is
  const [loading, setLoading] = useState(true)

  // ids of bookmarked items to count for nav
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//
  // get bookmarked ids initially
  useEffect(() => {
    if (bookmarkedIds === null)
      withBookmarkedIds({ callback: setBookmarkedIds })
    setLoading(false)
  }, [bookmarkedIds])

  // JSX
  return (
    <Layout
      page={'about'}
      loading={loading}
      bookmarkCount={loading ? null : bookmarkedIds.length}
    >
      <SEO title="About" />
      <div className={styles.about}>
        <h2>About</h2>
        <p>Content coming soon</p>
      </div>
    </Layout>
  )
}

export default About

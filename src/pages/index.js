// 3rd party components
import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

// local components
import SEO from '../components/seo'
import Nav from '../components/Layout/Nav/Nav'
import Footer from '../components/Layout/Footer/Footer'

// local utility functions
import { withBookmarkedIds } from '../components/misc/Util'

// assets and styles
import styles from '../assets/styles/homepage.module.scss'
import logo from '../assets/images/logo.svg'

const test = process.env.GATSBY_TEST_VAR // this should be defined
const IndexPage = () => {
  // STATE  // --------------------------------------------------------------//
  // is page loaded yet? show nothing until it is
  const [loading, setLoading] = useState(true)
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//
  // get bookmarked ids initially
  useEffect(() => {
    if (bookmarkedIds === null)
      withBookmarkedIds({ callback: setBookmarkedIds })
    setLoading(false)
  }, [bookmarkedIds])

  // JSX // -----------------------------------------------------------------//
  if (loading) return <div />
  else
    return (
      <>
        <SEO title="Home" description="Pandemic Repository landing page" />
        <Nav bookmarkCount={bookmarkedIds.length} />
        <article className={styles.main}>
          <img
            className={styles.mainLogo}
            src={logo}
            alt={'Pandemic Repository logo'}
          ></img>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec
            luctus felis. Donec magna mi, laoreet vitae rutrum sed, mollis non
            ante. Phasellus a tincidunt quam, id bibendum nibh. Nulla id finibus
            augue, nec luctus nisl. Duis at dolor bibendum, vestibulum elit ac,
            accumsan risus. Duis sit amet convallis leo.
          </p>
          <div className={styles.explainer}>
            <i>
              This tool is designed to be used in Google Chrome or Mozilla
              Firefox.
            </i>
          </div>
        </article>
        <Footer />
      </>
    )
}

export default IndexPage

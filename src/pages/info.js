// 3rd party components
import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import { Router } from '@reach/router'
import classNames from 'classnames'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import { PrimaryButton, StickyHeader } from '../components/common'
import Overview from '../components/Info/Overview'
import Documentation from '../components/Info/Documentation'
import UserGuide from '../components/Info/UserGuide'
import MobileDisclaimer from '../components/MobileDisclaimer/MobileDisclaimer'

// styles and assets
import styles from '../components/Info/info.module.scss'
import loadingGif from '../assets/icons/loading.gif'

// local utility functions
import { withBookmarkedIds } from '../components/misc/Util'
import ToExcelQuery from '../components/misc/ToExcelQuery'
import { style } from 'd3'

const Info = ({ location }) => {
  // STATE  // --------------------------------------------------------------//

  const getView = () => {
    const pathname = location.pathname ? location.pathname : ''
    console.log('pathname')
    console.log(pathname)
    if (pathname === '/info/' && typeof window !== 'undefined')
      navigate('/info/overview/')
    else {
      const pathnameArr = pathname.split('/')
      const view = pathnameArr[pathnameArr.length - 2]
      return view
    }
    return ''
  }

  // for spinner on download button
  const [isDownloading, setIsDownloading] = useState(false)

  // simple header/footer reference
  const [simpleHeaderRef, setSimpleHeaderRef] = useState({ current: null })
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // set content by tab
  const view = getView()
  console.log('view')
  console.log(view)
  // ids of bookmarked items to count for nav
  const initBookmarkedIds =
    location.state !== undefined && location.state !== null
      ? location.state.bookmarkedIds !== undefined
        ? location.state.bookmarkedIds
        : null
      : null
  const [bookmarkedIds, setBookmarkedIds] = useState(initBookmarkedIds)

  // is page loaded yet? show nothing until it is
  const [loading, setLoading] = useState(initBookmarkedIds === null)

  // CONSTANTS // -----------------------------------------------------------//
  // define tabs and content
  const tabs = [
    {
      name: 'Overview',
      slug: 'overview',
      selected: view === 'overview',
      content: (
        <div className={styles.bodyContainer}>
          <Overview />
        </div>
      ),
    },
    {
      name: 'Documentation',
      slug: 'documentation',
      selected: view === 'documentation',
      content: (
        <div className={styles.bodyContainer}>
          <Documentation />
        </div>
      ),
    },
    {
      name: 'User Guide',
      slug: 'user_guide',
      selected: view === 'user_guide',
      content: (
        <div className={styles.bodyContainer}>
          <UserGuide />
        </div>
      ),
    },
  ]
  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//
  // get bookmarked ids initially
  useEffect(() => {
    if (bookmarkedIds === null) {
      withBookmarkedIds({ callback: setBookmarkedIds })
      setLoading(false)
    }
  }, [bookmarkedIds])

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
  const activeTab = tabs.find(d => d.selected)
  if (activeTab !== undefined) {
    console.log('activeTab')
    console.log(activeTab.slug)
  }

  // JSX
  return (
    <Layout
      page={'info'}
      loading={loading}
      bookmarkCount={loading ? null : bookmarkedIds.length}
    >
      <SEO title="Info" />
      <StickyHeader
        {...{
          show: showScrollToTop,
          name: 'Name',
          setSimpleHeaderRef,
          img: null,
        }}
      />
      <div className={styles.container}>
        {/* <h1 className={styles.title}>
          <i className={'material-icons'}>info</i>Info
        </h1> */}
        <div className={styles.toggleContainer}>
          <div className={styles.tabs}>
            {tabs.map(d => (
              <Link
                to={'/info/' + d.slug + '/'}
                className={styles.tabLink}
                state={{ bookmarkedIds }}
                key={d.slug + '-' + 'link'}
              >
                <div
                  key={d.slug + '-' + 'tab'}
                  className={classNames(styles.tab)}
                >
                  <div className={styles.label}>{d.name}</div>
                  <div
                    className={classNames(styles.selectedRectangle, {
                      [styles.selected]: d.selected,
                    })}
                  ></div>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.buttons}>
            <PrimaryButton
              {...{
                label: !isDownloading ? (
                  'Download complete dataset'
                ) : (
                  <div className={styles.downloading}>
                    Downloading...
                    <img src={loadingGif} alt="loading" />
                  </div>
                ),
                isSecondary: false,
                isSmall: true,
                iconName: !isDownloading ? 'get_app' : null,
                onClick: async () => {
                  setIsDownloading(true)
                  const response = await ToExcelQuery({})
                  setIsDownloading(false)
                },
              }}
            />
            {/* <PrimaryButton
              {...{
                label: 'Download user guide',
                isSecondary: true,
                isSmall: true,
                iconName: 'get_app',
              }}
            /> */}
          </div>
        </div>
        {tabs.map(
          d =>
            d.selected === true && (
              <div key={d.slug + '-content'} className={styles.content}>
                {d.content}
              </div>
            )
        )}
      </div>

      <MobileDisclaimer />
    </Layout>
  )
}

export default Info

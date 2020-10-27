// 3rd party components
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

// local components
import Layout from '../components/Layout/Layout'
import SEO from '../components/seo'
import { PrimaryButton } from '../components/common'
import Overview from '../components/About/Overview'
import Documentation from '../components/About/Documentation'

// styles and assets
import styles from '../components/About/about.module.scss'

// local utility functions
import { withBookmarkedIds } from '../components/misc/Util'
import ToExcelQuery from '../components/misc/ToExcelQuery'
import { style } from 'd3'

const About = ({}) => {
  // STATE  // --------------------------------------------------------------//
  // is page loaded yet? show nothing until it is
  const [loading, setLoading] = useState(true)

  // set content by tab
  const [view, setView] = useState('overview')

  // ids of bookmarked items to count for nav
  const [bookmarkedIds, setBookmarkedIds] = useState(null)

  // CONSTANTS // -----------------------------------------------------------//
  // define tabs and content
  const tabs = [
    {
      name: 'Overview',
      slug: 'overview',
      content: (
        <div className={styles.bodyContainer}>
          <Overview />
        </div>
      ),
    },
    {
      name: 'Documentation',
      slug: 'documentation',
      content: (
        <div className={styles.bodyContainer}>
          <Documentation />
        </div>
      ),
    },
  ]
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
      <div className={styles.container}>
        {/* <h1 className={styles.title}>
          <i className={'material-icons'}>info</i>About
        </h1> */}
        <div className={styles.toggleContainer}>
          <div className={styles.tabs}>
            {tabs.map(d => (
              // <Link to={'/about/' + d.slug}>
              <div
                key={d.slug}
                onClick={() => setView(d.slug)}
                className={classNames(styles.tab)}
              >
                <div className={styles.label}>{d.name}</div>
                <div
                  className={classNames(styles.selectedRectangle, {
                    [styles.selected]: d.slug === view,
                  })}
                ></div>
              </div>
              // </Link>
            ))}
          </div>
          <PrimaryButton
            {...{
              label: 'Download all data',
              isSecondary: false,
              isSmall: true,
              iconName: 'get_app',
              onClick: () => {
                ToExcelQuery({})
              },
            }}
          />
        </div>
        {tabs.map(
          d =>
            d.slug === view && (
              <div key={d.slug + '-content'} className={styles.content}>
                {d.content}
              </div>
            )
        )}
      </div>
    </Layout>
  )
}

export default About

// standard packages
import React, { useState, useEffect, useRef } from 'react'

// assets and styles
import styles from './stickyheader.module.scss'
import classNames from 'classnames'
import arrow from './arrowIcon.png'
import logo from '../../../assets/images/logo.png'

// // local components
// import { TimeframePicker } from '../'

/**
 * @method StickyHeader
 */
export const StickyHeader = ({
  show,
  name,
  img = null,
  className,
  setSimpleHeaderRef,
}) => {
  let simpleHeaderRef = useRef(null)
  useEffect(() => {
    setSimpleHeaderRef(simpleHeaderRef)
  }, [])
  return (
    <div
      role="header"
      className={classNames(styles.stickyHeaderWrapper, {
        [styles.active]: show,
      })}
    >
      <div ref={simpleHeaderRef} className={classNames(styles.stickyHeader)}>
        {
          // <div className={styles.countryName}>
          //   {img}
          //   {name}
          // </div>
        }
        <a
          className={styles.scrollToTop}
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            if (typeof window !== 'undefined') {
              window.scrollTo(0, 0)
            }
          }}
        >
          <img src={arrow} className={styles.arrow} />
          <span>scroll to top</span>
        </a>
        {
          // <div className={styles.stickyFooter}>
          //   <img
          //     className={styles.logo}
          //     src={logo}
          //     alt={'Pandemic Repository'}
          //   />
          // </div>
        }
      </div>
    </div>
  )
}

export default StickyHeader

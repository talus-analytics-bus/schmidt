import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import styles from './nav.module.scss'
import ReactTooltip from 'react-tooltip'
import { InfoTooltip } from '../../common'
import { comma } from '../../misc/Util'

// assets
import logo from '../../../assets/images/white-logo.svg'
import loadingSvg from '../../../assets/images/loading.svg'
import flag from '../../../assets/images/header-test.png'

const Nav = ({ page, loading, bookmarkCount, ...props }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const linksRef = useRef(null)
  const hamburgerRef = useRef(null)
  const pickerRef = useRef(null)

  // EFFECT HOOKS // --------------------------------------------------------//
  // on click anywhere but in menu, and menu is shown, close menu; otherwise
  // do nothing
  useEffect(() => {
    if (document !== undefined)
      document.getElementById('___gatsby').onclick = e => {
        if (linksRef === null || linksRef.current === null) return
        const links = linksRef.current
        if (links.contains(e.target) || hamburgerRef.current.contains(e.target))
          return
        else {
          setShowMobileMenu(false)
        }
      }
  }, [showMobileMenu])

  return (
    <nav
      className={classNames(styles.navWrapper, {
        [styles.showMobileMenu]: showMobileMenu,
        [styles.static]: page === 'index',
      })}
    >
      <div
        className={classNames(styles.nav, {
          [styles.landing]: page === 'index',
        })}
      >
        <Link to={'/'} className={page === 'index' ? styles.hidden : ''}>
          <img src={logo} />
          {/* <img
            className={classNames(styles.loading, {
              [styles.showLoading]: loading,
            })}
            src={loadingSvg}
          /> */}
        </Link>
        <div className={styles.menu}>
          <button ref={hamburgerRef} className={styles.hamburger}>
            <i
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setShowMobileMenu(!showMobileMenu)
              }}
              className={classNames('material-icons')}
            >
              {showMobileMenu ? 'close' : 'menu'}
            </i>
          </button>
          <div ref={linksRef} className={styles.links}>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={classNames(
                page === 'browse' ? styles.active : '',
                styles.linkText
              )}
              to={'/browse/'}
            >
              <i
                className={classNames('material-icons', styles.explore)}
                role="img"
                aria-hidden="true"
              ></i>
              <span>Explore</span>
            </Link>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={classNames(
                page === 'search' ? styles.active : '',
                styles.linkText
              )}
              to={'/search/'}
            >
              <i
                className={classNames('material-icons', styles.search)}
                role="img"
                aria-hidden="true"
              ></i>
              <span>Search</span>
            </Link>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={classNames(
                page === 'bookmarks' ? styles.active : '',
                styles.linkText
              )}
              to={'/bookmarks/'}
            >
              <i
                className={classNames('material-icons', styles.bookmark)}
                role="img"
                aria-hidden="true"
              ></i>
              <span>
                Bookmarks {bookmarkCount > 0 && <>({comma(bookmarkCount)})</>}
              </span>
            </Link>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={classNames(
                page === 'info' ? styles.active : '',
                styles.linkText
              )}
              to={'/info/overview/'}
            >
              <i
                className={classNames('material-icons', styles.info)}
                role="img"
                aria-hidden="true"
              ></i>
              <span>Information</span>
            </Link>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={classNames(
                page === 'contact' ? styles.active : '',
                styles.linkText
              )}
              to={'/contact/'}
            >
              <i
                className={classNames('material-icons', styles.mail)}
                role="img"
                aria-hidden="true"
              ></i>
              <span>Contact us</span>
            </Link>
          </div>
        </div>
      </div>
      {/* <img className={styles.smallFlag} src={flag}></img> */}
    </nav>
  )
}

export default Nav

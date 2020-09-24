import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import styles from './nav.module.scss'
import ReactTooltip from 'react-tooltip'
import { InfoTooltip } from '../../common'
import { comma } from '../../misc/Util'

// assets
import logo from '../../../assets/images/logo.svg'
import loadingSvg from '../../../assets/images/loading-blue.svg'

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
    <div
      className={classNames(styles.navWrapper, {
        [styles.static]: page === 'country' || page === 'compare',
        [styles.wide]: page === 'map',
        [styles.showMobileMenu]: showMobileMenu,
      })}
    >
      <div className={styles.nav}>
        <Link to={'/'}>
          <img src={logo} />
          <img
            className={classNames(styles.loading, {
              [styles.showLoading]: loading,
            })}
            src={loadingSvg}
          />
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
                page === 'search' ? styles.active : '',
                styles.linkText
              )}
              to={'/search'}
            >
              <i className={'material-icons'}>search</i>
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
              to={'/bookmarks'}
            >
              <i className={'material-icons'}>bookmark</i>
              <span>
                Bookmarks {bookmarkCount > 0 && <>({comma(bookmarkCount)})</>}
              </span>
            </Link>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={classNames(
                page === 'about' ? styles.active : '',
                styles.linkText
              )}
              to={'/about'}
            >
              <i className={'material-icons'}>info</i>
              <span>About</span>
            </Link>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={classNames(
                page === 'contact' ? styles.active : '',
                styles.contactDrape
              )}
              to={'/contact'}
            >
              {showMobileMenu ? (
                'Contact us'
              ) : (
                <div>
                  <i className={'material-icons'}>mail</i>
                  <span>contact us</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav

import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import styles from './nav.module.scss'
import ReactTooltip from 'react-tooltip'
import { InfoTooltip } from '../../common'

// assets
import logo from '../../../assets/images/logo.svg'

const Nav = ({ page, ...props }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showCountryPicker, setShowCountryPicker] = useState(false)
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
  }, [showMobileMenu, showCountryPicker])

  /**
   * Return JSX for country picker that opens when you hover on "Country Details" link
   * @method renderCountryPicker
   */
  const renderCountryPicker = () => {
    return (
      <div
        className={styles.countryPicker}
        onMouseLeave={() => {
          if (showCountryPicker) {
            setShowCountryPicker(false)
          }
        }}
      >
        <div className={styles.tabContainer}>
          <div
            className={classNames(
              styles.tab,
              page === 'country' ? styles.active : ''
            )}
          >
            Country
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>Find a country</div>
        </div>
      </div>
    )
  }

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
              className={page === 'search' ? styles.active : ''}
              to={'/search'}
            >
              Search
            </Link>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={page === 'bookmarks' ? styles.active : ''}
              to={'/bookmarks'}
            >
              Bookmarks
            </Link>
            <Link
              onClick={() => {
                setShowMobileMenu(false)
              }}
              className={page === 'about' ? styles.active : ''}
              to={'/about'}
            >
              About
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

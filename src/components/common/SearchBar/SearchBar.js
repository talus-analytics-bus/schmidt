// 3rd party packages
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

// assets and styles
import styles from './searchbar.module.scss'
import loading from './loading.svg'

/**
 * @method SearchBar
 */
export const SearchBar = ({
  searchText,
  setSearchText,
  isSearchingText,
  setIsSearchingText,
  ...props
}) => {
  // STATE
  // track search bar text and delay timing between search event triggers
  const [searchDelay, setSearchDelay] = useState(null)

  // REFS
  // track search bar input
  const searchRef = useRef(null)

  // FUNCTIONS
  // update search text state when appropriate
  const updateSearchText = e => {
    clearTimeout(searchDelay)
    const newTimeout = setTimeout(() => {
      const newSearchText = searchRef.current.value
      setSearchText(newSearchText)
      setIsSearchingText(true)
    }, [500])
    setSearchDelay(newTimeout)
  }

  // EFFECT HOOKS
  // when search reference updates, update search text

  useEffect(() => {
    if (searchText === '' || searchText === undefined || searchText === null) {
      // if search text is blank, ensure the input value is set to blank,
      // in case search was cleared by another component
      searchRef.current.value = ''
    } else {
      searchRef.current.value = searchText
    }
  }, [searchText])

  // JSX
  return (
    <div className={styles.searchBar}>
      <input
        ref={searchRef}
        onChange={updateSearchText}
        type="text"
        placeholder={'Search for pandemic information sources'}
      />
      <img
        className={classNames(styles.loading, {
          [styles.show]: isSearchingText,
        })}
        src={loading}
      />
    </div>
  )
}

export default SearchBar

// 3rd party packages
import React, { useState, useEffect, useRef } from 'react'

// assets and styles
import styles from './searchbar.module.scss'

/**
 * @method SearchBar
 */
export const SearchBar = ({ searchText, setSearchText, ...props }) => {
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
    }, [500])
    setSearchDelay(newTimeout)
  }

  // update data by getting search results

  // EFFECT HOOKS
  // when search reference updates, update search text
  useEffect(() => {
    if (searchText !== '') {
      console.log('SEARCH TRIGGERED: ' + searchText)
    } else {
      // if search text is blank, ensure the input value is set to blank,
      // in case search was cleared by another component
      searchRef.current.value = ''
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
      ></input>
    </div>
  )
}

export default SearchBar

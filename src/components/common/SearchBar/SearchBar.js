// 3rd party packages
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { navigate } from 'gatsby'
import classNames from 'classnames'

// local utility functions
import {
  getIconByName,
  iconNamesByField,
  comma,
  getInitCap,
} from '../../misc/Util'

// assets and styles
import styles from './searchbar.module.scss'
import loading from './loading.svg'

/**
 * @method SearchBar
 * Search bar with dynamic results popup
 */
export const SearchBar = ({
  searchText,
  setSearchText,
  isSearchingText,
  setIsSearchingText,
  setFreezeDataUpdates,
  setOrderBy,
  setIsDesc,
  previewResults = null,
  right = true,
  onDoubleEsc,
  onEnter,
  ...props
}) => {
  // STATE
  // track search bar text and delay timing between search event triggers
  const [searchDelay, setSearchDelay] = useState(null)

  // show suggestions?
  const [showSuggestions, setShowSuggestions] = useState(true) // DEBUG

  // REFS
  // track search bar input and results
  const searchRef = useRef(null)
  const resultsRef = useRef(null)

  // CONSTANTS
  // preview results, if applicable
  const suggestions = getSuggestions({ previewResults, searchText })

  // FUNCTIONS
  // handle on key down

  const doIfEnter = (e, func) => {
    if (e.key === 'Enter' && func !== undefined) func()
  }
  const handleOnKeyUp = useCallback(
    e => {
      if (e.key === 'Escape') {
        if (searchTextIsNotEmpty(searchText)) {
          setSearchText('')
        } else if (onDoubleEsc !== undefined) {
          onDoubleEsc()
        }
      } else
        doIfEnter(e, () => {
          if (
            suggestions !== null &&
            suggestions.length > 0 &&
            !suggestions.noData
          )
            suggestions[0].onClick()
          if (onEnter !== undefined) onEnter()
        })
    },
    [searchText, setSearchText, onDoubleEsc, onEnter, suggestions]
  )

  // update search text state when appropriate
  const updateSearchText = e => {
    clearTimeout(searchDelay)
    const newTimeout = setTimeout(() => {
      const newSearchText = searchRef.current.value

      // sort by relevance, descending if not already
      setFreezeDataUpdates(true)
      setIsSearchingText(true)
      setOrderBy('relevance')
      setIsDesc(true)
      setFreezeDataUpdates(false)
      setSearchText(newSearchText)
    }, [500])
    setSearchDelay(newTimeout)
  }

  // EFFECT HOOKS
  // when search reference updates, update search text
  useEffect(() => {
    if (searchTextIsNotEmpty(searchText)) {
      // if search text is blank, ensure the input value is set to blank,
      // in case search was cleared by another component
      searchRef.current.value = searchText
    } else {
      searchRef.current.value = ''
    }
  }, [searchText])

  // when search reference updates, focus on it and scroll to top if no input
  useEffect(() => {
    if (searchRef.current !== null) {
      searchRef.current.focus()
      if (typeof window !== 'undefined' && !searchTextIsNotEmpty(searchText)) {
        window.scrollTo(0, 0)
      }
    }
  }, [searchRef])

  // when results ref updates, scroll results into view if they're ready
  useEffect(() => {
    if (resultsRef.current !== null) {
      if (typeof window !== 'undefined' && searchTextIsNotEmpty(searchText)) {
        resultsRef.current.scrollIntoView()
      }
    }
  }, [searchText, resultsRef, suggestions])

  // JSX
  return (
    <div className={classNames(styles.searchBar, { [styles.right]: right })}>
      <input
        ref={searchRef}
        onChange={updateSearchText}
        onKeyUp={handleOnKeyUp}
        type="text"
        placeholder={'Search for documents'}
      />
      <div className={styles.inner}>
        <img
          className={classNames(styles.loading, {
            [styles.show]: isSearchingText,
          })}
          src={loading}
        />
        {searchText !== '' && (
          <i
            onClick={() => setSearchText('')}
            className={classNames('material-icons', styles.clearButton)}
          >
            clear
          </i>
        )}
      </div>
      <div className={styles.bumper}>
        <i className={'material-icons'}>search</i>
      </div>
      {suggestions && !isSearchingText && searchText !== '' && (
        <div
          ref={resultsRef}
          key={previewResults.search_text}
          className={styles.suggestions}
        >
          {suggestions.map(d => (
            <div
              key={previewResults.search_text + '-results'}
              className={styles.section}
            >
              <div
                className={classNames(styles.title, {
                  [styles.noData]: d.noData,
                })}
              >
                {d.icon}
                <span
                  tabIndex={d.list.length === 0 && !d.noData ? 0 : undefined}
                  onKeyUp={e => doIfEnter(e, d.onClick)}
                  onClick={d.onClick ? d.onClick : () => ''}
                >
                  {d.section}
                </span>
              </div>
              {d.list.length > 0 && (
                <div key={d.name} className={styles.suggestionList}>
                  {d.list.map(dd => (
                    <div key={dd.name} className={styles.suggestion}>
                      <span
                        tabIndex={0}
                        onKeyUp={e => doIfEnter(e, dd.onClick)}
                        onClick={dd.onClick ? dd.onClick : () => ''}
                      >
                        {dd.name} ({comma(dd.count)} item
                        {dd.count === 1 ? '' : 's'})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar

// format preview results as search suggestions
const getSuggestions = ({ previewResults, searchText }) => {
  if (previewResults === null || previewResults.length === 0) return null
  else {
    const sections = []
    const phrase =
      previewResults.n_items !== 0 ? (
        <span>
          Items matching <b>"{searchText}"</b> ({comma(previewResults.n_items)}{' '}
          item
          {previewResults.n_items === 1 ? '' : 's'})
        </span>
      ) : (
        <span className={styles.noData}>
          No items matched <b>"{searchText}"</b>
        </span>
      )
    // always push the items section
    sections.push({
      section: phrase,
      icon: getIconByName({
        iconName: iconNamesByField.types_of_record,
        styles,
        disabled: previewResults.n_items === 0,
      }),
      list: [],
      noData: previewResults.n_items === 0,
      onClick: () => {
        if (typeof window !== 'undefined') {
          navigate(`/search/?search_text=${searchText}&order_by=relevance`)
        }
      },
      forSort: 999999,
    })

    // push additional sections
    for (const [entityName, instances] of Object.entries(
      previewResults.other_instances
    )) {
      entityName = entityName.replace(/_/g, ' ')
      entityName = getInitCap(entityName)
      let iconName, nameField, filterValueField, filterKey
      if (entityName === 'Author') {
        entityName = 'Publishing organization' //account for user-facing language change from 'author' to 'publishing org'
        iconName = 'authors'
        nameField = 'authoring_organization'
        filterValueField = 'id'
        filterKey = 'author.id'
      } else if (entityName === 'Key topic') {
        iconName = 'key_topics'
        nameField = 'name'
        filterValueField = 'name'
        filterKey = 'key_topics'
      } else if (entityName === 'Tag') {
        iconName = 'covid_tags'
        nameField = 'name'
        filterValueField = 'name'
        filterKey = 'covid_tags'
      } else if (entityName === 'Event') {
        iconName = 'events'
        nameField = 'name'
        filterValueField = 'name'
        filterKey = 'event.name'
      } else {
        throw new Error('Unsupported entity name: ' + entityName)
      }
      let phrase = null
      if (instances.length === 0) {
        phrase = (
          <span className={styles.noData}>
            No {entityName.toLowerCase()} matched <b>"{searchText}"</b>
          </span>
        )
      } else {
        phrase = (
          <span>
            {entityName}s matching <b>"{searchText}"</b> (
            {comma(instances.length)})
          </span>
        )
      }
      const section = {
        section: phrase,
        icon: getIconByName({
          iconName: iconNamesByField[iconName],
          styles,
          disabled: instances.length === 0,
        }),
        list: [],
        forSort: instances.length,
        noData: instances.length === 0,
      }
      if (instances.length > 0) {
        instances.forEach(d => {
          section.list.push({
            name: d[nameField],
            count: d.n_items,
            onClick: () => {
              if (typeof window !== 'undefined') {
                const filters = {
                  [filterKey]: [d[filterValueField].toString()],
                }
                navigate(`/search/?filters=${JSON.stringify(filters)}`)
              }
            },
          })
        })
      }
      sections.push(section)
    }
    sections.sort(function (a, b) {
      if (a.forSort > b.forSort) return -1
      else return 1
    })
    return sections
  }
}
function searchTextIsNotEmpty(searchText) {
  return !(searchText === '' || searchText === undefined || searchText === null)
}

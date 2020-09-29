// 3rd party packages
import React, { useState, useEffect, useRef } from 'react'
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
  ...props
}) => {
  // STATE
  // track search bar text and delay timing between search event triggers
  const [searchDelay, setSearchDelay] = useState(null)

  // show suggestions?
  const [showSuggestions, setShowSuggestions] = useState(true) // DEBUG

  // REFS
  // track search bar input
  const searchRef = useRef(null)

  // FUNCTIONS
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
    if (searchText === '' || searchText === undefined || searchText === null) {
      // if search text is blank, ensure the input value is set to blank,
      // in case search was cleared by another component
      searchRef.current.value = ''
    } else {
      searchRef.current.value = searchText
    }
  }, [searchText])

  // CONSTANTS
  // format preview results as search suggestions
  const getSuggestions = ({ previewResults }) => {
    if (previewResults === null || previewResults.length === 0) return null
    else {
      const sections = []
      const phrase =
        previewResults.n_items !== 0 ? (
          <span>
            Items matching <b>"{searchText}"</b> (
            {comma(previewResults.n_items)} item
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
            window.location.assign(`/search?search_text=${searchText}`)
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
          iconName = 'authors'
          nameField = 'authoring_organization'
          filterValueField = 'id'
          filterKey = 'author.id'
        } else if (entityName === 'Key topic') {
          iconName = 'key_topics'
          nameField = 'name'
          filterValueField = 'name'
          filterKey = 'key_topics'
        } else if (entityName === 'Event') {
          iconName = 'events'
          nameField = 'name'
          filterValueField = 'name'
          filterKey = 'event.name'
        } else {
          iconName = 'key_topics'
          nameField = 'name'
          filterValueField = 'name'
          filterKey = 'unknown'
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
              {comma(instances.length)}) :
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
                  window.location.assign(
                    `/search?filters=${JSON.stringify(filters)}`
                  )
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
  // preview results, if applicable
  const suggestions = getSuggestions({ previewResults })

  // JSX
  return (
    <div className={classNames(styles.searchBar, { [styles.right]: right })}>
      <input
        ref={searchRef}
        onChange={updateSearchText}
        type="text"
        placeholder={'Search repository'}
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
      {suggestions && !isSearchingText && (
        <div key={previewResults.search_text} className={styles.suggestions}>
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
                <span onClick={d.onClick ? d.onClick : () => ''}>
                  {d.section}
                </span>
              </div>
              {d.list.length > 0 && (
                <ul className={styles.suggestionList}>
                  {d.list.map(dd => (
                    <li className={styles.suggestion}>
                      <span onClick={dd.onClick ? dd.onClick : () => ''}>
                        {dd.name} ({comma(dd.count)} item
                        {dd.count === 1 ? '' : 's'})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar

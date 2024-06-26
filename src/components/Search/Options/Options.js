// 3rd party components
import React, { useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'

// local components
import { PrimaryButton, SearchBar } from '../../common'
import YearsCheckboxSet from './content/YearsCheckboxSet/YearsCheckboxSet'
import FilterSection from './content/FilterSection/FilterSection'

// local utility functions
import { iconNamesByField, isEmpty, sortByFilterOrder } from '../../misc/Util'

// local assets and styling
import styles from './options.module.scss'

export const Options = ({
  showFilterSections,
  filterCounts,
  baselineFilterCounts,
  setOrderBy,
  setIsDesc,
  searchText,
  setSearchText,
  filters,
  setFilters,
  fromYear,
  setFromYear,
  toYear,
  setToYear,
  mobile,
  isSearchingText,
  setIsSearchingText,
  setFreezeDataUpdates,
  searchData,
  setShowOverlay,
}) => {
  // CONSTANTS // ---------------------------------------------------------- //
  // num filter sections shown open by default
  const defaultNumOpen = 0

  // STATE // -------------------------------------------------------------- //
  // show/hide additional filter sections
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false)

  // is start over button disabled?
  const [startOverDisabled, setStartOverDisabled] = useState(true)

  // trigger collapse all and expand all functions
  const [triggerCollapseAll, setTriggerCollapseAll] = useState(false)
  const [triggerExpandAll, setTriggerExpandAll] = useState(false)
  const [numOpen, setNumOpen] = useState(defaultNumOpen)

  // define filters
  const filterDefs = {
    years: {
      field: 'years',
      key: 'years',
      label: 'Year',
      resultLabel: 'year',
      choices: [],
      custom: true,
    },
    key_topics: {
      field: 'key_topics',
      key: 'key_topics',
      label: 'Topic area',
      resultLabel: 'topic area',
      choices: [],
    },
    covid_tags: {
      field: 'covid_tags',
      key: 'covid_tags',
      label: 'Tags',
      resultLabel: 'covid_tags',
      choices: [],
    },
    author_types: {
      field: 'author.type_of_authoring_organization',
      key: 'author_types',
      label: (
        <div>
          Publishing
          <br /> org. type
        </div>
      ),
      resultLabel: 'publishing organization type',
      choices: [],
    },
    authors: {
      field: 'author.id',
      key: 'authors',
      label: (
        <div>
          Publishing
          <br /> organization
        </div>
      ),
      resultLabel: 'publishing organization',
      choices: [],
    },
    events: {
      field: 'event.name',
      key: 'events',
      label: 'Event',
      resultLabel: 'event',
      choices: [],
    },
    funders: {
      field: 'funder.name',
      key: 'funders',
      label: 'Funder',
      resultLabel: 'funder',
      choices: [],
    },
    types_of_record: {
      field: 'type_of_record',
      key: 'types_of_record',
      label: 'Document type',
      resultLabel: 'document type',
      choices: [],
    },
  }

  // get list of keys of filters
  const filterKeys = Object.keys(filterDefs).sort(sortByFilterOrder)

  // define filter section component data
  // TODO link to a filterset and filters
  const filterSectionData = []
  if (showFilterSections) {
    filterKeys.forEach(field => {
      // for (const [field, valueCounts] of Object.entries(filterCounts)) {
      // different icon color only on filters pages
      let icon = iconNamesByField[field] || null
      if (['events', 'covid_tags'].includes(field)) {
        icon += '_orange'
      }
      const valueCounts = filterCounts[field].by_value
      const curFilterSectionData = {
        label: field, // TODO pretty,
        field,
        choices: [],
        iconName: icon,
      }
      const alreadySeenValues = []
      if (field == 'authors') {
        // allow for acronym data attached to publishing org
        valueCounts.forEach(([value, acronym, count, id]) => {
          const valueToPush = id === undefined ? value : id
          alreadySeenValues.push(valueToPush)
          curFilterSectionData.choices.push({
            acronym,
            value: valueToPush,
            count,
            label: value,
          })
        })
      } else {
        valueCounts.forEach(([value, count, id]) => {
          const valueToPush = id === undefined ? value : id
          alreadySeenValues.push(valueToPush)
          curFilterSectionData.choices.push({
            value: valueToPush,
            count,
            label: value,
          })
        })
      }
      // if the filter has a defintion specified, update the chocies in that
      // definition object
      const filterHasDefinition = filterDefs[field] !== undefined
      if (filterHasDefinition) {
        // if a filter has subsections, get choices for each subsection
        // const filterHasSubsections = filterDefs[field].subsections !== undefined

        filterDefs[field].choices = curFilterSectionData.choices
        curFilterSectionData.key = filterDefs[field].field
        if (field !== 'authors') {
          // add any "missing" values
          baselineFilterCounts[field].by_value.forEach(([value, count, id]) => {
            const valueToPush = id === undefined ? value : id

            if (alreadySeenValues.includes(valueToPush)) return
            else {
              curFilterSectionData.choices.push({
                value: valueToPush,
                count: 0,
                label: value,
              })
            }
          })
        } else {
          // add any "missing" values
          baselineFilterCounts[field].by_value.forEach(
            ([value, acronym, count, id]) => {
              const valueToPush = id === undefined ? value : id

              if (alreadySeenValues.includes(valueToPush)) return
              else {
                curFilterSectionData.choices.push({
                  value: valueToPush,
                  acronym,
                  count: 0,
                  label: value,
                })
              }
            }
          )
        }

        const isCustom = filterDefs[field].custom === true
        if (isCustom) {
          if (field === 'years') {
            filterDefs[field].custom = (
              <YearsCheckboxSet
                curFilterSectionData={{
                  ...curFilterSectionData,
                  choices: curFilterSectionData.choices.map(c => {
                    return {
                      ...c,
                      value: c.value === null ? null : c.value.toString(),
                    }
                  }),
                }}
                {...{
                  styles,
                  filters,
                  field,
                  fromYear,
                  toYear,
                  setFromYear,
                  setToYear,
                  setFilters,
                }}
              />
            )
          }
        }

        // append this def data to the overall list of filter sections
        filterSectionData.push(curFilterSectionData)
      }
    })
  }

  // track number of filter sections to support collapse/expand all
  const numFilterSections = filterSectionData.length

  // get filter sections
  const filterSections = filterSectionData.map((curFilterSectionData, i) => {
    return (
      <FilterSection
        {...{
          ...curFilterSectionData,
          key: curFilterSectionData.field,
          filterDefs: filterDefs[curFilterSectionData.field],
          defaultOpen: i < defaultNumOpen,
          filters,
          setFilters,
          numSelected:
            filters[curFilterSectionData.key] &&
            filters[curFilterSectionData.key].length,
          triggerCollapseAll,
          setTriggerCollapseAll,
          triggerExpandAll,
          setTriggerExpandAll,
          numOpen,
          setNumOpen,
          numFilterSections,
          // hide: i > 2 && !showAdditionalFilters,
        }}
      />
    )
  })

  // Generate filter badge for 'selected filters' area
  const getBadge = (field, value) => {
    let label
    let authorValue = null
    let tempValue = value
    switch (field) {
      case 'event.name':
        label = 'Event'
        break
      case 'funder.name':
        label = 'Funder'
        break
      case 'type_of_record':
        label = 'Document type'
        break
      case 'author.id':
        label = 'Publishing organization'
        // translate author id into human readable author name
        if (filterSectionData !== null && filterSectionData !== undefined) {
          let authorObj = filterSectionData.filter(
            obj => obj.label === 'authors'
          )[0]
          let authorList
          if (authorObj !== undefined) {
            authorList = authorObj.choices
            authorList.forEach(author => {
              if (author.value == value) {
                authorValue = author.label
              }
            })
          }
        }
        break
      case 'author.type_of_authoring_organization':
        label = 'Publishing org. type'
        break
      case 'key_topics':
        label = 'Topic'
        break
      case 'covid_tags':
        label = 'Tag'
        break
      case 'years':
        label = 'Year'
        tempValue = !tempValue.startsWith('range_')
          ? tempValue
          : tempValue.split('_').slice(1).join('-')
        break
      default:
        label = 'Filter'
    }
    if (tempValue === '') tempValue = 'Unspecified'
    return (
      <div className={styles.badge}>
        <div>
          {label}:{' '}
          <span className={styles.value}>
            {authorValue !== null ? authorValue : tempValue}
          </span>
        </div>
        <div
          className={classNames('material-icons', styles.closeButton)}
          onClick={() => {
            const newFilters = { ...filters }
            newFilters[field] = newFilters[field].filter(v => v !== value)

            if (newFilters[field].length === 0) {
              delete newFilters[field]
              setFilters(newFilters)
            } else {
              setFilters(newFilters)
            }
          }}
        >
          close
        </div>
      </div>
    )
  }

  // FUNCTIONS // ------------------------------------------------------- //
  // handle start over
  const onStartOver = () => {
    // set search text to be blank
    setOrderBy('date')
    setIsDesc(true)
    setSearchText('')
    setFilters({})
  }
  // EFFECT HOOKS // ------------------------------------------------------- //
  // update whether start over button is disabled
  useEffect(() => {
    setStartOverDisabled(
      isEmpty(filters) && (searchText === '' || searchText === null)
    )
  }, [filters, searchText])

  // JSX
  /**
   * Return JSX for search options including filters, reset, order by
   */
  return (
    <div className={classNames(styles.options, { [styles.mobile]: mobile })}>
      <div className={styles.header}>
        <h1>Search library</h1>
        <p>
          Search the document library by keyword and use filters to narrow down
          search results.
        </p>
        {/* {mobile && (
          <i
            className="material-icons"
            onClick={() => setOptionsVisible(false)}
          >
            close
          </i>
        )} */}
      </div>
      <SearchBar
        {...{
          searchText,
          setSearchText,
          isSearchingText,
          setIsSearchingText,
          setFreezeDataUpdates,
          setOrderBy,
          setIsDesc,
          onDoubleEsc: useCallback(() => {
            setFilters({})
          }, [setFilters]),
          onEnter: useCallback(() => {
            if (
              searchText !== null &&
              searchText !== undefined &&
              searchText !== '' &&
              searchData !== null &&
              searchData.data !== undefined &&
              searchData.data !== null &&
              searchData.data.length > 0
            ) {
              setShowOverlay(searchData.data[0].id)
              if (typeof document !== 'undefined') document.activeElement.blur()
            }
          }, [searchData, setShowOverlay]),
        }}
      />
      <div className={styles.filters}>
        <h2>Apply filters</h2>
        {/* {!startOverDisabled && (
          <PrimaryButton
            {...{
              key: 'startOver',
              onClick: onStartOver,
              label: 'Start over',
              disabled: startOverDisabled,
            }}
          />
        )} */}
        <div className={styles.filterSections}>{filterSections}</div>
        {!isEmpty(filters) && (
          <div className={styles.selectedFilters}>
            <div className={styles.selectedHeader}>
              Selected filters
              {Object.keys(filters).length > 0 && (
                <span className={styles.clearButton}>
                  <PrimaryButton
                    {...{
                      key: 'clearAll',
                      onClick: () => setFilters({}),
                      label: 'Clear all',
                      isSecondary: true,
                    }}
                  />
                </span>
              )}
            </div>
            <div className={styles.selectedFiltersList}>
              {Object.entries(filters).map(([field, values]) => (
                <React.Fragment key={field}>
                  {values.map(value => (
                    <React.Fragment key={`${field} - ${value}`}>
                      {getBadge(field, value)}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Options

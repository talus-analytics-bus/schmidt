// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'

// local components
import {
  InfoTooltip,
  Selectpicker,
  FloatButton,
  CheckboxSet,
  PrimaryButton,
  SearchBar,
} from '../../common'
import FilterSection from './content/FilterSection/FilterSection'

// local utility functions
import { getIntArray, iconNamesByField, isEmpty } from '../../misc/Util'

// local assets and styling
import styles from './options.module.scss'
import { lab } from 'd3'

export const Options = ({
  showFilterSections,
  filterCounts,
  baselineFilterCounts,
  orderBy,
  setOrderBy,
  isDesc,
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
  setOptionsVisible,
  isSearchingText,
  setIsSearchingText,
  setFreezeDataUpdates,
  ...props
}) => {
  // CONSTANTS // ---------------------------------------------------------- //
  // num filter sections shown open by default
  const defaultNumOpen = 0

  // STATE // -------------------------------------------------------------- //
  // show/hide additional filter sections
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false)

  // track current value for static single year selections
  const [curValYears, setCurValYears] = useState(filters.years || [])

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
      label: 'Date',
      choices: [],
      custom: true,
    },
    key_topics: {
      field: 'key_topics',
      key: 'key_topics',
      label: 'Topic area',
      choices: [],
    },
    author_types: {
      field: 'author.type_of_authoring_organization',
      key: 'author_types',
      label: (
        <div>
          Authoring
          <br /> org. type
        </div>
      ),
      choices: [],
    },
    authors: {
      field: 'author.id',
      key: 'authors',
      label: (
        <div>
          Authoring
          <br /> organization
        </div>
      ),
      choices: [],
    },
    events: {
      field: 'event.name',
      key: 'events',
      label: 'Event',
      choices: [],
    },
    funders: {
      field: 'funder.name',
      key: 'funders',
      label: 'Funder',
      choices: [],
    },
    types_of_record: {
      field: 'type_of_record',
      key: 'types_of_record',
      label: 'Record type',
      choices: [],
    },
  }

  // get list of keys of filters
  const filterKeys = Object.keys(filterDefs)

  // define filter section component data
  // TODO link to a filterset and filters
  const filterSectionData = []
  if (showFilterSections) {
    filterKeys.forEach(field => {
      // for (const [field, valueCounts] of Object.entries(filterCounts)) {
      // different icon color only on filters pages
      let icon
      if (field == 'events') {
        icon = 'caution_orange'
      } else {
        icon = iconNamesByField[field] || null
      }
      const valueCounts = filterCounts[field]
      const curFilterSectionData = {
        label: field, // TODO pretty,
        field,
        choices: [],
        iconName: icon,
      }
      const alreadySeenValues = []
      valueCounts.forEach(([value, count, id]) => {
        alreadySeenValues.push(id || value)
        curFilterSectionData.choices.push({
          value: id || value,
          count,
          label: value,
        })
      })

      // if the filter has a defintion specified, update the chocies in that
      // definition object
      const filterHasDefinition = filterDefs[field] !== undefined
      if (filterHasDefinition) {
        // if a filter has subsections, get choices for each subsection
        // const filterHasSubsections = filterDefs[field].subsections !== undefined

        filterDefs[field].choices = curFilterSectionData.choices
        curFilterSectionData.key = filterDefs[field].field
        // add any "missing" values
        baselineFilterCounts[field].forEach(([value, count, id]) => {
          if (alreadySeenValues.includes(id || value)) return
          else {
            curFilterSectionData.choices.push({
              value: id || value,
              count: 0,
              label: value,
            })
          }
        })

        const isCustom = filterDefs[field].custom === true
        if (isCustom) {
          if (field === 'years') {
            filterDefs[field].custom = (
              <CheckboxSet
                {...{
                  name: null,
                  sorted: false,
                  key: 'single-years',
                  curVal: curValYears,
                  choices: curFilterSectionData.choices
                    .filter(({ value }) => {
                      if (value === null) return false
                      else
                        return ['2020', '2019', '2018'].includes(
                          value.toString()
                        )
                    })
                    .map(d => {
                      return {
                        ...d,
                        value: d.value.toString(),
                        label: d.label.toString(),
                      }
                    })
                    .sort(function (a, b) {
                      if (+a.value > +b.value) return -1
                      else return 1
                    })
                    .concat([
                      {
                        custom: (
                          <div
                            className={styles.customYearRange}
                            onClick={e => {
                              e.stopPropagation()
                            }}
                          >
                            <div>Custom year range:</div>
                            <Selectpicker
                              {...{
                                placeholder: 'from',
                                setOption: v => {
                                  // set new from year
                                  setFromYear(v)

                                  // set "to" year if irrational
                                  if (toYear < v) {
                                    setToYear(v)
                                  }
                                  // if custom year not enabled, enable it and
                                  // disable other years
                                  const customYearDisabled =
                                    filters[field] === undefined ||
                                    (filters[field] !== undefined &&
                                      filters[field].length > 0 &&
                                      filters[field][0] !== 'custom')
                                  const newFilters = {
                                    ...filters,
                                    [field]: ['custom'],
                                  }
                                  setFilters(newFilters)
                                },
                                curSelection: fromYear,
                                allOption: null,
                                label: null,
                                optionList: getIntArray(1980, 2020)
                                  .reverse()
                                  .map(year => {
                                    return {
                                      label: year.toString(),
                                      value: year.toString(),
                                    }
                                  }),
                              }}
                            />
                            <div> - </div>
                            <Selectpicker
                              {...{
                                placeholder: 'to',
                                setOption: v => {
                                  // set new to year
                                  setToYear(v)

                                  // if custom year not enabled, enable it and
                                  // disable other years
                                  const customYearDisabled =
                                    filters[field] === undefined ||
                                    (filters[field] !== undefined &&
                                      filters[field].length > 0 &&
                                      filters[field][0] !== 'custom')
                                  const newFilters = {
                                    ...filters,
                                    [field]: ['custom'],
                                  }

                                  setFilters(newFilters)
                                },
                                curSelection: toYear,
                                allOption: null,
                                label: null,
                                optionList: getIntArray(1980, 2020)
                                  .reverse()
                                  .map(year => {
                                    return { label: year, value: year }
                                  })
                                  .filter(d => d.value >= fromYear),
                              }}
                            />
                          </div>
                        ),
                        value: 'custom',
                        count: null,
                        label: null,
                      },
                    ]),
                  callback: v => {
                    if (v.length > 0) {
                      const alreadyCustom =
                        filters.years !== undefined &&
                        filters.years[0] === 'custom' &&
                        filters.years.length === 1

                      const specificYearReplacingRange =
                        alreadyCustom && v.length > 1

                      // range?
                      const isCustom = v.includes('custom') && !alreadyCustom

                      if (isCustom) {
                        const newFilters = {
                          ...filters,
                          [field]: ['custom'],
                        }
                        setFilters(newFilters)
                      } else if (specificYearReplacingRange) {
                        setFilters({ ...filters, [field]: [v[0]] })
                      } else {
                        setFilters({ ...filters, [field]: v })
                      }
                    } else {
                      if (filters.years !== undefined) {
                        const newFilters = { ...filters }
                        delete newFilters[field]
                        setFilters(newFilters)
                      }
                    }
                  },
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
    switch (field) {
      case 'event.name':
        label = 'Event'
        break
      case 'funder.name':
        label = 'Funder'
        break
      case 'type_of_record':
        label = 'Record type'
        break
      case 'author.id':
        label = 'Author'
        //translate author id into human readable author name
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
        label = 'Author type'
        break
      case 'key_topics':
        label = 'Topic'
        break
      case 'years':
        label = 'Date'
        break
      default:
        label = 'Filter'
    }
    let tempValue = value
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
    setCurValYears(filters.years || [])
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

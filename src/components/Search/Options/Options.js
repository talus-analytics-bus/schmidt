// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'

// local components
import { InfoTooltip, Selectpicker, FloatButton } from '../../common'
import FilterSection from './content/FilterSection/FilterSection'

// local assets and styling
import styles from './options.module.scss'

export const Options = ({
  showFilterSections,
  filterCounts,
  baselineFilterCounts,
  orderBy,
  setOrderBy,
  searchText,
  setSearchText,
  filters,
  setFilters,
  ...props
}) => {
  // STATE // -------------------------------------------------------------- //
  // show/hide additional filter sections
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false)

  // CONSTANTS // ---------------------------------------------------------- //

  // define filters
  const filterDefs = {
    key_topics: {
      field: 'key_topics',
      label: 'Topic areas',
      choices: [],
    },
    authors: {
      field: 'author.id',
      label: 'Authoring organization',
      choices: [],
    },
  }

  // define filter section component data
  // TODO link to a filterset and filters
  const filterSectionData = []
  if (showFilterSections) {
    for (const [field, valueCounts] of Object.entries(filterCounts)) {
      const curFilterSectionData = {
        label: field, // TODO pretty,
        field,
        choices: [],
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
        filterDefs[field].choices = curFilterSectionData.choices

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

        // append this def data to the overall list of filter sections
        filterSectionData.push(curFilterSectionData)
      }
    }
  }
  console.log('filterSectionData')
  console.log(filterSectionData)
  // get filter sections
  const filterSections = filterSectionData.map((curFilterSectionData, i) => {
    return (
      <FilterSection
        {...{
          ...curFilterSectionData,
          key: curFilterSectionData.field,
          filterDefs: filterDefs[curFilterSectionData.field],
          hide: i > 0 && !showAdditionalFilters,
          filters,
          setFilters,
        }}
      />
    )
  })

  // FUNCTIONS // ------------------------------------------------------- //
  // handle start over
  const onStartOver = () => {
    // set search text to be blank
    setSearchText('')
    setFilters({})
  }
  // EFFECT HOOKS // ------------------------------------------------------- //

  /**
   * Return JSX for search options including filters, reset, order by
   */
  return (
    <div className={styles.options}>
      <h2>Refine search</h2>
      <button onClick={onStartOver}>Start over</button>
      <div>
        Sort results by:{' '}
        <Selectpicker
          {...{
            setOption: setOrderBy,
            curSelection: orderBy,
            allOption: null,
            label: null,
            optionList: [
              {
                label: 'Relevance',
                value: 'relevance',
              },
              {
                label: 'Date',
                value: 'date',
              },
              {
                label: 'Title',
                value: 'title',
              },
            ],
          }}
        />
      </div>
      {filterSections}
      <FloatButton
        {...{
          label: `${
            showAdditionalFilters ? 'Hide' : 'Show'
          } additional filters`,
          onClick: () => setShowAdditionalFilters(!showAdditionalFilters),
        }}
      />
    </div>
  )
}

export default Options

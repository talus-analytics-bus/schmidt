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
  orderBy,
  setOrderBy,
  searchText,
  setSearchText,
  ...props
}) => {
  // STATE // -------------------------------------------------------------- //
  // show/hide additional filter sections
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false)

  // CONSTANTS // ---------------------------------------------------------- //
  // define filter section component data
  const filterSectionData = [{}, {}, {}]
  // get filter sections
  const filterSections = filterSectionData.map((d, i) => {
    return (
      <FilterSection {...{ key: i, hide: i > 0 && !showAdditionalFilters }} />
    )
  })

  // FUNCTIONS // ------------------------------------------------------- //
  // handle start over
  const onStartOver = () => {
    // set search text to be blank
    setSearchText('')
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

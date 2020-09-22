// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'

// local components
import { FilterSet } from '../../../../common'

// local assets and styling
import styles from './filtersection.module.scss'

export const FilterSection = ({
  label = 'Filter section placeholder',
  iconName = null,
  choices = [],
  grouped = false,
  filterDefs,
  hide,
  filters,
  setFilters,
  ...props
}) => {
  // STATE // -------------------------------------------------------------- //

  // EFFECT HOOKS // ------------------------------------------------------- //

  /**
   * Return JSX for filter section with expand/collapse bar, icon, label, and
   * filter options as checkboxes or radio buttons
   */
  return (
    <div className={classNames({ hide })}>
      <FilterSet
        {...{
          checkboxes: true,
          filterDefs: [filterDefs],
          noToggle: true,
          filters,
          setFilters,
          showSelectedFilters: false,
        }}
      />
    </div>
  )
}

export default FilterSection

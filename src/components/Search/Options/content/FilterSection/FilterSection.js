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
  // CONSTANTS
  const icon =
    iconName !== null ? <i className={'material-icons'}>{iconName}</i> : null

  // STATE // -------------------------------------------------------------- //
  // open or collapsed?
  const [open, setOpen] = useState(true)

  // EFFECT HOOKS // ------------------------------------------------------- //

  /**
   * Return JSX for filter section with expand/collapse bar, icon, label, and
   * filter options as checkboxes or radio buttons
   */
  return (
    <div
      className={classNames(styles.filterSection, {
        hide,
        [styles.open]: open,
      })}
    >
      <div onClick={() => setOpen(!open)} className={styles.bar}>
        {icon}
        <span>{filterDefs.label}</span>
        <i className={'material-icons'}>expand_less</i>
      </div>
      <div className={styles.content}>
        <FilterSet
          {...{
            checkboxes: true,
            filterDefs: [{ [filterDefs.field]: filterDefs }],
            noToggle: true,
            filters,
            setFilters,
            showSelectedFilters: false,
            vertical: true,
          }}
        />
      </div>
    </div>
  )
}

export default FilterSection

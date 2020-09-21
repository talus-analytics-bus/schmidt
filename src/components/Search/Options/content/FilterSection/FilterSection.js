// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'

// local components
// import { InfoTooltip, Selectpicker } from '../../common'

// local assets and styling
import styles from './filtersection.module.scss'

export const FilterSection = ({ orderBy, setOrderBy, hide, ...props }) => {
  // STATE // -------------------------------------------------------------- //

  // EFFECT HOOKS // ------------------------------------------------------- //

  /**
   * Return JSX for filter section with expand/collapse bar, icon, label, and
   * filter options as checkboxes or radio buttons
   */
  return <div className={classNames({ hide })}>Filter section placeholder</div>
}

export default FilterSection

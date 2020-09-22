// standard packages
import React, { useState, useEffect } from 'react'

// misc and common components
import { CheckboxSet } from '../'
import { isEmpty, arraysMatch } from '../../misc/Util'

// assets and styles
import styles from './filtercheckbox.module.scss'
import classNames from 'classnames'

/**
 * @method FilterCheckbox
 * Create a checkbox set to represent filters
 */
const FilterCheckbox = ({
  field,
  label,
  choices,
  filters,
  disabledText,
  primary,
  setFilters,
  activeFilter,
  setActiveFilter,
  withGrouping = false,
  className,
  ...props
}) => {
  // define initially selected choices list
  // data structure:
  // TODO
  let initSelectedChoices = filters[field] !== undefined ? filters[field] : []
  const noChoices = choices && choices.length === 0
  const disabled = false
  const [filterState, setFilterState] = useState({
    choices,
    selectedChoices: initSelectedChoices,
  })

  // const nMax = choices !== undefined ? choices.length : 0
  // const nCur = filterState.selectedChoices.length

  useEffect(() => {
    // update filter state
    let updatedSelectedChoices = null
    if (isEmpty(filters)) {
      updatedSelectedChoices = []
      setFilterState({
        ...filterState,
        selectedChoices: updatedSelectedChoices,
      })
    } else {
      if (filters[field] !== undefined) {
        // if (filters[field] !== undefined && choices !== undefined) {

        const curFilters = filterState.selectedChoices
        const newFilters = curFilters.filter(
          d => filters[field].includes(d.value) || filters[field].includes(d)
        )

        updatedSelectedChoices = newFilters
        setFilterState({
          ...filterState,
          selectedChoices: updatedSelectedChoices,
        })
      } else {
        updatedSelectedChoices = []
        setFilterState({
          ...filterState,
          selectedChoices: updatedSelectedChoices,
        })
      }
    }
  }, [filters])

  // const showSelectAll = choices && choices.length > 4
  return (
    <div
      className={classNames(styles.filter, {
        [styles.disabled]: disabled || noChoices,
      })}
    >
      <CheckboxSet
        {...{
          name: null,
          // name: label,
          choices,
          curVal: filters[field],
          callback: v => {
            if (v.length > 0) setFilters({ ...filters, [field]: v })
            else {
              const newFilters = { ...filters }
              delete newFilters[field]
              setFilters(newFilters)
            }
          },
        }}
      />
    </div>
  )
}

export default FilterCheckbox

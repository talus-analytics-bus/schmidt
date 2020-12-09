import React, { useState, useEffect } from 'react'
import { Filter, FilterCheckbox } from '../'

// 3rd party packages
import classNames from 'classnames'

// local functions
import { getInputLabel } from '../Filter/Filter.js'

// local components
import { ShowMore } from '../'

// misc
import { isEmpty } from '../../misc/Util'

// assets and styles
import styles from './filterset.module.scss'
import crossSvg from '../../../assets/icons/cross.svg'
import funnelSvg from '../../../assets/icons/funnel.svg'

/**
 * @method FilterSet
 * Create a bay of filters based on filter definitions
 */
const FilterSet = ({
  filterDefs = [],
  filters = {},
  setFilters = () => '',
  disabled = false,
  disabledValues = ['Country'],
  checkboxes = false,
  vertical = false,
  searchText = '',
  ...props
}) => {
  const [activeFilter, setActiveFilter] = useState(null)
  const [show, setShow] = useState(true)
  const filterGroups = []
  const filterDefsObj = {}

  // get list of filter types enabled
  const enabledFilterKeys = Object.keys(filters)
  // define version of `filters` that excludes and skipped ones
  const filtersNoSkip = {}
  filterDefs.forEach(filterDef => {
    for (const [field, allowedValues] of Object.entries(filters)) {
      if (filterDef[field] && filterDef[field].skip !== true)
        filtersNoSkip[field] = allowedValues
    }
  })

  filterDefs.forEach(filterGroup => {
    const filterGroupComponents = []

    for (const [k, v] of Object.entries(filterGroup)) {
      filterDefsObj[k] = v
      let choices = v.choices
      // if filter has a primary filter that drives its choices, parse them
      if (v.choices !== undefined && v.primary !== undefined) {
        const primaryFilters = filters[v.primary] || []
        // if primary filters are undefined or zero length, disable this filter
        // otherwise set its choices based on the selections
        choices = v.choices.filter(d => {
          return primaryFilters.includes(d.group)
        })
      }
      if (v.custom !== undefined) filterGroupComponents.push(v.custom)
      else if (checkboxes) {
        // show zeros unless:
        // (1) more than one filter type has been selected; or
        // (2) one filter type has been selected and this isn't it
        const moreThanOneTypeSelected = enabledFilterKeys.length > 1
        const notThisTypeSelected =
          enabledFilterKeys.length > 0 && !enabledFilterKeys.includes(v.field)
        // const showZeros = !moreThanOneTypeSelected && !notThisTypeSelected
        const showZeros = false
        filterGroupComponents.push(
          <FilterCheckbox
            {...{
              key: v.field,
              field: v.field,
              label: v.label,
              choices: choices,
              radio: v.radio,
              skip: v.skip,
              className: v.className,
              defaultRadioValue: v.defaultRadioValue,
              dateRange: v.dateRange,
              minMaxDate: v.minMaxDate,
              primary: v.primary,
              disabledText: v.disabledText,
              filters,
              setFilters,
              activeFilter,
              setActiveFilter,
              withGrouping: v.withGrouping,
              showZeros,
              searchText,
            }}
          />
        )
      } else
        filterGroupComponents.push(
          <Filter
            {...{
              key: v.field,
              field: v.field,
              label: v.label,
              choices: choices,
              radio: v.radio,
              skip: v.skip,
              className: v.className,
              defaultRadioValue: v.defaultRadioValue,
              dateRange: v.dateRange,
              minMaxDate: v.minMaxDate,
              primary: v.primary,
              disabledText: v.disabledText,
              filters,
              setFilters,
              activeFilter,
              setActiveFilter,
              withGrouping: v.withGrouping,
            }}
          />
        )
    }
    filterGroupComponents.dropdowns = !filterGroupComponents.some(
      d => d.props.radio
    )
    filterGroups.push(filterGroupComponents)
  })

  /**
   * Return a badge representing the filter value that can be clicked off
   * @method getBadge
   * @param  {[type]} label [description]
   * @param  {[type]} field [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  const getBadge = ({ label, field, value }) => {
    const choices = filterDefsObj[field].choices
    const match = choices.find(d => d.value === value)
    let formattedValue
    if (match) {
      formattedValue = choices.find(d => d.value === value).label
    } else formattedValue = value
    return (
      <div className={styles.badge} key={field + '-' + value}>
        <span>
          <span className={styles.label}>{label}:</span>
          <span className={styles.value}>
            {' '}
            {<ShowMore text={formattedValue} charLimit={60} />}
          </span>
        </span>
        <div
          className={styles.close}
          onClick={() => {
            const newFilters = { ...filters }
            newFilters[field] = newFilters[field].filter(v => v !== value)

            if (
              filterDefsObj[field].dateRange ||
              newFilters[field].length === 0
            ) {
              delete newFilters[field]
              setFilters(newFilters)
            } else {
              setFilters(newFilters)
            }
          }}
        >
          <a style={{ backgroundImage: `url(${crossSvg})` }} type="button"></a>
        </div>
      </div>
    )
  }

  // display selected filters as list of badges that can be clicked off
  const selectedFilters =
    props.showSelectedFilters === false ? null : (
      <div className={styles.selectedFilters}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.filterIcon}>
              <div style={{ backgroundImage: `url(${funnelSvg})` }} />
            </div>
            <span>Selected filters</span>&nbsp;&nbsp;
            {Object.keys(filters).length > 0 && (
              <button className={styles.clear} onClick={() => setFilters({})}>
                Clear all
              </button>
            )}
          </div>
          <div className={styles.badges}>
            {!isEmpty(filtersNoSkip) &&
              Object.entries(filtersNoSkip).map(([field, values]) => (
                <React.Fragment key={field + '-' + values.join('-')}>
                  {!filterDefsObj[field].dateRange &&
                    values.map(value =>
                      getBadge({
                        label: filterDefsObj[field].label,
                        field,
                        value,
                      })
                    )}
                  {filterDefsObj[field].dateRange &&
                    getBadge({
                      label: filterDefsObj[field].label,
                      field,
                      value: getInputLabel({
                        dateRange: true,
                        dateRangeState: [
                          { startDate: values[0], endDate: values[1] },
                        ],
                      }),
                    })}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    )

  return (
    <div className={styles.wrapper}>
      {props.noToggle !== true && (
        <button className={styles.toggle} onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'} filters
          <div className={styles.filterIcon}>
            <div style={{ backgroundImage: `url(${funnelSvg})` }} />
          </div>
        </button>
      )}
      <div className={show ? '' : styles.hidden}>
        <div
          className={classNames(styles.filterSet, {
            [styles.disabled]: disabled,
          })}
        >
          {filterGroups.map(d => (
            <div
              key={d.map(dd => dd.key).join('-')}
              className={classNames(styles.filterGroup, {
                [styles.dropdowns]: d.dropdowns,
                [styles.vertical]: vertical,
              })}
            >
              {d}
            </div>
          ))}
        </div>
        {!isEmpty(filtersNoSkip) && selectedFilters}
      </div>
    </div>
  )
}

export default FilterSet

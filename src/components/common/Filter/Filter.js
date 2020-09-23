// standard packages
import React, { useState, useEffect } from 'react'

// 3rd party modules
import MultiSelect from '@kenshooui/react-multi-select'
import { DateRange } from 'react-date-range'
import moment from 'moment'

// misc and common components
import { RadioToggle } from '../../common'
import { isEmpty, arraysMatch } from '../../misc/Util'

// assets and styles
import calendarSvg from './calendar.svg'
import styles from './filter.module.scss'
import classNames from 'classnames'
import '@kenshooui/react-multi-select/dist/style.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

/**
 * @method Filter
 * create a clickable filter dropdown based on provided choices
 */
const Filter = ({
  field,
  label,
  choices,
  filters,
  disabledText,
  primary,
  setFilters,
  activeFilter,
  setActiveFilter,
  dateRange,
  minMaxDate,
  withGrouping = false,
  className,
  skip = false,
  ...props
}) => {
  const [show, setShow] = useState(false)
  let initSelectedChoices
  if (!dateRange) {
    initSelectedChoices =
      filters[field] !== undefined
        ? choices.filter(d => filters[field].includes(d.value))
        : []
  } else {
    initSelectedChoices = filters[field] !== undefined ? filters[field] : []
  }
  const primaryFiltersOff =
    primary !== undefined &&
    (filters[primary] === undefined || filters[primary].length === 0)
  const noChoices = choices && choices.length === 0
  const disabled = primaryFiltersOff
  const [filterState, setFilterState] = useState({
    choices,
    selectedChoices: initSelectedChoices,
  })
  const [showRangeSelection, setShowRangeSelection] = useState(false)
  const initDateRangeState = [
    {
      startDate:
        initSelectedChoices.length > 0
          ? new Date(moment(initSelectedChoices[0]))
          : undefined,
      endDate:
        initSelectedChoices.length > 0
          ? new Date(moment(initSelectedChoices[1]))
          : undefined,
      key: 'selection',
    },
  ]
  const [dateRangeState, setDateRangeState] = useState(initDateRangeState)

  // // when master filter list is updated by the "clear" button or by closing
  // // a badge, then update this filter's selected values to match
  // useEffect(() => {
  //   if (isEmpty(filters)) {
  //     setFilterState({ ...filterState, selectedChoices: [] });
  //     if (dateRange) {
  //       setDateRangeState(initDateRangeState);
  //     }
  //   } else {
  //     if (filters[field] !== undefined) {
  //       const curFilters = filterState.selectedChoices;
  //       const newFilters = curFilters.filter(
  //         d => filters[field].includes(d.value) || filters[field].includes(d)
  //       );
  //       setFilterState({ ...filterState, selectedChoices: newFilters });
  //     } else {
  //       setFilterState({ ...filterState, selectedChoices: [] });
  //     }
  //   }
  // }, [filters]);

  const nMax = choices !== undefined ? choices.length : 0
  const nCur = filterState.selectedChoices.length

  // define element ID for menu
  const elId = field + 'Dropdown'

  // Close filter if user clicks outside it
  if (show) {
    const onClick = e => {
      if (document !== undefined) {
        const el = document.getElementById(elId)
        if (el && el.contains(e.target)) {
          return
        } else {
          if (typeof window !== 'undefined') {
            window.removeEventListener('click', onClick)
            setShow(false)
          }
        }
      }
      if (typeof window !== 'undefined')
        window.addEventListener('click', onClick)
    }
  }

  useEffect(() => {
    if (show) setActiveFilter(field)
    else if (activeFilter === field) setActiveFilter(null)
  }, [show])

  useEffect(() => {
    if (activeFilter !== field) setShow(false)
  }, [activeFilter])

  useEffect(() => {
    if (dateRange) {
      if (filters[field] === undefined || filters[field].length === 0) {
        setDateRangeState(initDateRangeState)
        setShowRangeSelection(false)
      }
    } else {
      // update filter state
      let updatedSelectedChoices = null
      if (isEmpty(filters)) {
        updatedSelectedChoices = []
        setFilterState({
          ...filterState,
          selectedChoices: updatedSelectedChoices,
        })
        if (dateRange) {
          setDateRangeState(initDateRangeState)
        }
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

      // if this filter has a primary, update based on its values
      if (primary !== undefined) {
        const primaryFiltersOff =
          filters[primary] === undefined || filters[primary].length === 0
        const thisFiltersOn =
          filters[field] !== undefined && filters[field].length > 0
        if (primaryFiltersOff && thisFiltersOn) {
          const newFilters = { ...filters }
          delete newFilters[field]
          setFilters(newFilters)
        } else if (thisFiltersOn) {
          const newSelectedChoices = updatedSelectedChoices.filter(d => {
            return filters[primary].includes(d.group)
          })
          const newFilterState = { ...filterState }
          const newFilters = { ...filters }
          newFilters[field] = newSelectedChoices.map(d => d.value)

          newFilterState.selectedChoices = newSelectedChoices
          const mustUpdateFilters = !arraysMatch(
            filters[field],
            newFilters[field]
          )
          setFilterState(newFilterState)
          if (mustUpdateFilters) setFilters(newFilters)
        }
      }
    }
  }, [filters])

  useEffect(() => {
    if (dateRange) {
      const startRaw = dateRangeState[0].startDate
      const endRaw = dateRangeState[0].endDate
      if (startRaw === undefined || endRaw === undefined) {
        setFilterState({
          ...filterState,
          selectedChoices: [],
        })
        return
      } else {
        const v = [
          moment(dateRangeState[0].startDate).utc().format('YYYY-MM-DD'),
          moment(dateRangeState[0].endDate).utc().format('YYYY-MM-DD'),
        ]
        setFilterState({
          ...filterState,
          selectedChoices: v,
        })
        // update filters
        setFilters({ ...filters, [field]: v })
      }
    }
  }, [dateRangeState])
  if (skip) return <></>
  const showSelectAll = choices && choices.length > 4
  let responsiveHeight = 0
  if (choices !== undefined) {
    const hasGroup = choices.length > 0 && choices[0].group !== undefined
    let nEntries = choices.length
    if (showSelectAll) nEntries++
    if (hasGroup) {
      const nGroups = [...new Set(choices.map(d => d.group))].length
      nEntries += nGroups
    }
    responsiveHeight = choices && nEntries < 5 ? nEntries * 42 : 7 * 42
  }
  if (props.radio !== true) {
    return (
      <div
        className={classNames(styles.filter, {
          [styles.disabled]: disabled || noChoices,
        })}
      >
        <div className={styles.label}>{label}</div>
        <div className={styles.input}>
          <div
            role="filterButton"
            className={classNames(styles.filterButton, className, {
              [styles.shown]: show,
              [styles.selected]: nCur > 0,
              [styles.disabled]: disabled || noChoices,
            })}
            onClick={e => {
              if (activeFilter !== field) {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
              }
              setShow(!show)
            }}
          >
            <span>
              <span className={styles.field}>
                {getInputLabel({
                  dateRange,
                  choices,
                  nMax,
                  dateRangeState,
                  selectedChoices: filterState.selectedChoices,
                  disabledText,
                  disabled,
                })}
              </span>
              <span className={styles.selections}>
                {' '}
                {!dateRange && !disabled && !noChoices && (
                  <span className={styles.numbers}>
                    ({nCur} of {nMax})
                  </span>
                )}
              </span>
            </span>
            {dateRange && <img src={calendarSvg} />}
            {!dateRange && <i className={'material-icons'}>arrow_drop_down</i>}
          </div>
          <div
            id={elId}
            className={classNames(styles.filterMenu, {
              [styles.shown]: show,
              [styles.dateRange]: dateRange,
            })}
            onMouseDown={e => {
              // reveal blue selected range only when calendar has been
              // interacted with
              const el = e.target
              const clickedCalDay =
                el.parentElement.classList.contains('rdrDayNumber') ||
                el.parentElement.classList.contains('rdrDay')
              if (!showRangeSelection && clickedCalDay)
                setShowRangeSelection(true)
            }}
          >
            {!dateRange && (
              <MultiSelect
                wrapperClassName={styles.filterMenuWrapper}
                choices={choices}
                withGrouping={withGrouping}
                selectedChoices={filterState.selectedChoices}
                showSelectedChoices={false}
                showSelectAll={showSelectAll}
                showSearch={showSelectAll}
                responsiveHeight={responsiveHeight}
                onChange={v => {
                  setFilterState({
                    ...filterState,
                    selectedChoices: v,
                  })
                  // update filters
                  if (v.length > 0) {
                    setFilters({ ...filters, [field]: v.map(d => d.value) })
                  } else {
                    const newFilters = { ...filters }
                    delete newFilters[field]
                    setFilters(newFilters)
                  }
                }}
              />
            )}
            {dateRange && (
              <DateRange
                className={showRangeSelection ? '' : styles.hideRangeSelection}
                editableDateInputs={true}
                onChange={item => setDateRangeState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRangeState}
                minDate={minMaxDate.min}
                maxDate={minMaxDate.max}
                startDatePlaceholder={'Start date'}
                endDatePlaceholder={'End date'}
                onPreviewChange={() => {
                  // override default behavior when mousing over the calendar
                  // in order to support custom styling
                  return null
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  } else {
    const defaultRadioValue = props.defaultRadioValue
    return (
      <RadioToggle
        {...{
          className,
          choices,
          curVal:
            isEmpty(filters) || isEmpty(filters[field])
              ? defaultRadioValue
              : filters[field],
          callback: v => {
            const vChoice = choices.find(d => d.value === v)
            setFilterState({
              ...filterState,
              selectedChoices: [vChoice],
            })

            // update filters
            setFilters({ ...filters, [field]: [vChoice.value] })
          },
          label,
        }}
      />
    )
  }
}

/**
 * Given input parameters returns the label that should be shown for the
 * filter dropdown.
 * @method getInputLabel
 * @param  {[type]}      dateRange      [description]
 * @param  {[type]}      nMax           [description]
 * @param  {[type]}      dateRangeState [description]
 * @param  {[type]}      selectedChoices  [description]
 * @return {[type]}                     [description]
 */
export const getInputLabel = ({
  dateRange,
  nMax,
  dateRangeState,
  choices,
  selectedChoices,
  disabledText,
  disabled,
}) => {
  if (!dateRange) {
    // if this filter has a primary and it isn't active, disable it
    if (!disabled && choices && choices.length === 0) {
      return 'No options'
    } else if (disabled) {
      return disabledText
    }
    if (selectedChoices.length === 1) {
      if (selectedChoices[0].label.length < 15) return selectedChoices[0].label
      else return '1 selected'
    } else if (selectedChoices.length === nMax) return 'All selected'
    else if (selectedChoices.length > 0) return 'Multiple selected'
    else return 'None selected'
  } else {
    const startRaw = dateRangeState[0].startDate
    const endRaw = dateRangeState[0].endDate
    if (startRaw === undefined && endRaw === undefined) {
      return 'None selected'
    }

    const start = moment(dateRangeState[0].startDate).utc()
    const end = moment(dateRangeState[0].endDate).utc()

    if (start.isSame(end, 'day')) {
      return `${end.format('MMM D, YYYY')}`
    } else if (start.isSame(end, 'year')) {
      return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`
    } else {
      return `${start.format('MMM D, YYYY')} - ${end.format('MMM D, YYYY')}`
    }
  }
}

export default Filter

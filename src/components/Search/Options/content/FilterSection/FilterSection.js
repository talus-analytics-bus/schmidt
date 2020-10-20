// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'

// local components
import { FilterSet, PrimaryButton } from '../../../../common'
import { comma, getIconByName } from '../../../../misc/Util'

// local assets and styling
import styles from './filtersection.module.scss'

export const FilterSection = ({
  label = 'Filter section placeholder',
  iconName = null,
  choices = [],
  grouped = false,
  filterDefs,
  field,
  hide,
  filters,
  setFilters,
  numSelected = null,
  defaultOpen = true,
  triggerCollapseAll,
  setTriggerCollapseAll,
  triggerExpandAll,
  setTriggerExpandAll,
  numOpen,
  setNumOpen,
  numFilterSections,
  ...props
}) => {
  // CONSTANTS
  const icon = getIconByName({ iconName, styles })

  // STATE // -------------------------------------------------------------- //
  // open or collapsed?
  const [open, setOpen] = useState(defaultOpen)

  let wrapperRef = useRef(null)
  let contentRef = useRef(null)

  // EFFECT HOOKS // ------------------------------------------------------- //
  // when collapse all clicked, set open to false
  useEffect(() => {
    if (triggerCollapseAll) {
      setOpen(false)
      setNumOpen(0)
    }
    setTriggerCollapseAll(false)
  }, [triggerCollapseAll])

  // when expand all clicked, set open to true
  useEffect(() => {
    if (triggerExpandAll) {
      setOpen(true)
      setNumOpen(numFilterSections)
    }
    setTriggerExpandAll(false)
  }, [triggerExpandAll])

  // on click anywhere but in popup, and popup is shown, close popup; otherwise
  // do nothing
  useEffect(() => {
    if (open)
      document.getElementById('___gatsby').onclick = e => {
        if (wrapperRef === null || wrapperRef.current === null) return
        const wrapper = wrapperRef.current
        if (wrapper && wrapper.contains(e.target)) {
          return
        } else {
          setOpen(false)
        }
      }
  }, [open])
  /**
   * Return JSX for filter section with expand/collapse bar, icon, label, and
   * filter options as checkboxes or radio buttons
   */
  return (
    <div
      ref={wrapperRef}
      className={classNames(styles.filterSection, {
        hide,
        [styles.open]: open,
      })}
    >
      <div
        onClick={() => {
          // toggle open / closed
          setOpen(!open)

          // track number currently open
          const isClosing = open
          if (isClosing) {
            setNumOpen(numOpen - 1)
          } else setNumOpen(numOpen + 1)
        }}
        className={classNames(styles.bar, { [styles.open]: open })}
      >
        <div className={styles.icon}>{icon}</div>
        <span className={styles.label}>
          <span>{filterDefs.label}</span>
          <i className={'material-icons'}>arrow_drop_up</i>
          {/* {
            <span className={styles.numSelected}>
              {numSelected && (
                <>
                  <span>({comma(numSelected)})&nbsp;</span>
                </>
              )}
            </span>
          } */}
        </span>
        {/* {numSelected && (
          <div className={styles.clearButton}>
            <PrimaryButton
              {...{
                onClick: e => {
                  e.stopPropagation()
                  const newFilters = { ...filters }
                  delete newFilters[filterDefs.field]
                  setFilters(newFilters)
                },
                label: 'Clear',
                isLink: true,
              }}
            />
          </div>
        )} */}
        <div
          onClick={e => {
            e.stopPropagation()
          }}
          className={classNames(
            styles.content,
            {
              [styles.rightAlign]:
                filterDefs.label == 'Record type' ||
                filterDefs.label == 'Funder',
            },
            {
              [styles.lower]: label == 'author_types' || label == 'authors',
            }
          )}
          ref={contentRef}
        >
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
    </div>
  )
}

export default FilterSection

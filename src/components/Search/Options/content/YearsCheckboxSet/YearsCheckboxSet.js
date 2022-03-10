import React from 'react'
import { CheckboxSet, Selectpicker } from '../../../../common'
import { getIntArray } from '../../../../misc/Util'
const YearsCheckboxSet = ({
  styles,
  filters,
  curFilterSectionData,
  fromYear,
  toYear,
  setFromYear,
  setToYear,
  setFilters,
  field,
}) => (
  <CheckboxSet
    {...{
      name: null,
      sorted: false,
      curVal: filters[field],
      choices: curFilterSectionData.choices
        .filter(({ value }) => {
          return [2020, 2019, 2018].includes(value)
        })
        .sort(function (a, b) {
          if (a.value > b.value) return -1
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
                      //   const customYearDisabled =
                      //     filters[field] === undefined ||
                      //     (filters[field] !== undefined &&
                      //       filters[field].length > 0 &&
                      //       filters[field][0] !== 'custom')
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
                        return { label: year, value: year }
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

          const specificYearReplacingRange = alreadyCustom && v.length > 1

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

export default YearsCheckboxSet

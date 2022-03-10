import React from 'react'
import { CheckboxSet, Selectpicker } from '../../../../common'
import { Settings } from '../../../../Settings/Settings'
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
      curVal:
        filters[field] === undefined
          ? undefined
          : filters[field].map(v => {
              return v.startsWith('range') ? 'custom' : v
            }),
      choices: curFilterSectionData.choices
        .filter(({ value }) => {
          const shownYearCheckboxes = getIntArray(
            Settings.YEAR_MAX - 2,
            Settings.YEAR_MAX
          )
          return shownYearCheckboxes
            .reverse()
            .map(v => v.toString())
            .includes(value)
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
                      if (toYear < parseInt(v)) {
                        setToYear(v)
                      }
                      const newFilters = {
                        ...filters,
                        [field]: [
                          `range_${v}_${
                            toYear === 'null' ? Settings.YEAR_MAX : toYear
                          }`,
                        ],
                      }
                      setFilters(newFilters)
                    },
                    curSelection: fromYear,
                    allOption: null,
                    label: null,
                    optionList: getIntArray(
                      Settings.YEAR_MIN,
                      Settings.YEAR_MAX
                    )
                      .reverse()
                      .map(year => {
                        return {
                          label: year.toString(),
                          value: year.toString(),
                        }
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

                      const newFilters = {
                        ...filters,
                        [field]: [
                          `range_${
                            fromYear === 'null' ? 'Settings.YEAR_MIN' : fromYear
                          }_${v}`,
                        ],
                      }

                      setFilters(newFilters)
                    },
                    curSelection: toYear,
                    allOption: null,
                    label: null,
                    optionList: getIntArray(
                      Settings.YEAR_MIN,
                      Settings.YEAR_MAX
                    )
                      .reverse()
                      .map(year => {
                        return {
                          label: year.toString(),
                          value: year.toString(),
                        }
                      })
                      .filter(d => parseInt(d.value) >= fromYear),
                  }}
                />
              </div>
            ),
            value: 'custom',
            count: null,
            label: 'custom',
            hideLabel: true,
          },
        ]),
      callback: v => {
        if (v.length > 0) {
          const alreadyCustom =
            filters.years !== undefined &&
            (filters.years[0] === 'custom' ||
              filters.years[0].startsWith('range_')) &&
            filters.years.length === 1

          const specificYearReplacingRange = alreadyCustom && v.length > 1

          // range?
          const isCustom = v.includes('custom') && !alreadyCustom

          if (isCustom) {
            const newFilters = {
              ...filters,
              [field]: [
                `range_${fromYear === 'null' ? Settings.YEAR_MIN : fromYear}_${
                  toYear === 'null' ? Settings.YEAR_MAX : toYear
                }`,
              ],
            }
            setFilters(newFilters)
            if (toYear === 'null') setToYear(Settings.YEAR_MAX)
            if (fromYear === 'null') setFromYear(Settings.YEAR_MIN)
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

import React from 'react'
import styles from './checkboxset.module.scss'
import Checkbox from './content/Checkbox'

/**
 * @method CheckboxSet
 */
const CheckboxSet = ({
  name = 'Name',
  choices = [
    {
      label: 'Value A',
      value: 'value_a',
      count: 5202,
    },
  ],
  callback = v => console.log(v),
  curVal = [],
  sorted = true,
  showZeros = true,
  searchText = '',
  ...props
}) => {
  const [allValues, setAllValues] = React.useState(curVal)

  // Trigger callback when all values or filters change
  React.useEffect(() => {
    if (allValues.length > 0) callback([...new Set([...allValues])])
    else callback([])
  }, [allValues])

  const updateAllValues = v => {
    const newAllValues = []
    allCheckboxes.forEach(d => {
      const wasAlreadyChecked = d.props.curChecked
      const matchesChangedCheckbox = d.props.value.toString() === v
      if (wasAlreadyChecked && matchesChangedCheckbox) return
      else if (wasAlreadyChecked) {
        newAllValues.push(d.props.value)
      } else if (!wasAlreadyChecked && matchesChangedCheckbox) {
        newAllValues.push(d.props.value)
      }
    })
    setAllValues(newAllValues)
  }

  // filter choices based on any search text
  let filteredChoices = choices.filter(item => {
    if (item.label !== null) {
      if (item.acronym !== undefined) {
        // for publishing org
        return (
          item.label
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.acronym
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      } else {
        return item.label
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      }
    } else if (item.custom) {
      return true
    } else {
      return false
    }
  })

  const allCheckboxes = choices.map(
    ({ label, value, count = null, custom }) => (
      <Checkbox
        {...{
          label,
          key: label + '_' + value.toString(),
          disabled: props.disabled,
          value,
          callback: v => {
            updateAllValues(v)
          },
          curChecked: curVal.includes(value.toString()),
          count,
          custom,
          showZeros,
        }}
      />
    )
  )
  const checkboxes = allCheckboxes.filter(cb =>
    filteredChoices.some(fc => fc.label === cb.props.label)
  )
  if (sorted) {
    checkboxes.sort(function (a, b) {
      if (a.props.label > b.props.label) {
        return 1
      } else return -1
    })
    checkboxes.sort(function (a, b) {
      if (a.props.count > b.props.count) {
        return -1
      } else return 1
    })
    checkboxes.sort(function (a, b) {
      if (a.props.curChecked && !b.props.curChecked) {
        return -1
      } else return 1
    })
  }

  return (
    <div className={styles.checkboxSet}>
      <div role="label" className={styles.label}>
        {name}
      </div>
      <div className={styles.checkboxContainer}>{checkboxes}</div>
    </div>
  )
}

export default CheckboxSet

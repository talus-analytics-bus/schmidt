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
  ...props
}) => {
  const [allValues, setAllValues] = React.useState(curVal)
  // Trigger callback when all values or filters change
  React.useEffect(() => {
    if (allValues.length > 0)
      callback([...new Set(allValues.join(',').split(','))])
    else callback([])
  }, [allValues])

  const updateAllValues = v => {
    // debug: test checkbox vals
    const newAllValues = []
    checkboxes.forEach(d => {
      const wasAlreadyChecked = d.props.curChecked
      const matchesChangedCheckbox = d.props.value === v
      if (wasAlreadyChecked && matchesChangedCheckbox) return
      else if (!wasAlreadyChecked && matchesChangedCheckbox) {
        newAllValues.push(v)
      }
    })
    setAllValues(newAllValues)
  }

  const checkboxes = choices.map(({ label, value, count = null }) => (
    <Checkbox
      {...{
        label,
        disabled: props.disabled,
        value,
        callback: v => {
          updateAllValues(v)
        },
        curChecked: curVal.includes(value),
        count,
      }}
    />
  ))
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

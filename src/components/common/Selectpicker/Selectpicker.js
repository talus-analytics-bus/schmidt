import React from 'react'
import classNames from 'classnames'
import styles from './selectpicker.module.scss'
import Util from '../../misc/Util.js'

/**
 * Select picker that sets an option from a list.
 * Default is none.
 * @method Selectpicker
 */
const Selectpicker = ({
  setOption,
  optionList,
  allOption,
  label,
  curSelection,
  placeholder = '--',
  disabled = false,
  ...props
}) => {
  const handleChange = e => {
    setOption(e.target.value)
  }
  return (
    <div
      className={classNames(styles.selectpicker, {
        [styles.disabled]: disabled,
      })}
    >
      <div className={styles.label}>{label}</div>
      <select value={curSelection} onChange={handleChange}>
        <option disabled value={'null'}>
          {placeholder}
        </option>
        {allOption && <option value="all">{allOption}</option>}
        {optionList.map(d => (
          <option key={d.label} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Selectpicker

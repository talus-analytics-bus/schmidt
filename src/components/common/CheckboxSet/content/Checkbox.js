import React from 'react'
import styles from './checkbox.module.scss'
import { darkModerateBlue } from '../../../../assets/styles/vars.scss'

// local utility functions
import { comma } from '../../../misc/Util'

/**
 * Generic radio toggle
 * TODO implement tooltip
 * @method Checkbox
 */
const Checkbox = ({
  label,
  value,
  curChecked,
  callback,
  count = null,
  ...props
}) => {
  /**
   * When radio button changes, set current choice equal to its value.
   * @method onChange
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  const onChange = e => {
    const input = e.target.closest('label').querySelector('input')
    callback(input.value)
  }

  // return <div>Checkbox</div>;

  const checkboxJsx = (
    <div className={styles.checkbox}>
      <form>
        <label
          style={{ color: curChecked === true ? darkModerateBlue : '' }}
          onClick={callback ? onChange : undefined}
          for={label}
        >
          <input
            type="checkbox"
            name={label}
            value={value}
            checked={curChecked === true}
            disabled={props.disabled ? 'disabled' : ''}
          />
          <span>
            {label}
            {count !== null && <> ({comma(count)})</>}
            {
              // count !== null && curChecked === true && <> ({comma(count)})</>
            }
          </span>
        </label>
      </form>
    </div>
  )
  return checkboxJsx
}

export default Checkbox

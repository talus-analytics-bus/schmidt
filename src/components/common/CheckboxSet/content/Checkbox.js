// 3rd party packages
import React from 'react'
import styles from './checkbox.module.scss'
import { darkModerateBlue } from '../../../../assets/styles/vars.scss'
import classNames from 'classnames'

// local utility functions
import { comma } from '../../../misc/Util'

/**
 * Generic radio toggle
 * TODO implement tooltip
 * @method Checkbox
 */
const Checkbox = ({
  label,
  hideLabel = false,
  value,
  curChecked,
  callback,
  count = null,
  custom,
  showZeros = true,
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

  // show 'unspecified' instead of blanks
  if (label !== null && label === '') label = 'Unspecified'
  const hide = !showZeros && count !== null && count === 0
  const checkboxJsx = !hide ? (
    <div
      key={label + '_' + value.toString()}
      className={classNames(styles.checkbox, {
        // [styles.gray]: count === 0,
        [styles.hide]: !showZeros && count !== null && count === 0,
      })}
    >
      <form>
        <label
          className={custom !== undefined ? styles.noMargin : null}
          style={{ color: curChecked === true ? darkModerateBlue : '' }}
          onClick={callback ? onChange : undefined}
          for={label}
        >
          <span
            className={classNames(styles.check, {
              [styles.visible]: curChecked,
            })}
          >
            <i className="material-icons">done</i>
          </span>
          <input
            type="checkbox"
            name={label}
            value={value}
            defaultChecked={curChecked === true}
            disabled={props.disabled ? 'disabled' : ''}
          />
          <div className={styles.label}>
            {!hideLabel && <>{label}</>}
            {count !== null && <> ({comma(count)})</>}
            {
              // count !== null && count > 0 && <> ({comma(count)})</>
            }
            {
              // count !== null && curChecked === true && <> ({comma(count)})</>
            }
            {custom !== undefined && custom}
          </div>
        </label>
      </form>
    </div>
  ) : null
  return checkboxJsx
}

export default Checkbox

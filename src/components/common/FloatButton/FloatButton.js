// 3rd party packages
import React, { useState } from 'react'
import classNames from 'classnames'

// assets and styles
import styles from './floatbutton.module.scss'

/**
 * @method FloatButton
 */
export const FloatButton = ({
  label,
  onClick,
  defaultOn = false,
  ...props
}) => {
  // STATE
  // on or off?
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => {
        onClick()
        setOn(!on)
      }}
      className={classNames(styles.floatButton, { [styles.on]: on })}
    >
      <i className={'material-icons'}>expand_less</i>
      {label}
    </button>
  )
}

export default FloatButton

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
  noOnToggle = false,
  icon = null,
  ...props
}) => {
  // STATE
  // on or off?
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => {
        onClick()
        if (!noOnToggle) setOn(!on)
      }}
      className={classNames(styles.floatButton, { [styles.on]: on })}
    >
      {icon}
      {label}
    </button>
  )
}

export default FloatButton

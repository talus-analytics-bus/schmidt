// 3rd party packages
import React, { useState } from 'react'

// assets and styles
import styles from './floatbutton.module.scss'

/**
 * @method FloatButton
 */
export const FloatButton = ({ label, onClick, ...props }) => {
  return (
    <button onClick={onClick} className={styles.floatButton}>
      {label}
    </button>
  )
}

export default FloatButton

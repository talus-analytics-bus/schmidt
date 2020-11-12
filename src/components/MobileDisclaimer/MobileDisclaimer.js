import React from 'react'
import classNames from 'classnames'

import styles from '../../assets/styles/mobile.module.scss'
import { checkPropTypes } from 'prop-types'

const MobileDisclaimer = props => {
  return (
    <div
      className={classNames(styles.mobile, {
        [styles.shiftDown]: props.page !== 'index',
      })}
    >
      <div className={styles.disclaimer}>
        Welcome to the Health Security Library. This website is currently only
        viewable on larger screens. Please return using a desktop browser, or
        maximize your browser window, and content will appear.
      </div>
    </div>
  )
}

export default MobileDisclaimer

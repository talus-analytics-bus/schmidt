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
        <p>
          Welcome to Health Security Net, a publicly accessible, centralized
          library housing decades of documents related to pandemics.
        </p>
        <p>
          This website is currently only viewable on larger screens. Please
          return using a desktop browser, or maximize your browser window, and
          content will appear.
        </p>
      </div>
    </div>
  )
}

export default MobileDisclaimer

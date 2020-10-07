// 3rd party components
import React from 'react'
import classNames from 'classnames'

// local utility functions
import { getIconByName } from '../../misc/Util'

// styles and assets
import styles from './panel.module.scss'
import events from '../../../assets/icons/events.svg'

export const Panel = ({
  title = 'Panel name',
  iconName = 'device_hub',
  children = null,
  secondary = true,
  heading = false,
}) => {
  // CONSTANTS
  const icon = getIconByName({ iconName, styles })
  return (
    <div
      className={classNames(styles.panel, {
        [styles.secondary]: secondary,
        [styles.heading]: heading,
      })}
    >
      <div className={styles.title}>
        <div className={styles.titleContent}>
          {icon}
          <div className={styles.text}>{title}</div>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Panel

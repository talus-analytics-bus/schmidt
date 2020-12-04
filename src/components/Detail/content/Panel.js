// 3rd party components
import React, { useState } from 'react'
import classNames from 'classnames'

// local utility functions
import { getIconByName } from '../../misc/Util'

// styles and assets
import styles from './panel.module.scss'

export const Panel = ({
  title = 'Panel name',
  iconName = 'device_hub',
  children = null,
  secondary = true,
  heading = false,
  expandable = false,
}) => {
  // CONSTANTS
  if (iconName === 'caution') {
    iconName = 'caution_orange'
  }
  const icon = getIconByName({ iconName, styles })
  const [expanded, setExpanded] = useState(true)

  return (
    <div
      className={classNames(styles.panel, {
        [styles.secondary]: secondary,
        [styles.heading]: heading,
        [styles.expandable]: expandable,
      })}
    >
      <div
        className={styles.title}
        onClick={
          expandable
            ? () => {
                setExpanded(!expanded)
              }
            : null
        }
      >
        <div className={styles.titleContent}>
          {icon}
          <div className={styles.text}>{title}</div>
          {expandable && (
            <div className={styles.ddIcon}>
              <i className="material-icons">
                {expanded ? 'arrow_drop_up' : 'arrow_drop_down'}
              </i>
            </div>
          )}
        </div>
      </div>
      {expanded && <div className={styles.content}>{children}</div>}
    </div>
  )
}

export default Panel

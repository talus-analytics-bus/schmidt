// 3rd party components
import React from 'react'
import classNames from 'classnames'

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
  // special icon?
  const specialIcons = {
    outbreak_events: events,
  }
  const specialIcon = specialIcons[iconName]
  const icon =
    specialIcon !== undefined ? (
      <img className={styles.specialIcon} src={specialIcon} />
    ) : (
      <>{iconName && <i className={'material-icons'}>{iconName}</i>}</>
    )
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

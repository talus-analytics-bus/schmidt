// 3rd party components
import React from 'react'
import classNames from 'classnames'

// styles and assets
import styles from './panel.module.scss'

// // constants
// const API_URL = process.env.GATSBY_API_URL

const Panel = ({
  title = 'Panel name',
  iconName = 'device_hub',
  children = null,
  secondary = true,
}) => {
  return (
    <div
      className={classNames(styles.panel, { [styles.secondary]: secondary })}
    >
      <div className={styles.title}>
        {iconName && <i className={'material-icons'}>{iconName}</i>}
        <div className={styles.text}>{title}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Panel

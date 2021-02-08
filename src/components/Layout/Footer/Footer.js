/**
 * Footer displaying logos
 */

// standard packages
import React from 'react'

// import styles
import styles from './footer.module.scss'

// import 3rd party packages
import classNames from 'classnames'

// assets
import talus from '../../../assets/images/logo-talus.png'
import georgetown from '../../../assets/images/logo-georgetown.png'
import idea from '../../../assets/images/logo-title.png'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <a href={'https://ghssidea.org'} target="_blank">
          <img
            src={idea}
            alt={'International Disease and Events Analysis'}
          ></img>
        </a>
        <a href={'https://ghss.georgetown.edu/'} target="_blank">
          <img
            src={georgetown}
            alt={
              'Georgetown University Center for Global Health Science and Security'
            }
          ></img>
        </a>
        <a href={'https://talusanalytics.com/'} target="_blank">
          <img
            className={styles.talus}
            src={talus}
            alt={'Talus Analytics'}
          ></img>
        </a>
      </div>
    </div>
  )
}

export default Footer

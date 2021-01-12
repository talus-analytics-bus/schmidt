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
import logo from '../../../assets/images/logo.svg'
import talus from '../../../assets/images/talus.png'
import georgetown from '../../../assets/images/georgetown.png'

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.logos}>
          <a href={'https://ghss.georgetown.edu/'} target="_blank">
            <img
              className={styles.georgetown}
              src={georgetown}
              alt={
                'Georgetown Center for Global Health Science and Security logo'
              }
            ></img>
          </a>
          <a href={'https://talusanalytics.com/'} target="_blank">
            <img
              className={styles.talus}
              src={talus}
              alt={'Talus Analytics logo'}
            ></img>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer

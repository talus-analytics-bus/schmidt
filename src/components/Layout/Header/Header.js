import React from 'react'

import { Link } from 'gatsby'

import logoImg from '../../../assets/images/logo.png'
import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <img src={logoImg} alt="HIV Policy Lab Logo" />
      </Link>
      <div className={styles.georgetown}>
        PRODUCED BY <br /> GEORGETOWN <br /> UNIVERSITY
      </div>
      <a className={styles.mailing} href="/#sendEmailForm">
        Join our mailing list
      </a>

      {/*      <div>
        <div></div>
        <div>
          <span>PRODUCED BY</span>
          <br />
          <span>GEORGETOWN</span>
          <br />
          <span>UNIVERSITY</span>
        </div>
        <div></div>
      </div>
*/}
    </header>
  )
}

export default Header

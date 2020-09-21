import React from 'react'
import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from 'gatsby'

import styles from './Layout.module.scss'

import '../../assets/styles/table-twbs.css'
import '../../assets/fonts/fontawesome/css/fontawesome.css'
import '../../assets/styles/bootstrap.min.css'
import '../../assets/styles/material.css'
import '../../assets/styles/fonts.css'
import '../../assets/styles/global.scss'
import './reset.css'

import Nav from './Nav/Nav'

const Layout = ({ children, page }) => {
  return (
    <div className={styles.layout}>
      <Nav page={page} />
      {/* <main>{children}</main> */}
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from 'gatsby'
import ContextProvider from './ContextProvider'

import styles from './Layout.module.scss'

import '../../assets/styles/table-twbs.css'
import '../../assets/fonts/fontawesome/css/fontawesome.css'
import '../../assets/styles/bootstrap.min.css'
import '../../assets/styles/material.css'
import '../../assets/styles/fonts.css'
import '../../assets/styles/global.scss'
import './reset.css'

import Nav from './Nav/Nav'
import Footer from './Footer/Footer'

const Layout = ({ children, page, loading, bookmarkCount }) => {
  return (
    <ContextProvider>
      <div key={'layout'} className={styles.layout}>
        <Nav page={page} loading={loading} bookmarkCount={bookmarkCount} />
        {children}
        <Footer />
      </div>
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

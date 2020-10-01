/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// 3rd party packages
import React from 'react'

// You can delete this file if you're not using it
import './src/assets/styles/fonts.css'

// https://www.freecodecamp.org/news/keeping-state-between-pages-with-local-state-in-gatsby-js/
// gatsby-browser.js
// Import the component at the top of the file
const Wrapper = ({ props, children }) => (
  <div {...props} data-type={'wrapper'}>
    {children}
  </div>
)

export const wrapPageElement = ({ element, props }) => (
  <Wrapper {...props}>{element}</Wrapper>
)

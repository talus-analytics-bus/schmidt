/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// 3rd party packages
import React from 'react'

// local components
import ContextProvider from './src/components/misc/ContextProvider'

// You can delete this file if you're not using it
import './src/assets/styles/fonts.css'

export const wrapPageElement = ({ element, props }) => (
  <ContextProvider {...props}>{element}</ContextProvider>
)

// https://github.com/gatsbyjs/gatsby/issues/19401
// get the location object whenever `navigate` is called so that scroll Y pos
// can be extracted if present and scrolled to
export const shouldUpdateScroll = ({
  routerProps: { location },
  // getSavedScrollPosition,
}) => {
  if (location.state && location.state.scrollY !== undefined) {
    window.scrollTo([0, location.state.scrollY])
  }
  return false
}

// standard packages
import React, { useState } from 'react'

// third party packages
import { Link } from 'gatsby'

// assets and styles
import styles from './primarybutton.module.scss'

/**
 * @method PrimaryButton
 * Standard primary button for frontends.
 */
export const PrimaryButton = ({
  // button text
  label = 'Click here',

  // if using icon: material icon name
  iconName = null,

  // if link: URL to go to
  url = null,

  // if link: whether target is in app or external
  urlIsExternal = false,
}) => {
  const icon =
    iconName !== null ? <i className={'material-icons'}>{iconName}</i> : null
  const unwrappedButton = (
    <button className={styles.button}>
      {icon}
      {label}
    </button>
  )

  // put button in link if needed
  let button
  if (url !== null) {
    if (urlIsExternal) {
      button = (
        <a target={'_blank'} href={url}>
          {unwrappedButton}
        </a>
      )
    } else {
      button = <Link to={url}>{unwrappedButton}</Link>
    }
  } else {
    button = unwrappedButton
  }

  // JSX // ---------------------------------------------------------------- //
  return <div className={styles.wrapper}>{button}</div>
}

export default PrimaryButton

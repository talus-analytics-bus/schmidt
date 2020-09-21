// standard packages
import React, { useState } from 'react'
import classNames from 'classnames'

// assets and styles
import styles from './loadingspinner.module.scss'
import loadingSvg from '../../../assets/images/loading.svg'

/**
 * @method LoadingSpinner
 * @desc Full screen loading spinner
 */
export const LoadingSpinner = ({
  // is the page still loading, and spinner should be shown?
  loading,
}) => {
  // JSX // ---------------------------------------------------------------- //
  return (
    <div className={classNames(styles.loading, { [styles.on]: loading })}>
      <img src={loadingSvg} />
    </div>
  )
}

export default LoadingSpinner

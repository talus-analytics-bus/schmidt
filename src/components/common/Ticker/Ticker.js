// 3rd party packages
import React, { useState } from 'react'
import classNames from 'classnames'

// assets and styles
import styles from './ticker.module.scss'
import logoIcon from '../../../assets/images/logo-icon.svg'

/**
 * @method Ticker
 * Standard primary button for frontends.
 */
export const Ticker = ({
  curItemIdx,
  setCurItemIdx,
  items = [],
  label = null,
  customStyle = {},
}) => {
  // CONSTANTS
  // placeholder rectangle if no thumbnail image
  const placeholder = ({ label = '' }) => (
    <div className={classNames(styles.placeholder, styles.thumbnail)}>
      <div>{label.charAt(0)}</div>
      <img src={logoIcon} />
    </div>
  )

  // STATE
  return (
    <div style={customStyle} className={styles.ticker}>
      <div className={styles.label}>{label}</div>
      <div className={styles.tickerContent}>
        <button
          className={curItemIdx === 0 ? styles.disabled : ''}
          onClick={() => {
            if (curItemIdx !== 0) setCurItemIdx(curItemIdx - 1)
          }}
        >
          ‹
        </button>
        <div className={styles.items}>
          {items.map(({ label, imgSrcUrl }, i) => (
            <div
              onClick={() => setCurItemIdx(i)}
              className={classNames(styles.item, {
                [styles.current]: curItemIdx === i,
              })}
            >
              {imgSrcUrl && (
                <img className={styles.thumbnail} src={imgSrcUrl} />
              )}
              {!imgSrcUrl && placeholder({ label })}
            </div>
          ))}
        </div>
        <button
          className={curItemIdx >= items.length - 1 ? styles.disabled : ''}
          onClick={() => {
            if (curItemIdx < items.length - 1) setCurItemIdx(curItemIdx + 1)
          }}
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default Ticker

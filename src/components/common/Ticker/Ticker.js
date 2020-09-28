// 3rd party packages
import React, { useState } from 'react'
import classNames from 'classnames'

// assets and styles
import styles from './ticker.module.scss'

/**
 * @method Ticker
 * Standard primary button for frontends.
 */
export const Ticker = ({ curItemIdx, setCurItemIdx, items = [] }) => {
  // STATE
  return (
    <div className={styles.ticker}>
      <button
        className={curItemIdx === 0 ? styles.disabled : ''}
        onClick={() => {
          if (curItemIdx !== 0) setCurItemIdx(curItemIdx - 1)
        }}
      >
        ‹
      </button>
      <div className={styles.items}>
        {items.map(({ imgSrcUrl }, i) => (
          <div
            onClick={() => setCurItemIdx(i)}
            className={classNames(styles.item, {
              [styles.current]: curItemIdx === i,
            })}
          >
            <img src={imgSrcUrl} />
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
  )
}

export default Ticker

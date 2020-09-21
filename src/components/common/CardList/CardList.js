// 3rd party packages
import React, { useState } from 'react'

// local components
import { Card } from '../'

// local utility functions
import { comma } from '../../misc/Util'

// assets and styles
import styles from './cardlist.module.scss'

/**
 * @method CardList
 */
export const CardList = ({ start, cardData = [], ...props }) => {
  // CONSTANTS
  // define cards
  const cards =
    cardData !== null
      ? cardData.map(({ ...cardProps }, i) => {
          return (
            <Card
              {...{
                key: cardProps.id,
                resultNumber: comma(start + i),
                ...cardProps,
              }}
            />
          )
        })
      : null

  // JSX
  if (cards === null) return null
  else if (cards.length === 0) return <div>No items found</div>
  else return <div className={styles.cardList}>{cards}</div>
}

export default CardList

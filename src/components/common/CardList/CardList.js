// 3rd party packages
import React, { useState } from 'react'

// local components
import { Card } from '../'

// assets and styles
import styles from './cardlist.module.scss'

/**
 * @method CardList
 */
export const CardList = ({ cardData = [], ...props }) => {
  // CONSTANTS
  // define cards
  const cards = cardData.map(
    ({ id, type_of_record, title, date, authors, key_topics }) => {
      return <Card />
    }
  )

  // JSX
  if (cards.length === 0) return <div>No items found</div>
  else return <div className={styles.cardList}>{cards}</div>
}

export default CardList

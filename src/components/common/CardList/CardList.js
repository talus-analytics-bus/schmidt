// 3rd party packages
import React, { useState } from 'react'

// local components
import { Card, FloatButton } from '../'

// local utility functions
import { comma } from '../../misc/Util'

// assets and styles
import styles from './cardlist.module.scss'

/**
 * @method CardList
 */
export const CardList = ({
  start,
  cardData = [],
  setNextPage = false,
  snippets = [],
  ...props
}) => {
  // CONSTANTS
  // define cards
  const cards =
    cardData !== null
      ? cardData.map(({ ...cardProps }, i) => {
          const allCardProps = {
            key: cardProps.id,
            resultNumber: comma(start + i),
            ...cardProps,
          }
          if (snippets !== null) allCardProps.snippets = snippets[i]
          else {
            allCardProps.snippets = {}
          }
          return (
            <Card
              {...{
                ...allCardProps,
              }}
            />
          )
        })
      : null

  // JSX
  if (cards === null) return null
  else if (cards.length === 0) return <div>No items found</div>
  else
    return (
      <div className={styles.cardList}>
        <div className={styles.cards}>{cards}</div>
        {setNextPage && (
          <FloatButton
            {...{
              onClick: () => {
                if (setNextPage) {
                  setNextPage()
                }
              },
              noOnToggle: true,
              icon: (
                <i
                  style={{ transform: 'rotate(90deg)' }}
                  className={'material-icons'}
                >
                  expand_less
                </i>
              ),
              label: 'Next page',
            }}
          />
        )}
      </div>
    )
}

export default CardList

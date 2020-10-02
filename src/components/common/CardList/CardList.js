// 3rd party packages
import React, { useState, useEffect } from 'react'

// local components
import { Card, FloatButton } from '../'

// local utility functions
import { comma, withBookmarkedIds } from '../../misc/Util'

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
  filters,
  setFilters,
  setSearchText,
  onViewDetails,
  related = false,
  single = false,
  alwaysStartNew,
  bookmarkedIds,
  setBookmarkedIds,
  getTooltipText,
  animate = false,
  bookmark = false,
  ...props
}) => {
  // CONSTANTS
  // define cards
  const cards =
    cardData !== null
      ? cardData.map(({ ...cardProps }, i) => {
          const allCardProps = {
            resultNumber: start && comma(start + i),
            ...cardProps,
          }
          if (snippets !== null) allCardProps.snippets = snippets[i] || {}
          else {
            allCardProps.snippets = {}
          }
          return (
            <Card
              {...{
                ...allCardProps,
                key: allCardProps.id + '-' + i,
                filters,
                setFilters,
                setSearchText,
                idx: i,
                onViewDetails,
                related,
                single,
                bookmarkedIds,
                alwaysStartNew,
                setBookmarkedIds,
                getTooltipText,
                bookmark,
                animate,
              }}
            />
          )
        })
      : null

  // JSX
  if (cards === null) return null
  else if (cards.length === 0) {
    return (
      <div className={styles.cardList}>
        <div>No items found</div>
      </div>
    )
  } else
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

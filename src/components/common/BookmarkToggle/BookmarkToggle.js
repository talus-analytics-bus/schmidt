// 3rd party packages
import React, { useState } from 'react'
import classNames from 'classnames'

// third party packages
import { Link } from 'gatsby'

// assets and styles
import styles from './bookmarktoggle.module.scss'

/**
 * @method BookmarkToggle
 * Standard primary button for frontends.
 */
export const BookmarkToggle = ({
  add = true,
  isSecondary = false,
  bookmarkedIds = [],
  setBookmarkedIds = () => '',
  simple = false,
  id,
  key,
}) => {
  const icon = (
    <i className={'material-icons'}>{add ? 'bookmark_border' : 'bookmark'}</i>
  )

  // remove this item from bookmarked IDs
  const rmvFunc = e => {
    e.stopPropagation()

    // get new id list
    const newIdListArr = [...bookmarkedIds].filter(d => +d !== +id)
    const newIdListStr = newIdListArr.join(',')

    // update local storage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bookmarkedIds', newIdListStr)
    }

    // update state
    setBookmarkedIds(newIdListArr)
  }

  // add this item to bookmarked IDs
  const addFunc = e => {
    e.stopPropagation()

    // get new id list
    const newIdArr = [...bookmarkedIds]
    newIdArr.push(id)
    const newIdListStr = newIdArr.join(',')

    // update local storage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bookmarkedIds', newIdListStr)
    }

    // update state
    setBookmarkedIds(newIdArr)
  }
  const onClick = add ? addFunc : rmvFunc
  const button = (
    <button
      onClick={onClick}
      className={classNames(styles.button, {
        [styles.secondary]: isSecondary,
      })}
    >
      {icon}
      {add ? 'Add' : 'Remove'} bookmark
    </button>
  )

  // JSX // ---------------------------------------------------------------- //
  return simple ? (
    <div
      key={key}
      onClick={onClick}
      className={classNames(styles.wrapper, styles.simple)}
    >
      {icon}
    </div>
  ) : (
    <div key={key} className={styles.wrapper}>
      {button}
    </div>
  )
}

export default BookmarkToggle

// 3rd party packages
import React, { useState } from 'react'
import classNames from 'classnames'

// assets and styles
import styles from './card.module.scss'

// local components
import { PrimaryButton } from '../'

// local utility functions
import { formatDate } from '../../misc/Util'

// constants
const API_URL = process.env.GATSBY_API_URL

/**
 * @method Card
 */
export const Card = ({
  resultNumber,
  id,
  type_of_record,
  title,
  date,
  authors,
  key_topics,
  files,
  snippets,
  ...props
}) => {
  const card = {}
  const getHighlightSegments = ({ text, type = 'normal' }) => {
    // replace text within highlight tags with JSX
    const textArr = text
      .replace('</highlight>', '<highlight>')
      .split('<highlight>')
    const newText = []
    textArr.forEach((d, i) => {
      const highlightSegment = i % 2 === 1
      if (highlightSegment) {
        newText.push(
          <span className={classNames(styles.highlighted, styles[type])}>
            {d}
          </span>
        )
      } else {
        newText.push(<>{d}</>)
      }
    })
    return newText
  }
  if (snippets !== null && snippets !== undefined) {
    const standardSnippets = [['title', title]]
    const linkListSnippets = [['authors', authors, 'authoring_organization']]
    standardSnippets.forEach(([key, variable]) => {
      if (snippets[key] !== undefined) {
        card[key] = getHighlightSegments({ text: snippets[key] })
      } else card[key] = variable
    })
    linkListSnippets.forEach(([key, variable, linkTextField]) => {
      if (snippets[key] !== undefined) {
        // assume id is link field
        const linkIdField = 'id'

        // get link list entry text
        const linkListEntries = variable.map(d => {
          const matchingSnippet = snippets[key].find(dd => dd.id === d.id)
          console.log('matchingSnippet')
          console.log(matchingSnippet)
          if (matchingSnippet) {
            return {
              onClick: () => console.log(d[linkIdField]), // TODO
              text: getHighlightSegments({
                text: matchingSnippet[linkTextField],
                type: 'small',
              }),
            }
          } else {
            return {
              onClick: () => console.log(d[linkIdField]), // TODO
              text: d[linkTextField],
            }
          }
        })
        card[key] = linkListEntries.map(d => (
          <div onClick={d.onClick} className={styles.link}>
            {d.text}
          </div>
        ))
      }
    })
  }

  // TOOD generate link list using same code as above in modular way
  if (card.authors === undefined) {
    card.authors = authors.map(d => (
      <div onClick={() => console.log(d.id)} className={styles.link}>
        {d.authoring_organization}
      </div>
    ))
  }
  return (
    <div className={styles.card}>
      <div className={styles.col}>
        <div className={styles.resultNumber}>{resultNumber}</div>
      </div>
      <div className={styles.col}>
        {files.length > 0 && (
          <div className={styles.thumbnail}>
            <img src={`${API_URL}/get/file?id=${files[0].id}&get_thumb=true`} />
          </div>
        )}
        {files.length === 0 && (
          <div className={classNames(styles.thumbnail, styles.placeholder)}>
            Preview unavailable
          </div>
        )}
      </div>
      <div className={styles.col}>
        <div className={styles.main}>
          <div className={styles.type}>{type_of_record}</div>
          <div className={styles.title}>
            {title !== '' ? card.title : 'Untitled'}
          </div>
          <div className={styles.detailsAndActions}>
            <div className={styles.details}>
              <div className={styles.authOrg}>
                <i className={'material-icons'}>person</i>
                <div>
                  {authors.length > 0 && card.authors}
                  {authors.length === 0 && (
                    <div>Authoring organization unavailable</div>
                  )}
                </div>
              </div>
              <div className={styles.date}>
                <i className={'material-icons'}>event</i>
                {date !== null && <span>{formatDate(date)}</span>}
                {date === null && <span>Date unavailable</span>}
              </div>
            </div>
            <div className={styles.actions}>
              <PrimaryButton
                {...{
                  label: 'Preview',
                  iconName: 'preview',
                  isSecondary: true,
                }}
              />
              <PrimaryButton
                {...{ label: 'View details', iconName: 'read_more' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

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
  snippets = {},
  ...props
}) => {
  // define obj to hold card text, including highlighted snippets, if any
  const card = {}

  /**
   * Get highlighted text snippets in the card data and assign them to the
   * `card` object that holds card text, if found, otherwise assign normal txt
   * @method getHighlightSegments
   * @param  {[type]}             text           [description]
   * @param  {String}             [type='normal' }]            [description]
   * @return {[type]}                            [description]
   */
  const getHighlightSegments = ({ text, type = 'normal' }) => {
    // replace text within highlight tags with JSX
    const textArr = text
      .replace('</highlight>', '<highlight>')
      .split('<highlight>')

    // arr to hold new text (with highlights)
    const newText = []

    // for each text chunk, wrap in highlight JSX tag
    textArr.forEach((d, i) => {
      // odd segments are highlighted portions
      const highlightSegment = i % 2 === 1
      if (highlightSegment) {
        newText.push(
          <span className={classNames(styles.highlighted, styles[type])}>
            {d}
          </span>
        )
      } else {
        // push normal text if not a highlight snippet
        newText.push(<>{d}</>)
      }
    })
    return newText
  }

  // if snippets are provided, then scan them and use them
  // standard snippets are plain text (not hyperlinks)
  const standardSnippets = [['title', title]]

  // link list snippets are author names, etc. that when clicked do something
  const linkListSnippets = [['authors', authors, 'authoring_organization']]

  // process standard snippets: highlight plain text
  standardSnippets.forEach(([key, variable]) => {
    if (snippets[key] !== undefined) {
      card[key] = getHighlightSegments({ text: snippets[key] })
    } else card[key] = variable
  })

  // process link list snippets: highlight and turn into hyperlinked text
  linkListSnippets.forEach(([key, variable, linkTextField]) => {
    if (snippets[key] !== undefined) {
      // assume id is link field
      const linkIdField = 'id'

      // get link list entry text
      const linkListEntries = variable.map(d => {
        const matchingSnippet = snippets[key].find(dd => dd.id === d.id)

        // if a snippet was found for the linked instance, highlight its name
        if (matchingSnippet) {
          return {
            onClick: () => console.log(d[linkIdField]), // TODO
            text: getHighlightSegments({
              text: matchingSnippet[linkTextField],
              type: 'small',
            }),
          }
        } else {
          // return normal text if no highlight
          return {
            onClick: () => console.log(d[linkIdField]), // TODO
            text: d[linkTextField],
          }
        }
      })

      // collate link entry text into a list of links
      card[key] = linkListEntries.map(d => (
        <div onClick={d.onClick} className={styles.link}>
          {d.text}
        </div>
      ))
    } else {
      card.authors = authors.map(d => (
        <div onClick={() => console.log(d.id)} className={styles.link}>
          {d.authoring_organization}
        </div>
      ))
    }
  })

  // TODO thsi iframe code for preview:
  // <iframe
  //   src={`${API_URL}/get/file?id=${files[0].id}`}
  //   height="200"
  //   width="300"
  // ></iframe>
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

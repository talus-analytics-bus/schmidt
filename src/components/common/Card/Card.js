// 3rd party packages
import React, { useState } from 'react'
import classNames from 'classnames'

// assets and styles
import styles from './card.module.scss'

// local components
import { PrimaryButton } from '../'

// local utility functions
import { formatDate, isEmpty } from '../../misc/Util'

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
  description,
  date,
  authors,
  funders,
  key_topics,
  files,
  snippets = {},
  filters = {},
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
  const getHighlightSegments = ({ text, type = 'normal', maxWords = null }) => {
    // replace text within highlight tags with JSX
    const textArr = text
      .replace(/<\/highlight>/g, '<highlight>')
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

    // if max words provided, trim
    let pre, post, highlighted
    let nWords = 0
    if (maxWords) {
      const trimmedText = []
      const halfMax = maxWords / 2
      let done = false
      let i = 0
      while (!done && i < newText.length) {
        const frag = newText[i]

        if (pre === undefined) {
          // get first words of first fragment
          const preWordsAll = frag.props.children.split(' ')
          const preWordsTrimmed = preWordsAll.slice(
            Math.max(preWordsAll.length - halfMax, 0),
            preWordsAll.length
          )

          const ellipsis = Math.max(preWordsAll.length - halfMax, 0) !== 0
          pre = `"${ellipsis ? '...' : ''}${preWordsTrimmed.join(' ')}`
          nWords += preWordsTrimmed.length
          trimmedText.push(<span>{pre} </span>)
        } else if (highlighted === undefined) {
          highlighted = frag
          trimmedText.push(highlighted)
        } else if (post === undefined) {
          const wordsAll = frag.props.children.split(' ')
          const wordsTrimmed = wordsAll.slice(0, halfMax)

          const ellipsis = wordsTrimmed.length !== wordsAll.length
          post = ` ${wordsTrimmed.join(' ')}${ellipsis ? '...' : ''}"`
          nWords += wordsTrimmed.length
          trimmedText.push(<span>{post}</span>)
        }
        done =
          pre !== undefined && post !== undefined && highlighted !== undefined
        i += 1
        continue
      }
      return trimmedText
    } else return newText
  }

  // if snippets are provided, then scan them and use them
  // standard snippets are plain text (not hyperlinks)
  const standardSnippets = [['title', title]]

  // trimmed snippets should only have a few words around the first highlighted
  // word displayed
  const trimmedSnippets = [['description', description]]

  // link list snippets are author names, etc. that when clicked do something
  const linkListSnippets = [
    ['authors', authors, 'authoring_organization'],
    ['funders', funders, 'name'],
  ]

  // process standard snippets: highlight plain text
  standardSnippets.forEach(([key, variable]) => {
    if (snippets[key] !== undefined) {
      card[key] = getHighlightSegments({ text: snippets[key] })
    } else card[key] = variable
  })

  // process trimmed snippets: highlight plain text and then trim
  trimmedSnippets.forEach(([key, variable]) => {
    if (snippets[key] !== undefined) {
      card[key] = getHighlightSegments({ text: snippets[key], maxWords: 20 })
    } else card[key] = null
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

  // if (!isEmpty(snippets)) {
  //   console.log('snippets')
  //   console.log(snippets)
  // }

  // process tag snippets
  const pdfMatch = snippets['files'] !== undefined
  const tagSnippets = []
  if (pdfMatch) {
    tagSnippets.push(
      <div className={styles.tagSnippet}>
        <i className={'material-icons'}>picture_as_pdf</i>
        <div className={styles.iconSnippet}>{snippets.files}</div>
      </div>
    )
  }

  // key topic match?
  if (key_topics.length > 0) {
    const keyTopicsJsxTmp = []
    const keyTopicsFilters =
      filters.key_topics !== undefined ? filters.key_topics : []
    key_topics.forEach(d => {
      if (keyTopicsFilters.includes(d)) {
        keyTopicsJsxTmp.push(
          <span className={classNames(styles.highlighted, styles.small)}>
            {d}
          </span>
        )
      } else {
        keyTopicsJsxTmp.push(<>{d}</>)
      }
    })

    // add bullet chars
    const needsBulletChars = keyTopicsJsxTmp.length > 1
    const keyTopicsJsx = needsBulletChars ? [] : keyTopicsJsxTmp
    if (needsBulletChars)
      keyTopicsJsxTmp.forEach((d, i) => {
        keyTopicsJsx.push(d)
        if (i !== keyTopicsJsxTmp.length - 1) keyTopicsJsx.push(' • ')
      })

    tagSnippets.push(
      <div className={styles.tagSnippet}>
        <i className={'material-icons'}>device_hub</i>
        <div className={styles.iconSnippet}>{keyTopicsJsx}</div>
      </div>
    )
  }

  // funder match?
  const funderMatch = snippets['funders'] !== undefined
  if (funderMatch) {
    tagSnippets.push(
      <div className={styles.tagSnippet}>
        <i className={'material-icons'}>payments</i>
        <div className={styles.iconSnippet}>{card.funders}</div>
      </div>
    )
  }

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
          <div className={styles.descriptionSnippet}>{card.description}</div>
          {tagSnippets.length > 0 && (
            <div className={styles.tagSnippets}>{tagSnippets}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card

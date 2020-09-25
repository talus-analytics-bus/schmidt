// 3rd party packages
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import axios from 'axios'

// assets and styles
import styles from './card.module.scss'

// local components
import { PrimaryButton, BookmarkToggle } from '../'
import Panel from '../../Detail/content/Panel'

// local utility functions
import {
  formatDate,
  isEmpty,
  bytesToMegabytes,
  removeBookmark,
  iconNamesByField,
  getIconByName,
} from '../../misc/Util'

// constants
const API_URL = process.env.GATSBY_API_URL
const S3_URL = process.env.GATSBY_S3_URL

/**
 * @method Card
 */
export const Card = ({
  resultNumber,
  id,
  idx = 0,
  type_of_record,
  title,
  description,
  date,
  authors,
  funders,
  key_topics,
  events,
  files,
  snippets = {},
  filters = {},
  onViewDetails = () => '',
  detail = false,
  related = false,
  setBookmarkedIds = () => '',
  bookmarkedIds = [],
  animate = false,
  ...props
}) => {
  // STATE
  // card's left css property
  const [left, setLeft] = useState(detail || related ? 0 : 20)

  // image
  const [thumbnail, setThumbnail] = useState(null)

  // EFFECT HOOKS
  // animate card entrances -- any card that changes position in the order
  // or is new to the list will fly in
  useEffect(() => {
    if (!detail && !related) {
      if (left === 0) {
        setLeft(20)
      }
      setTimeout(() => setLeft(0), 100 * idx)
    }
  }, [idx])

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
    // replace text within highlight tags with JSX, taking care not to
    // introduce extra spaces before or after the highlighted words
    const textArr = text
      .replace(/<\/highlight>/g, '<highlight>')
      .replace(/"/g, "'")
      .split('<highlight>')
    const firstFewFrags = text.split(/<\/?highlight>/g).slice(0, 3)

    // was there a space after the last highlighted word? If so, don't trim it
    const firstFewStr = `${firstFewFrags[0]}<highlight>${firstFewFrags[1]}</highlight>${firstFewFrags[2]}`

    // check whether we need to trim extra spaces out of the final string
    const trimPost = /\/highlight>(?!\s)/g.test(firstFewStr)
    const trimPre = !/(?=\s)\s<highlight>/g.test(firstFewStr)

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
    let plainString = ''
    let nWords = 0
    if (maxWords !== null) {
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

          // add ellipsis only if fragment is the very beginning or end of text
          const ellipsis = Math.max(preWordsAll.length - halfMax, 0) !== 0
          pre = `"${ellipsis ? '...' : ''}${preWordsTrimmed.join(' ')}`
          nWords += preWordsTrimmed.length
          trimmedText.push(<span>{trimPre ? pre.trim() : pre}</span>)
        } else if (highlighted === undefined) {
          highlighted = frag
          trimmedText.push(highlighted)
        } else if (post === undefined) {
          const wordsAll = frag.props.children.split(' ')
          const wordsTrimmed = wordsAll.slice(0, halfMax)

          const ellipsis = wordsTrimmed.length !== wordsAll.length
          post = ` ${wordsTrimmed.join(' ')}${ellipsis ? '...' : ''}"`
          nWords += wordsTrimmed.length
          trimmedText.push(<span>{trimPost ? post.trim() : post}</span>)
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

  // tag snippet fields: always shown, and will be highlighted if match
  const tagFields = [
    ['key_topics', key_topics],
    ['events', events, 'name', 'event.name'],
  ]

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
    } else {
      if (key === 'description' && detail) {
        card[key] = variable || 'Description not yet available for this item'
      } else card[key] = null
    }
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
      card[key] = variable.map(d => (
        <div onClick={() => console.log(d.id)} className={styles.link}>
          {d[linkTextField]}
        </div>
      ))
    }
  })

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

  // standard tag snippet fields

  // key topic match?
  tagFields.forEach(([key, variable, linkTextField, filterKey = key]) => {
    // get func for getting variable instance values
    const getVal = linkTextField !== undefined ? v => v[linkTextField] : v => v
    if (variable.length > 0) {
      const keyTopicsJsxTmp = []

      const keyTopicsFilters =
        filters[filterKey] !== undefined ? filters[filterKey] : []
      variable.forEach(d => {
        if (keyTopicsFilters.includes(getVal(d))) {
          keyTopicsJsxTmp.push(
            <span className={classNames(styles.highlighted, styles.small)}>
              {getVal(d)}
            </span>
          )
        } else {
          keyTopicsJsxTmp.push(<>{getVal(d)}</>)
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

      const icon = getIconByName({ iconName: iconNamesByField[key], styles })
      tagSnippets.push(
        <div className={styles.tagSnippet}>
          <i className={'material-icons'}>{icon}</i>
          <div className={styles.iconSnippet}>{keyTopicsJsx}</div>
        </div>
      )
    }
  })

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

  // JSX
  return (
    <div
      style={{ left }}
      onClick={e => {
        e.stopPropagation()
        onViewDetails({ newId: id, related })
      }}
      className={classNames(styles.card, { [styles.detail]: detail })}
    >
      <div className={styles.col}>
        <div className={styles.resultNumber}>{resultNumber}</div>
      </div>
      <div className={classNames(styles.col, styles.thumbnailCol)}>
        {files.length > 0 && (
          <div className={styles.thumbnail}>
            <img
              key={files[0].id}
              src={`${S3_URL}/${files[0].s3_filename}_thumb`}
            />
          </div>
        )}
        {files.length === 0 && (
          <div className={classNames(styles.thumbnail, styles.placeholder)}>
            Preview unavailable
          </div>
        )}
        {
          // Show preview button under thumbnail on details page
          detail && files.length > 0 && (
            <PrimaryButton
              {...{
                label: 'Preview',
                iconName: 'preview',
                isSecondary: true,
              }}
            />
          )
        }
      </div>
      <div className={styles.col}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.type}>{type_of_record}</div>
            {bookmarkedIds !== null && (
              <BookmarkToggle
                {...{
                  add: !bookmarkedIds.includes(id),
                  isSecondary: true,
                  bookmarkedIds,
                  setBookmarkedIds,
                  id,
                  simple: true,
                }}
              />
            )}
          </div>
          <div className={styles.title}>
            <div className={styles.text}>
              {title !== '' ? card.title : 'Untitled'}
            </div>
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
                {...{
                  label: 'View details',
                  iconName: 'read_more',
                  onClick: () => onViewDetails(id),
                }}
              />
            </div>
          </div>
          <div className={styles.descriptionSnippet}>{card.description}</div>
          {tagSnippets.length > 0 && (
            <div className={styles.tagSnippets}>{tagSnippets}</div>
          )}
          {detail && (
            <div className={styles.downloads}>
              <Panel
                {...{
                  title: 'Downloads',
                  secondary: false,
                  iconName: 'get_app',
                }}
              >
                {files.map(({ id, num_bytes, filename }) => (
                  <div className={styles.downloadItem}>
                    {
                      // <i className={'material-icons'}>picture_as_pdf</i>
                    }
                    <PrimaryButton
                      {...{
                        label: filename,
                        isLink: true,
                        urlIsExternal: true,
                        url: `${API_URL}/get/file/${filename}?id=${id}`,
                        // onClick: () => {
                        //   if (typeof window !== 'undefined') {
                        //     window.open.assign(`${API_URL}/get/file?id=${id}`)
                        //   }
                        // },
                      }}
                    />
                    {<span>{bytesToMegabytes(num_bytes)}</span>}
                  </div>
                ))}
                {files.length === 0 && <div>None</div>}
              </Panel>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card

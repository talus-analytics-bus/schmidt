// 3rd party packages
import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import classNames from 'classnames'
import axios from 'axios'

// assets and styles
import styles from './card.module.scss'

// local components
import { PrimaryButton, BookmarkToggle, ShowMore, PreviewOverlay } from '../'
import Panel from '../../Detail/content/Panel'

// local utility functions
import {
  formatDate,
  isEmpty,
  bytesToMegabytes,
  removeBookmark,
  iconNamesByField,
  getIconByName,
  asBulletDelimitedList,
  toggleFilter,
  getHighlightSegments,
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
  setFilters = () => '',
  onViewDetails = () => '',
  detail = false,
  related = false,
  bookmark = false,
  setBookmarkedIds = () => '',
  bookmarkedIds = [],
  animate = false,
  getTooltipText = null,
  ...props
}) => {
  // STATE
  // card's left css property
  const [left, setLeft] = useState(detail || related ? 0 : 20)

  // show preview or hide?
  const [showPreview, setShowPreview] = useState(false)

  // image
  const [thumbnail, setThumbnail] = useState(null)

  // CONSTANTS
  // get array of bookmark ids
  const bookmarkedIdsArr =
    typeof bookmarkedIds === 'string' ? bookmarkedIds.split(',') : bookmarkedIds

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
    // rebuild tooltips when things change
    ReactTooltip.rebuild()
  }, [idx])

  // define obj to hold card text, including highlighted snippets, if any
  const card = { show: {} }

  // if snippets are provided, then scan them and use them
  // standard snippets are plain text (not hyperlinks)
  const standardSnippets = [['title', title]]

  // trimmed snippets should only have a few words around the first highlighted
  // word displayed
  const trimmedSnippets = [['description', description]]

  // process standard snippets: highlight plain text
  standardSnippets.forEach(([key, variable]) => {
    if (snippets[key] !== undefined) {
      card[key] = getHighlightSegments({
        text: snippets[key],
        getTooltipText,
        styles,
      })
    } else card[key] = variable
  })

  // process trimmed snippets: highlight plain text and then trim
  trimmedSnippets.forEach(([key, variable]) => {
    if (snippets[key] !== undefined) {
      card[key] = getHighlightSegments({
        text: snippets[key],
        getTooltipText,

        maxWords: 20,
        styles,
      })
    } else {
      if (key === 'description' && detail) {
        card[key] = variable || 'Description not yet available for this item'
      } else
        card[key] = (
          <ShowMore key={id + '-text'} text={variable} charLimit={200} />
        )
    }
  })
  // process link list snippets: highlight and turn into hyperlinked text
  // link list snippets are author names, etc. that when clicked do something
  const linkListSnippets = [
    ['authors', authors, 'authoring_organization', 'author.id', 'id'],
    [
      'author_types',
      authors,
      'type_of_authoring_organization',
      'author.type_of_authoring_organization',
      'type_of_authoring_organization',
    ],
    ['funders', funders, 'name', 'funder.name'],
    ['events', events, 'name', 'event.name', 'name'],
    ['key_topics', key_topics],
    ['types_of_record', [type_of_record], undefined, 'type_of_record'],
  ]

  // collate tag snippets to show why search results were shown
  const tagSnippets = []

  // iterate over filter categories that should be shown as highlighted
  // text matches
  linkListSnippets.forEach(
    ([
      key,
      variable,
      linkTextField = undefined,
      filterKey = key,
      filterField = linkTextField,
    ]) => {
      // func for getting value from datum
      const getVal = linkTextField ? v => v[linkTextField] : v => v
      const getFilterVal = filterField ? v => v[filterField] : v => v

      // assume id is link field
      const linkIdField = 'id'

      // get link list entry text
      const alreadySeenList = []
      const linkListEntries = variable
        .map(d => {
          const filterValues = filters[filterKey]
          const matchingTagExists =
            filterValues !== undefined
              ? filterValues.find(
                  fv => fv === getFilterVal(d) || +fv === getFilterVal(d)
                )
              : undefined
          const matchingTag = matchingTagExists ? getVal(d) : undefined

          const matchingSearchSnippet =
            snippets[key] !== undefined
              ? snippets[key].find(dd => dd.id === d.id)
              : undefined

          const matchingSnippet =
            matchingTag ||
            (matchingSearchSnippet !== undefined
              ? getVal(matchingSearchSnippet)
              : undefined)

          // if a snippet was found for the linked instance, highlight its name
          const alreadySeen = alreadySeenList.includes(getVal(d))
          if (alreadySeen) return null
          else {
            alreadySeenList.push(getVal(d))

            if (matchingSnippet) {
              card.show[filterKey] = true
              return {
                onClick: e =>
                  toggleFilter({
                    e,
                    openNewPage: bookmark,
                    datum: d,
                    getFilterVal,
                    filters,
                    filterKey,
                    setFilters,
                  }),
                text: getHighlightSegments({
                  getTooltipText,
                  text: matchingSnippet,
                  type: 'small',
                  highlightAll: matchingTag !== undefined,
                  styles,
                }),
              }
            } else {
              // return normal text if no highlight
              return {
                onClick: e =>
                  toggleFilter({
                    e,
                    openNewPage: bookmark,

                    datum: d,
                    getFilterVal,
                    filters,
                    filterKey,
                    setFilters,
                  }),

                text: (
                  <span
                    data-for={'searchHighlightInfo'}
                    data-tip={getTooltipText && getTooltipText('add')}
                  >
                    {getVal(d)}
                  </span>
                ),
              }
            }
          }
        })
        .filter(d => d !== null)

      // collate link entry text into a list of links
      card[filterKey] = linkListEntries
        .map(d => (
          <span onClick={d.onClick} className={styles.link}>
            {d.text}
          </span>
        ))
        .map(asBulletDelimitedList)

      // if showing, collate info JSX, unless special
      if (
        card.show[filterKey] &&
        key !== 'authors' &&
        key !== 'types_of_record'
      ) {
        tagSnippets.push(
          <div className={styles.tagSnippet}>
            {getIconByName({ iconName: iconNamesByField[key], styles })}
            <div className={styles.iconSnippet}>{card[filterKey]}</div>
          </div>
        )
      }
    }
  )

  // process tag snippets
  const pdfMatch = snippets['files'] !== undefined
  if (pdfMatch) {
    tagSnippets.push(
      <div className={styles.tagSnippet}>
        <i className={'material-icons'}>picture_as_pdf</i>
        <div className={styles.iconSnippet}>{snippets.files}</div>
      </div>
    )
  }

  // JSX
  return (
    <div className={styles.cardContainer}>
      <PreviewOverlay {...{ id, files, showPreview, setShowPreview }} />
      <div
        style={{ left }}
        onClick={e => {
          e.stopPropagation()
          onViewDetails({ newId: id, related })
        }}
        className={classNames(styles.card, {
          [styles.detail]: detail,
          [styles.frozen]: showPreview,
        })}
      >
        <div
          style={{ width: resultNumber !== null ? '' : 0 }}
          className={styles.col}
        >
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
                  onClick: e => {
                    e.stopPropagation()
                    e.preventDefault()
                    setShowPreview(true)
                  },
                }}
              />
            )
          }
        </div>
        <div className={styles.col}>
          <div className={styles.main}>
            <div className={styles.header}>
              <div className={styles.type}>{card.type_of_record}</div>
              {bookmarkedIds !== null && (
                <BookmarkToggle
                  {...{
                    key: id,
                    add: !bookmarkedIdsArr.includes(+id),
                    isSecondary: true,
                    bookmarkedIds: bookmarkedIdsArr,
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
                  <div className={styles.authOrgList}>
                    {authors.length > 0 && card['author.id']}
                    {authors.length === 0 && (
                      <div>Authoring organization unavailable</div>
                    )}
                  </div>
                </div>
                <div className={styles.date}>
                  <i className={'material-icons'}>event</i>
                  {date !== null && (
                    <span
                      className={classNames(styles.small, {
                        [styles.highlighted]: filters.years !== undefined,
                      })}
                    >
                      {formatDate(date)}
                    </span>
                  )}
                  {date === null && <span>Date unavailable</span>}
                </div>
              </div>
              <div className={styles.actions}>
                {files.length > 0 && (
                  <PrimaryButton
                    {...{
                      label: 'Preview',
                      iconName: 'preview',
                      isSecondary: true,
                      onClick: e => {
                        e.stopPropagation()
                        e.preventDefault()
                        setShowPreview(true)
                      },
                    }}
                  />
                )}
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
                      <span
                        data-for={'searchHighlightInfo'}
                        data-tip={'Click to download this file'}
                      >
                        <PrimaryButton
                          {...{
                            label: filename,
                            isLink: true,
                            urlIsExternal: true,
                            url: `${API_URL}/get/file/${filename.replace(
                              /\?/g,
                              ''
                            )}?id=${id}`,
                          }}
                        />
                      </span>
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
    </div>
  )
}

export default Card

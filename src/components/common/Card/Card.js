// 3rd party packages
import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import classNames from 'classnames'
import { navigate } from 'gatsby'

// assets and styles
import styles from './card.module.scss'
import logoIcon from '../../../assets/images/logo-icon.svg'

// local components
import {
  PrimaryButton,
  BookmarkToggle,
  ShowMore,
  PreviewOverlay,
  InfoTooltip,
} from '../'

// local utility functions
import {
  formatDate,
  bytesToMegabytes,
  iconNamesByField,
  getIconByName,
  asBulletDelimitedList,
  toggleFilter,
  getHighlightSegments,
} from '../../misc/Util'
import FileDownloadList from './FileDownloadList'

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
  date_type,
  authors,
  sub_organizations,
  funders,
  key_topics,
  covid_tags,
  events,
  files,
  why = [],
  snippets = {},
  filters = {},
  setFilters = () => '',
  setSearchText,
  onViewDetails = () => navigate('/detail/?id=' + id),
  floating = false,
  detail = false,
  related = false,
  single = false,
  bookmark = false,
  setBookmarkedIds = () => '',
  bookmarkedIds = [],
  animate = false,
  getTooltipText = null,
  alwaysStartNew,
  browse = false,
  exclude_pdf_from_site,
  link,
  internal_research_note,
  ...props
}) => {
  // CONSTANTS
  const openNewPage = bookmark || single || browse

  // show link button if PDF is flagged as excluded
  // or if the tool type is 'Technical guidance / Tool'
  const showLinkButton =
    (type_of_record === 'Technical guidance / Tool' && link) ||
    (exclude_pdf_from_site === true && link)

  const linkButtonProps = {
    label: 'Go to link',
    iconName: 'link',
    urlIsExternal: true,
    url: link,
    tooltip: link,
    onClick: e => {
      e.stopPropagation()
    },
  }

  // STATE
  // card's left css property
  const [left, setLeft] = useState(detail || related || browse ? 0 : 20)

  // show preview or hide?
  const [showPreview, setShowPreview] = useState(false)

  // CONSTANTS
  // get array of bookmark ids
  const bookmarkedIdsArr =
    typeof bookmarkedIds === 'string' ? bookmarkedIds.split(',') : bookmarkedIds

  // EFFECT HOOKS
  // animate card entrances -- any card that changes position in the order
  // or is new to the list will fly in
  useEffect(() => {
    if (!detail && !related && !browse) {
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
        key,
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
    [
      'key_topics',
      key_topics !== undefined
        ? key_topics.map(d => {
            return { name: d, id: d }
          })
        : [],
      'name',
    ],
    [
      'covid_tags',
      covid_tags !== undefined
        ? covid_tags.map(d => {
            return { name: d, id: d }
          })
        : [],
      'name',
    ],
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
      // skip blanks
      if (key === 'types_of_record' && variable[0] === '') {
        card.types_of_record = null
        return
      }

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
              ? snippets[key].find(
                  dd =>
                    dd.id === d.id || dd.id === d || dd.id === d[linkTextField]
                )
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
                    datum: d,
                    e,
                    openNewPage,
                    getFilterVal,
                    filters,
                    filterKey,
                    setFilters,
                    setSearchText,
                    alwaysStartNew,
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
                    datum: d,
                    e,
                    openNewPage,
                    getFilterVal,
                    filters,
                    filterKey,
                    setFilters,
                    setSearchText,
                    alwaysStartNew,
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
          <span
            key={d.text}
            onClick={d.onClick}
            className={styles.link}
            data-for={'searchHighlightInfo'}
            data-tip={getTooltipText && getTooltipText('add')}
          >
            {d.text}
          </span>
        ))
        .map(asBulletDelimitedList)

      // for matching publishing org type, need to grab special blue icon
      let iconName
      if (key == 'author_types') {
        iconName = 'outbreak_events_blue'
      } else {
        iconName = iconNamesByField[key]
      }
      // if showing, collate info JSX, unless special
      if (
        card.show[filterKey] &&
        key !== 'authors' &&
        key !== 'types_of_record'
      ) {
        tagSnippets.push(
          <div className={styles.tagSnippet}>
            {getIconByName({ iconName, styles })}
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

  // if item type is not defined, make it "Item"
  if (
    card.type_of_record === '' ||
    card.type_of_record === undefined ||
    card.type_of_record === null
  ) {
    card.type_of_record = 'Document'
  }

  // JSX
  return (
    <div className={styles.cardContainer}>
      <PreviewOverlay {...{ id, title, files, showPreview, setShowPreview }} />
      <div
        style={{ left }}
        onClick={e => {
          e.stopPropagation()
          onViewDetails({ newId: id, related })
        }}
        className={classNames(styles.card, {
          [styles.detail]: detail,
          [styles.bookmark]: bookmark,
          [styles.related]: related,
          [styles.frozen]: showPreview,
        })}
      >
        <div
          style={{ width: resultNumber !== null ? '' : 0 }}
          className={classNames(styles.col, styles.resultNumberCol)}
        >
          <div className={styles.resultNumber}>{resultNumber}</div>
        </div>
        <div className={classNames(styles.col, styles.thumbnailCol)}>
          {files.length > 0 && files[0].has_thumb && (
            <div className={styles.thumbnail}>
              <img
                key={files[0].id}
                src={`${S3_URL}/${files[0].s3_filename}_thumb`}
              />
            </div>
          )}
          {(files.length === 0 || !files[0].has_thumb) && (
            <div className={classNames(styles.thumbnail, styles.placeholder)}>
              {title.charAt(0)}
              <img src={logoIcon} />
            </div>
          )}
          {
            // Show preview button under thumbnail on details page
            detail && files.length > 0 && (
              <div className={styles.buttons}>
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
                {files.length > 0 && (
                  <PrimaryButton
                    {...{
                      label: `Open and download (${bytesToMegabytes(
                        files[0].num_bytes
                      )})`,
                      url: `${API_URL}/get/file/${title.replace(
                        /\?/g,
                        ''
                      )}?id=${files[0].id}`,
                      urlIsExternal: true,
                      iconName: 'get_app',
                      isSecondary: false,
                    }}
                  />
                )}
                {files.length > 1 && (
                  <FileDownloadList
                    label={
                      <span>
                        Additional files ({files.length - 1}){' '}
                        <InfoTooltip
                          id={'FileDownloadListInfo'}
                          text={
                            'Related documents such as hearing opening' +
                            ' statements and testimonies'
                          }
                        />
                      </span>
                    }
                    files={files.slice(1, files.length)}
                    baseURL={`${API_URL}/get/file/${title.replace(/\?/g, '')}`}
                  />
                )}
              </div>
            )
          }
          {
            // Show external link button if PDF is not licensed to be
            // distributed
            detail && showLinkButton && (
              <PrimaryButton {...{ ...linkButtonProps }} />
            )
          }
          {
            // Show preview button under thumbnail on details page
            detail && !showLinkButton && files.length === 0 && (
              <div className={styles.noData}>Preview unavailable</div>
            )
          }
          {detail &&
            !showLinkButton &&
            (exclude_pdf_from_site || files.length === 0) && (
              <PrimaryButton
                {...{
                  label: `not available for download`,
                  disabled: true,
                  iconName: 'get_app',
                  isSecondary: true,
                }}
              />
            )}
        </div>
        <div className={classNames(styles.col, styles.contentCol)}>
          <div className={styles.main}>
            <div className={styles.top}>
              <div className={styles.headerAndTitle}>
                {!detail && (
                  <div className={styles.header}>
                    {card.type_of_record !== '' && (
                      <div className={styles.type}>{card.type_of_record}</div>
                    )}
                  </div>
                )}
                <div className={styles.title}>
                  <div
                    className={classNames(styles.text, {
                      [styles.noTopMargin]: detail,
                    })}
                  >
                    {title !== '' ? card.title : 'Untitled'}
                  </div>
                </div>
              </div>
              <div className={styles.quickActions}>
                {bookmarkedIds !== null && (
                  <BookmarkToggle
                    {...{
                      keyName: id,
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
            </div>

            <div className={styles.detailsAndDownloads}>
              <div className={styles.details}>
                {detail && sub_organizations !== '' && (
                  <div className={styles.authOrg}>
                    <i className={'material-icons'}>person</i>
                    <div className={styles.authorList}>{sub_organizations}</div>
                  </div>
                )}
                <div className={styles.authOrg}>
                  <i className={'material-icons'}>apartment</i>
                  <div className={styles.authOrgList}>
                    {authors.length > 0 && card['author.id']}
                    {authors.length === 0 && (
                      <div>Publishing organization unavailable</div>
                    )}
                  </div>
                </div>
                <div className={styles.date}>
                  <i className={'material-icons'}>event</i>
                  {date !== null && (
                    <span className={classNames(styles.small)}>
                      {
                        // for records tagged in Airtable with "YEAR", the month isn't necessarily accurate so we want to hide the month and only show the year
                        formatDate(date, date_type)
                      }
                    </span>
                  )}
                  {date === null && <span>Date unavailable</span>}
                </div>
              </div>
              {/* {detail && files.length > 0 && (
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
                        <i className={'material-icons'}>picture_as_pdf</i>
                        <div
                          data-for={'searchHighlightInfo'}
                          data-tip={'Click to download this file'}
                        >
                          <a
                            target={'_blank'}
                            rel="noreferrer"
                            href={`${API_URL}/get/file/${title.replace(
                              /\?/g,
                              ''
                            )}?id=${id}`}
                          >
                            <div>
                              {filename}{' '}
                              <span className={styles.noBreak}>
                                ({bytesToMegabytes(num_bytes)})
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </Panel>
                </div>
              )} */}
            </div>
            {description !== '' && (
              <div className={styles.descriptionSnippet}>
                <div className={styles.description}>{card.description}</div>
              </div>
            )}
            {
              // reasons related
              related && (
                <div className={styles.why}>
                  {why.map(asBulletDelimitedList)}
                </div>
              )
            }
            {!detail && !related && !browse && tagSnippets.length > 0 && (
              <div
                className={classNames(styles.tagSnippets, {
                  [styles.topBorder]: description !== '',
                })}
              >
                <div className={styles.tagSnippetsHeader}>
                  Matching filters:
                </div>
                {tagSnippets}
              </div>
            )}
            <div className={styles.actions}>
              {!detail && showLinkButton && (
                <PrimaryButton {...{ ...linkButtonProps, isSecondary: true }} />
              )}
              {!detail && files.length > 0 && (
                <>
                  <div className={styles.previewButton}>
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
                  </div>
                  <div className={styles.mobilePreviewButton}>
                    <PrimaryButton
                      {...{
                        label: 'Open PDF',
                        iconName: 'launch',
                        isSecondary: true,
                        urlIsExternal: true,
                        url: `${API_URL}/get/file/${title.replace(
                          /\?/g,
                          ''
                        )}?id=${files[0].id}`,
                        onClick: e => {
                          e.stopPropagation()
                        },
                      }}
                    />
                  </div>
                </>
              )}
              {!detail && (
                <div>
                  <PrimaryButton
                    {...{
                      label: 'View details',
                      iconName: 'read_more',
                      onClick: () => onViewDetails(id),
                    }}
                  />
                </div>
              )}
              {!detail && !floating && (
                <PrimaryButton
                  {...{
                    label: 'Open in new tab',
                    iconName: 'launch',
                    url: `/detail/?id=${id}`,
                    urlIsExternal: true,
                    onClick: e => {
                      e.stopPropagation()
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

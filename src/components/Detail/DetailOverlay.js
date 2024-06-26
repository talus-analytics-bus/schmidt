// 3rd party components
import React, { useState, useEffect, useRef, useContext } from 'react'
import classNames from 'classnames'

// local components
import {
  Card,
  CardList,
  // InfoTooltip,
  Paginator,
  PrimaryButton,
} from '../../components/common'
import Panel from './content/Panel'
import { appContext } from '../../components/misc/ContextProvider'
import useTooltipDefs from '../../hooks/useTooltipDefs'

// local utility functions
import ItemQuery from '../../components/misc/ItemQuery'
import {
  asBulletDelimitedList,
  toggleFilter,
  getHighlightSegments,
  getTooltipTextFunc,
  execute,
  iconNamesByField,
  getIconByName,
} from '../../components/misc/Util'

// styles and assets
import styles from './detailoverlay.module.scss'
import ReactTooltip from 'react-tooltip'

const DetailOverlay = ({
  // item data
  id = 1,
  // other data
  filters = {},
  setFilters = () => '',
  setSearchText = () => '',
  floating = false,
  close = () => '',
  origScrollY = 0,
  onViewDetails,
  onLoaded = () => '',
  bookmarkedIds = [],
  setBookmarkedIds = () => '',
  simpleHeaderRef = { current: null },
  bookmark = false,
  setPageTitle,
  browse = false,
}) => {
  // CONTEXT
  const context = useContext(appContext)

  // HOOKS
  const tooltipDefs = useTooltipDefs(context)

  // opacity control
  const [opacity, setOpacity] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // current page and pagesize of paginator
  const [curPage, setCurPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)

  // item and related items data
  const itemKey = `${id}-${pagesize}-${curPage}`
  const initItem =
    context?.data?.items !== undefined ? context?.data?.items[itemKey] : null
  const initItemData = initItem ? initItem.data : null
  const initRelatedItemsData = initItem ? initItem : null
  const [itemData, setItemData] = useState(initItemData)

  // const geo_specificity =
  //   itemData === null
  //     ? null
  //     : (itemData.geo_specificity === 'US'
  //         ? 'United States of America'
  //         : itemData.geo_specificity) || null

  const [relatedItemsData, setRelatedItemsData] = useState(initRelatedItemsData)

  // CONSTANTS
  // open new page if metadata tag is clicked?
  const single = !floating
  const openNewPage = bookmark || single || browse

  // define start / end result numbers
  const start =
    relatedItemsData !== null
      ? relatedItemsData.page * pagesize - pagesize + 1
      : 1

  // function called when floating overlay is dismissed
  const dismissFloatingOverlay = () => {
    if (typeof window !== undefined) {
      window.scrollTo(0, origScrollY)
    }
    setOpacity(0)
    setTimeout(close, 250)
  }
  // author fields
  const authorFields = [
    { field: 'type_of_authoring_organization', name: 'Type', link: true },
    {
      formatter: d => {
        if (d.if_national_country_of_authoring_org === undefined)
          return undefined
        const flag =
          d.if_national_iso2_of_authoring_org !== null ? (
            <img
              key={d.if_national_iso2_of_authoring_org}
              src={
                `https://flags.talusanalytics.com/shiny_100px/` +
                `${d.if_national_iso2_of_authoring_org.toLowerCase()}.png`
              }
            />
          ) : null
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {flag}
            {d.if_national_country_of_authoring_org || 'International'}
          </span>
        )
      },
      field: 'if_national_country_of_authoring_org',
      name: 'Location',
    },
  ]

  // FUNCTIONS
  // get tooltip text depending on type of card
  const getTooltipText = getTooltipTextFunc({
    detail: true,
    bookmark,
    related: true,
  })

  // highlight metadata tag if filtered
  const highlightTag = ({ displayName, filterValue, filterKey }) => {
    return (
      <span
        key={[displayName, filterValue, filterKey].join('__')}
        onClick={e =>
          toggleFilter({
            e,
            getFilterVal: () => filterValue,
            filters,
            filterKey,
            openNewPage,
            setFilters: v => {
              dismissFloatingOverlay()
              setFilters(v)
            },
            setSearchText,
            alwaysStartNew: true,
          })
        }
        className={styles.link}
      >
        {getHighlightSegments({
          text: displayName,
          getTooltipText,
          highlightAll:
            filters !== undefined &&
            filters[filterKey] !== undefined &&
            filters[filterKey].includes(filterValue),
          styles,
        })}
      </span>
    )
  }
  // get item data
  const getData = async () => {
    if (id === false || id === 'false') return
    else {
      const queries = {}

      // if item has been loaded before, use that data, otherwise get interval
      const itemKey = `${id}-${pagesize}-${curPage}`
      const getItem = context?.data?.items[itemKey] === undefined
      if (getItem)
        queries.itemData = ItemQuery({
          id,
          pagesize,
          page: curPage,
        })

      // // get filter counts if not yet retrieved
      // const getFilterCounts = context.data.filterCounts === undefined
      // if (getFilterCounts) {
      //   queries.filterCountsQuery = axios.get(`${API_URL}/get/filter_counts`)
      // }
      const results = await execute({ queries })

      let newContextData = { ...context.data }

      if (getItem) {
        const item = results.itemData.data

        setItemData(item.data)
        setRelatedItemsData(results.itemData.data)
        newContextData = {
          ...newContextData,
          items: { ...context?.data?.items, [itemKey]: { ...item } },
        }
      } else {
        setItemData(context?.data?.items[itemKey].data)
        setRelatedItemsData(context?.data?.items[itemKey])
      }

      // if getting filter counts set them, or return them if already set
      // if (getFilterCounts) {
      //   const filterCounts = results.filterCountsQuery.data.data
      //   setKeyTopics(filterCounts.key_topics.by_value.map(d => d[0]) || [])
      //   newContextData = {
      //     ...newContextData,
      //     filterCounts,
      //   }
      // }
      // else {
      //   setKeyTopics(
      //     context.data.filterCounts.key_topics.by_value.map(d => d[0]) || []
      //   )
      // }
      // context.setData(newContextData)

      // trigger on loaded callback func
      onLoaded()
    }
  }

  // REFS
  // track overlay element so it can be dismissed if user clicks outside it
  const wrapperRef = useRef(null)

  // EFFECT HOOKS
  // rebuild tooltips when defs fetched
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [tooltipDefs])

  // fetch data when ID is set
  useEffect(() => {
    // reset similar items page number if not one
    if (curPage !== 1) {
      setCurPage(1)
    } else {
      // if ID is provided fetch data, and scroll to top
      if (id !== false && id !== 'false') {
        getData()
      }
    }

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [id])

  // fetch data when page changes
  useEffect(() => {
    // if ID is provided fetch data, and scroll to top
    if (id !== false && itemData !== null) {
      getData()
    }
  }, [curPage])

  // fetch data when pagesize changes
  useEffect(() => {
    // if ID is provided fetch data, and scroll to top
    if (curPage !== 1) {
      setCurPage(1)
    } else if (id !== false && itemData !== null) {
      getData()
    }
  }, [pagesize])

  // don't show component until all data fetched
  useEffect(() => {
    if (itemData !== null && relatedItemsData !== null) {
      if (setPageTitle) setPageTitle(itemData.title)
      setLoaded(true)
    }
  }, [itemData, relatedItemsData])

  // fade in when loaded
  useEffect(() => {
    if (loaded) setOpacity(1)
  }, [loaded])

  // add listener to close overlay on esc key
  useEffect(() => {
    if (!single) {
      // close overlay on escape key
      const escFunction = e => {
        if (e.keyCode === 27) dismissFloatingOverlay()
      }

      // assign listener
      document.addEventListener('keydown', escFunction, false)

      // remove listener on unmount
      return () => {
        document.removeEventListener('keydown', escFunction, false)
      }
    }
  }, [])

  // on click anywhere but in menu, and menu is shown, close menu; otherwise
  // do nothing
  useEffect(() => {
    if (floating && opacity === 1 && typeof document !== 'undefined')
      document.getElementsByTagName('html')[0].onclick = e => {
        if (wrapperRef === null || wrapperRef.current === null) return
        const wrapper = wrapperRef.current
        if (wrapper && wrapper.contains(e.target)) return
        else if (
          simpleHeaderRef.current &&
          simpleHeaderRef.current.contains(e.target)
        )
          return
        else {
          dismissFloatingOverlay()
        }
      }
  }, [opacity])

  // JSX
  if (!loaded) return null
  else {
    // const getGovAuthIndicator = () => {
    //   let message = ''
    //   const status = itemData.authoring_organization_has_governance_authority
    //   const plural =
    //     itemData.authors.length > 1
    //       ? ['Organizations', 'have', 'do not have']
    //       : ['Organization', 'has', 'does not have']
    //   if (status === true) {
    //     message = `${plural[0]} ${plural[1]} governance authority`
    //   } else if (status === false) {
    //     message = `${plural[0]} ${plural[2]} governance authority`
    //   } else {
    //     message = 'Governance authority information is not available'
    //   }
    //   return (
    //     <div
    //       className={classNames(styles.govAuth, {
    //         [styles.yes]: status === true,
    //         [styles.no]: status === false,
    //         [styles.notAvail]: status === null,
    //       })}
    //     >
    //       <span>{message}</span>
    //       <InfoTooltip
    //         text={
    //           'Indication of whether the Publishing Organization has' +
    //           ' governance authority in the sense of whether it can act on' +
    //           ' the information contained in the record. Intergovernmental' +
    //           ' organizations may have governance authority depending on' +
    //           ' the context and topic of the product.'
    //         }
    //       />
    //     </div>
    //   )
    // }
    // const govAuthIndicator = getGovAuthIndicator()

    // get record type for header
    let recordType = 'Document'
    const type = itemData.type_of_record
    if (type !== undefined && type !== null && type !== '') {
      recordType = type
    }

    var topicCount = 0
    return (
      <>
        <div className={floating ? styles.shadow : null} />
        <div
          ref={wrapperRef}
          style={{
            opacity,
            pointerEvents: opacity === 0 ? 'none' : 'all',
          }}
          className={classNames(styles.detailOverlay, {
            [styles.floating]: floating,
            [styles.page]: !floating,
            [styles.wide]: true,
          })}
        >
          <div className={styles.container}>
            <div className={styles.band}>
              {itemData && (
                <div className={styles.recordType}>{recordType}</div>
              )}
              {floating && (
                <div className={styles.bandOptions}>
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
                  <div
                    onClick={dismissFloatingOverlay}
                    className={styles.closeButton}
                  >
                    <i className={'material-icons'}>close</i>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.content}>
              <div className={styles.card}>
                <Card
                  {...{
                    ...itemData,
                    detail: true,
                    onViewDetails,
                    bookmarkedIds,
                    setBookmarkedIds,
                    filters,
                    bookmark,
                    getTooltipText,
                    floating,
                    single: !floating,
                    setFilters: v => {
                      dismissFloatingOverlay()
                      setFilters(v)
                    },
                    setSearchText,
                    alwaysStartNew: true,
                    browse,
                  }}
                />
                <div className={classNames(styles.sideBar, styles.wide)}>
                  <Panel
                    {...{
                      title: 'Subject matter',
                      iconName: iconNamesByField.key_topics,
                      expandable: true,
                    }}
                  >
                    <div className={styles.authors}>
                      <div className={styles.author}>
                        <div className={styles.authorInfo}>
                          <div className={styles.infoItem}>
                            <TooltippedHeader
                              label={'Topic area'}
                              tooltip={tooltipDefs['Item.key_topics']}
                            />
                            <div className={styles.value}>
                              {itemData.key_topics.map(value => {
                                if (itemData.key_topics.includes(value))
                                  topicCount = topicCount + 1
                                return itemData.key_topics.includes(value) ? (
                                  <div
                                    key={value}
                                    onClick={e =>
                                      toggleFilter({
                                        openNewPage,
                                        e,
                                        getFilterVal: () => value,
                                        filters,
                                        filterKey: 'key_topics',
                                        setFilters: v => {
                                          dismissFloatingOverlay()
                                          setFilters(v)
                                        },
                                        setSearchText,
                                        alwaysStartNew: true,
                                      })
                                    }
                                    className={classNames(styles.keyTopic)}
                                  >
                                    <span>
                                      {highlightTag({
                                        displayName: value,
                                        filterValue: value,
                                        filterKey: 'key_topics',
                                      })}
                                    </span>
                                  </div>
                                ) : null
                              })}
                              {topicCount === 0 && (
                                <i className={styles.placeholder}>
                                  No matching topic area
                                </i>
                              )}
                            </div>
                          </div>
                          <div className={styles.infoItem}>
                            <TooltippedHeader
                              label={'Tags'}
                              tooltip={tooltipDefs['Item.covid_tags']}
                            />
                            <div className={styles.values}>
                              {itemData.covid_tags.map(value => (
                                <div
                                  onClick={e =>
                                    toggleFilter({
                                      openNewPage,
                                      e,
                                      getFilterVal: () => value,
                                      filters,
                                      filterKey: 'covid_tags',
                                      setFilters: v => {
                                        dismissFloatingOverlay()
                                        setFilters(v)
                                      },
                                      setSearchText,
                                      alwaysStartNew: true,
                                    })
                                  }
                                  className={classNames(styles.covidTag)}
                                >
                                  <span>
                                    {highlightTag({
                                      displayName: value,
                                      filterValue: value,
                                      filterKey: 'covid_tags',
                                    })}
                                  </span>
                                </div>
                              ))}
                              {itemData.covid_tags.length === 0 && (
                                <i className={styles.noData}>None</i>
                              )}
                            </div>
                          </div>
                          {/* <div className={styles.infoItem}>
                             <TooltippedHeader
                              label={'Applicability (US or global)'}
                              tooltip={tooltipDefs['Item.geo_specificity']}
                            /> 
                            <div className={styles.value}>
                              {geo_specificity !== null && (
                                <span>{geo_specificity}</span>
                              )}
                              {geo_specificity === null && (
                                <i className={styles.noData}>Unspecified</i>
                              )}
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </Panel>
                  {
                    // Author info
                  }
                  <Panel
                    {...{
                      title: `Publishing org${
                        itemData.authors.length > 1 ? 's' : ''
                      }.`,
                      iconName: iconNamesByField.authors,
                      expandable: true,
                    }}
                  >
                    <div className={styles.authors}>
                      {itemData.authors.map(d => (
                        <div key={d.id.toString()} className={styles.author}>
                          <div className={styles.authorName}>
                            {highlightTag({
                              displayName: d.authoring_organization,
                              filterValue: d.id.toString(),
                              filterKey: 'author.id',
                            })}
                          </div>
                          <div className={styles.authorInfo}>
                            {authorFields.map(
                              ({
                                name,
                                field,
                                formatter = v => v[field],
                                link = false,
                              }) => (
                                <div key={field} className={styles.infoItem}>
                                  <TooltippedHeader
                                    label={name}
                                    tooltip={
                                      tooltipDefs['Item.Author.' + field]
                                    }
                                  />
                                  {!link && (
                                    <div className={styles.value}>
                                      {formatter(d) || (
                                        <div className={styles.noData}>
                                          Data not available
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  {link && (
                                    <div className={styles.value}>
                                      {highlightTag({
                                        displayName: d[field],
                                        filterValue: d[field],
                                        filterKey: 'author.' + field,
                                      })}
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                      {itemData.authors.length === 0 && (
                        <div className={styles.noData}>Data not available</div>
                      )}
                    </div>
                    {/*{godAuthIndicator}*/}
                  </Panel>
                  {
                    // Event info
                  }
                  <Panel
                    {...{
                      title: 'Linked outbreak event',
                      iconName: iconNamesByField.events,
                      expandable: true,
                      tooltip: tooltipDefs['Item.Event.name'],
                    }}
                  >
                    <div className={styles.events}>
                      {itemData.events
                        .map(d =>
                          highlightTag({
                            displayName: d.name,
                            filterValue: d.name,
                            filterKey: 'event.name',
                          })
                        )
                        .map(asBulletDelimitedList)}
                      {itemData.events.length === 0 && (
                        <div className={styles.noData}>No linked event</div>
                      )}
                    </div>
                  </Panel>
                  {
                    // Funder info
                  }
                  <Panel
                    {...{
                      title: 'Funders',
                      iconName: 'monetization_on',
                      expandable: true,
                      tooltip: tooltipDefs['Item.Funder.name'],
                    }}
                  >
                    <div className={styles.funders}>
                      {itemData.funders
                        .map(d =>
                          highlightTag({
                            displayName: d.name,
                            filterValue: d.name,
                            filterKey: 'funder.name',
                          })
                        )
                        .map(asBulletDelimitedList)}

                      {itemData.funders.length === 0 && (
                        <div className={styles.noData}>Data not available</div>
                      )}
                    </div>
                  </Panel>
                </div>
              </div>
              {relatedItemsData !== null && (
                <div className={styles.relatedItems}>
                  <div className={styles.similarHeader}>
                    <div className={styles.similarIcon}>
                      {getIconByName({ iconName: 'file_copy' })}
                    </div>
                    <div
                      className={styles.similarText}
                    >{`Similar items (${relatedItemsData.total})`}</div>
                  </div>
                  <CardList
                    {...{
                      key: `cardList${id}`,
                      cardData: relatedItemsData.related_items,
                      start,
                      onViewDetails,
                      related: true,
                      bookmarkedIds,
                      setBookmarkedIds,
                      filters,
                      bookmark,
                      single: !floating,
                      getTooltipText,
                      alwaysStartNew: true,
                      setFilters: v => {
                        dismissFloatingOverlay()
                        setFilters(v)
                      },
                      setSearchText,
                      setNextPage:
                        relatedItemsData.page !== relatedItemsData.num_pages
                          ? () => {
                              setCurPage(curPage + 1)
                              if (typeof window !== 'undefined') {
                                window.scrollTo(0, 0)
                              }
                            }
                          : false,
                      browse,
                    }}
                  />
                  {relatedItemsData.related_items.length > 0 && (
                    <Paginator
                      {...{
                        curPage,
                        setCurPage,
                        nTotalRecords: relatedItemsData.total,
                        pagesize,
                        setPagesize,
                        showCounter: relatedItemsData.related_items.length > 0,
                        noun: 'similar item',
                        nouns: 'similar items',
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

/**
 *
 * @param {Object} props Value of tooltip and label to display.
 * @returns A header for a data field with `tooltip` and
 * display text `label`.
 */
const TooltippedHeader = ({ tooltip, label }) => {
  return (
    <div
      data-for={'searchHighlightInfo'}
      data-tip={tooltip}
      className={styles.field}
    >
      {label}
    </div>
  )
}

export default DetailOverlay

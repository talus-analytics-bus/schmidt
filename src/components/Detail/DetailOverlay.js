// 3rd party components
import React, { useState, useEffect, useRef, useContext } from 'react'
import classNames from 'classnames'
import axios from 'axios'

// local components
import SEO from '../seo'
import { Card, CardList, InfoTooltip, Paginator } from '../../components/common'
import Panel from './content/Panel'
import { appContext } from '../../components/misc/ContextProvider'

// local utility functions
import ItemQuery from '../../components/misc/ItemQuery'
import {
  asBulletDelimitedList,
  toggleFilter,
  getHighlightSegments,
  getTooltipTextFunc,
  execute,
} from '../../components/misc/Util'

// styles and assets
import styles from './detailoverlay.module.scss'

// constants
const API_URL = process.env.GATSBY_API_URL

const DetailOverlay = ({
  // item data
  id = 1,
  type_of_record = 'Test item',
  title = 'Title title',
  description,
  date = '2020-01-01',
  authors = [],
  funders = [],
  key_topics = [],
  files = [],
  authoring_organization_has_governance_authority = null,

  // other data
  filters = {},
  setFilters = () => '',
  setSearchText = () => '',
  floating = false,
  close = () => '',
  origScrollY = 0,
  onViewDetails = () => '',
  onLoaded = () => '',
  bookmarkedIds = [],
  setBookmarkedIds = () => '',
  simpleHeaderRef = { current: null },
  bookmark = false,
}) => {
  // CONTEXT
  const context = useContext(appContext)

  // STATE
  // item and related items data
  const [itemData, setItemData] = useState(null)
  const [relatedItemsData, setRelatedItemsData] = useState(null)
  const [keyTopics, setKeyTopics] = useState([])

  // opacity control
  const [opacity, setOpacity] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // current page and pagesize of paginator
  // const pageStr = !initialized ? urlParams.get('page') || '1' : '1'
  // const [curPage, setCurPage] = useState(+pageStr)
  const [curPage, setCurPage] = useState(1)

  // const [pagesize, setPagesize] = useState(
  //   !initialized ? urlParams.get('pagesize') || 10 : 10
  // )
  const [pagesize, setPagesize] = useState(10)

  // CONSTANTS
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
  // key topics
  // TODO move up in scope and use throughout site, and/or get from API call
  // const keyTopics = [
  //   { displayName: 'Biosurveillance' },
  //   { displayName: 'Emerging/epidemic infectious disease' },
  //   { displayName: 'Health security (other)' },
  //   { displayName: 'Intentional biological attacks' },
  //   { displayName: 'Medical preparedness and MCMs' },
  // ]
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
              src={`https://www.countryflags.io/${d.if_national_iso2_of_authoring_org.toLowerCase()}/shiny/64.png`}
            />
          ) : null
        return (
          <>
            {flag}
            {d.if_national_country_of_authoring_org || 'International'}
          </>
        )
      },
      field: 'if_national_country_of_authoring_org',
      name: 'Location',
    },
  ]

  // FUNCTIONS
  // get tooltip text depending on type of card
  const detail = true
  const related = false
  const getTooltipText = getTooltipTextFunc({
    detail: true,
    bookmark,
    related: true,
  })

  // highlight metadata tag if filtered
  const highlightTag = ({ displayName, filterValue, filterKey }) => {
    return (
      <span
        onClick={e =>
          toggleFilter({
            e,
            getFilterVal: () => filterValue,
            filters,
            filterKey,
            openNewPage: bookmark,
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
      queries.itemData = ItemQuery({
        id,
        pagesize,
        page: curPage,
      })

      // get filter counts if not yet retrieved
      const getFilterCounts = context.data.filterCounts === undefined
      if (getFilterCounts) {
        queries.filterCountsQuery = axios.get(`${API_URL}/get/filter_counts`)
      }
      const results = await execute({ queries })
      setItemData(results.itemData.data.data)
      setRelatedItemsData(results.itemData.data)

      // if getting filter counts set them, or return them if already set
      if (getFilterCounts) {
        console.log('Getting filter counts')
        const filterCounts = results.filterCountsQuery.data.data
        setKeyTopics(filterCounts.key_topics.map(d => d[0]) || [])
        context.setData({ ...context.data, filterCounts })
      } else {
        setKeyTopics(context.data.filterCounts.key_topics.map(d => d[0]) || [])
      }

      // trigger on loaded callback func
      onLoaded()
    }
  }

  // REFS
  // track overlay element so it can be dismissed if user clicks outside it
  const wrapperRef = useRef(null)

  // EFFECT HOOKS
  // fetch data when ID is set
  useEffect(() => {
    // reset similar items page number if not one
    if (curPage !== 1) {
      setCurPage(1)
    } else {
      // if ID is provided fetch data, and scroll to top
      if (id !== false) {
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
    } else {
      getData()
    }
  }, [pagesize])

  // don't show component until all data fetched
  useEffect(() => {
    if (itemData !== null && relatedItemsData !== null) {
      setLoaded(true)
    }
  }, [itemData, relatedItemsData])

  // fade in when loaded
  useEffect(() => {
    if (loaded) setOpacity(1)
  }, [loaded])

  // add listener to close overlay on esc key
  useEffect(() => {
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
    const getGovAuthIndicator = () => {
      let message = ''
      const status = itemData.authoring_organization_has_governance_authority
      const plural =
        itemData.authors.length > 1
          ? ['Organizations', 'have', 'do not have']
          : ['Organization', 'has', 'does not have']
      if (status === true) {
        message = `${plural[0]} ${plural[1]} governance authority`
      } else if (status === false) {
        message = `${plural[0]} ${plural[2]} governance authority`
      } else {
        message = 'Governance authority information is not available'
      }
      return (
        <div
          className={classNames(styles.govAuth, {
            [styles.yes]: status === true,
            [styles.no]: status === false,
            [styles.notAvail]: status === null,
          })}
        >
          {message}{' '}
          <InfoTooltip
            text={
              'This field captures whether the authorizing organization(s) have governance authority over the topic, recommendations, or other content of the product developed. For example, the US Congress has governance over US biosecurity policy but a US think tank does not. Intergovernmental organizations will have governance authority that depends on the context and topic of the product. '
            }
          />
        </div>
      )
    }
    const govAuthIndicator = getGovAuthIndicator()

    return (
      <>
        <div className={floating ? styles.shadow : null} />
        <div
          ref={wrapperRef}
          style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'all' }}
          className={classNames(
            styles.detailOverlay,
            floating ? styles.floating : styles.page
          )}
        >
          <div className={styles.container}>
            <div className={styles.band}>
              <div
                onClick={dismissFloatingOverlay}
                className={styles.closeButton}
              >
                <i className={'material-icons'}>close</i>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.cardAndRelated}>
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
                    setFilters: v => {
                      dismissFloatingOverlay()
                      setFilters(v)
                    },
                    setSearchText,
                    alwaysStartNew: true,
                  }}
                />
                {relatedItemsData !== null && (
                  <div className={styles.relatedItems}>
                    <Panel
                      {...{
                        key: `similarPanel${id}`,
                        title: `Similar items (${relatedItemsData.total})`,
                        iconName: 'file_copy',
                        secondary: false,
                      }}
                    >
                      <Paginator
                        {...{
                          curPage,
                          setCurPage,
                          nTotalRecords: relatedItemsData.total,
                          pagesize,
                          setPagesize,
                          showCounter:
                            relatedItemsData.related_items.length > 0,
                          noun: 'similar item',
                          nouns: 'similar items',
                        }}
                      />
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
                        }}
                      />
                    </Panel>
                  </div>
                )}
              </div>
              <div className={styles.sideBar}>
                <Panel {...{ title: 'Topic areas' }}>
                  <div className={styles.keyTopics}>
                    {keyTopics.map(value => (
                      <>
                        <div
                          onClick={e =>
                            toggleFilter({
                              openNewPage: bookmark,
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
                          className={classNames(styles.keyTopic, {
                            [styles.active]: itemData.key_topics.includes(
                              value
                            ),
                          })}
                        >
                          <div className={styles.colorBlock}></div>
                          <span>
                            {highlightTag({
                              displayName: value,
                              filterValue: value,
                              filterKey: 'key_topics',
                            })}
                          </span>
                        </div>
                      </>
                    ))}
                  </div>
                </Panel>
                {
                  // Author info
                }
                <Panel
                  {...{
                    title: `Authoring organization${
                      itemData.authors.length > 1 ? 's' : ''
                    }`,
                    iconName: 'person',
                  }}
                >
                  <div className={styles.authors}>
                    {itemData.authors.map((d, i) => (
                      <div className={styles.author}>
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
                              <div className={styles.infoItem}>
                                <div className={styles.field}>{name}</div>
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
                  {govAuthIndicator}
                </Panel>
                {
                  // Event info
                }
                <Panel
                  {...{ title: 'Related events', iconName: 'outbreak_events' }}
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
                      <div className={styles.noData}>Data not available</div>
                    )}
                  </div>
                </Panel>
                {
                  // Funder info
                }
                <Panel {...{ title: 'Funders', iconName: 'payments' }}>
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
          </div>
        </div>
      </>
    )
  }
}

export default DetailOverlay

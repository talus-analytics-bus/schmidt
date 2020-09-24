// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
// import axios from 'axios'

// local components
import Layout from '../Layout/Layout'
import SEO from '../seo'
import { Card, CardList } from '../../components/common'
import Panel from './content/Panel'

// local utility functions
import ItemQuery from '../../components/misc/ItemQuery'
// import { execute } from '../components/misc/Util'

// styles and assets
import styles from './detailoverlay.module.scss'
import cross from '../../assets/icons/cross.svg'

// // constants
// const API_URL = process.env.GATSBY_API_URL

const DetailOverlay = ({
  // item data
  id,
  type_of_record,
  title,
  description,
  date,
  authors,
  funders,
  key_topics,
  files,
  // other data
  floating = true,
  close = () => '',
  origScrollY,
  onViewDetails,
  onLoaded = () => '',
}) => {
  // STATE
  // opacity control
  const [opacity, setOpacity] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // CONSTANTS
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
  const keyTopics = [
    { displayName: 'Biodefense' },
    { displayName: 'Biosurveillance' },
    { displayName: 'Emerging infectious disease' },
    { displayName: 'Health security' },
    { displayName: 'Healthcare and medical preparedness' },
    {
      displayName: 'Intentional biological attacks and CBRNE',
      value: 'Intentional biological attacks and CBRNE threats',
    },
    {
      displayName: 'Medical countermeasures',
      value: 'Medical countermeasures (including vaccines, therapeutics)',
    },
    {
      displayName: 'Naturally occurring infectious outbreak',
      value:
        'Naturally occurring infectious disease outbreak/pandemic preparedness',
    },
    { displayName: 'Public health response' },
  ]
  // author fields
  const authorFields = [
    { field: 'type_of_authoring_organization', name: 'Type' },
    { field: 'if_national_country_of_authoring_org', name: 'Location' },
    {
      field: 'authoring_organization_has_governance_authority',
      name: 'Has governance authority?',
      formatter: v => {
        if (v === true) return 'Yes'
        else if (v === false) return 'No'
        else return undefined
      },
    },
  ]

  // STATE
  // item and related items data
  const [itemData, setItemData] = useState(null)
  const [relatedItemsData, setRelatedItemsData] = useState(null)

  // FUNCTIONS
  // get item data
  const getData = async () => {
    if (id === false) return
    else {
      const results = await ItemQuery({
        id,
      })
      setItemData(results.data.data)
      setRelatedItemsData(results.data)
      onLoaded()
    }
  }

  // REFS
  // track overlay element so it can be dismissed if user clicks outside it
  const wrapperRef = useRef(null)

  // EFFECT HOOKS
  // fetch data when ID is set
  useEffect(() => {
    // if ID is provided fetch data, and scroll to top
    if (id !== false) {
      getData()
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [id])

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

  // on click anywhere but in menu, and menu is shown, close menu; otherwise
  // do nothing
  useEffect(() => {
    if (floating && opacity === 1 && typeof document !== 'undefined')
      document.getElementById('___gatsby').onclick = e => {
        if (wrapperRef === null || wrapperRef.current === null) return
        const wrapper = wrapperRef.current
        if (wrapper && wrapper.contains(e.target)) return
        else {
          dismissFloatingOverlay()
        }
      }
  }, [opacity])

  // JSX
  if (!loaded) return null
  else
    return (
      <div
        ref={wrapperRef}
        style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'all' }}
        className={classNames(styles.detailOverlay, {
          [styles.floating]: floating,
        })}
      >
        <div className={styles.band}>
          <div onClick={dismissFloatingOverlay} className={styles.closeButton}>
            <i className={'material-icons'}>close</i>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.cardAndRelated}>
            <Card {...{ ...itemData, detail: true, onViewDetails }} />
            <hr style={{ borderColor: '#333' }} />
            {relatedItemsData !== null && (
              <div className={styles.relatedItems}>
                <Panel
                  {...{
                    key: `similarPanel${id}`,
                    title: `Similar items (${relatedItemsData.related_items.length})`,
                    iconName: 'file_copy',
                    secondary: false,
                  }}
                >
                  <CardList
                    {...{
                      key: `cardList${id}`,
                      cardData: relatedItemsData.related_items,
                      start: 1,
                      onViewDetails,
                      related: true,
                    }}
                  />
                </Panel>
              </div>
            )}
          </div>
          <div className={styles.sideBar}>
            <Panel {...{ title: 'Topic areas' }}>
              <div className={styles.keyTopics}>
                {keyTopics.map(({ displayName, value = displayName }) => (
                  <>
                    <div
                      className={classNames(styles.keyTopic, {
                        [styles.active]: itemData.key_topics.includes(value),
                      })}
                    >
                      <div className={styles.colorBlock}></div>
                      <span>{displayName}</span>
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
                {itemData.authors.map(d => (
                  <>
                    <div className={styles.authorName}>
                      {d.authoring_organization}
                    </div>
                    <div className={styles.authorInfo}>
                      {authorFields.map(
                        ({ name, field, formatter = v => v }) => (
                          <div className={styles.infoItem}>
                            <div className={styles.field}>{name}</div>
                            <div className={styles.value}>
                              {formatter(d[field]) || (
                                <div className={styles.noData}>
                                  Data not available
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ))}
                {itemData.authors.length === 0 && (
                  <div className={styles.noData}>Data not available</div>
                )}
              </div>
            </Panel>
            {
              // Event info
            }
            <Panel
              {...{ title: 'Related events', iconName: 'outbreak_events' }}
            >
              <div className={styles.events}>
                {itemData.events.map((d, i) => (
                  <>
                    {d.name}
                    {i !== itemData.events.length - 1 ? ' • ' : ''}
                  </>
                ))}
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
                {itemData.funders.map((d, i) => (
                  <>
                    {d.name}
                    {i !== itemData.funders.length - 1 ? ' • ' : ''}
                  </>
                ))}
                {itemData.funders.length === 0 && (
                  <div className={styles.noData}>Data not available</div>
                )}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    )
}

export default DetailOverlay

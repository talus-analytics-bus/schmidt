// 3rd party components
import React, { useState, useEffect } from 'react'
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
  id,
  type_of_record,
  title,
  description,
  date,
  authors,
  funders,
  key_topics,
  files,
  floating = true,
  close = () => '',
}) => {
  // STATE
  // opacity control
  const [opacity, setOpacity] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // CONSTANTS
  const keyTopics = [
    'Biodefense',
    'Emerging infectious disease',
    'Health security',
    'Intentional biological attacks and CBRNE threats',
    'Naturally occurring infectious disease outbreak/pandemic preparedness',
    'Public health response',
  ]

  // STATE
  // item and related items data
  const [itemData, setItemData] = useState(null)

  const [relatedItemsData, setRelatedItemsData] = useState(null)
  // FUNCTIONS
  // get item data
  const getData = async () => {
    const results = await ItemQuery({
      id,
    })
    setItemData(results.data.data)
    setRelatedItemsData(results.data)
  }

  // EFFECT HOOKS
  // load data when ID is set
  useEffect(() => {
    if (id !== false) {
      getData()
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }
    }
  }, [id])

  useEffect(() => {
    if (itemData !== null && relatedItemsData !== null) {
      setLoaded(true)
    }
  }, [itemData, relatedItemsData])

  useEffect(() => {
    if (loaded) setOpacity(1)
  }, [loaded])
  if (!loaded) return null
  else
    return (
      <div
        style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'all' }}
        className={classNames(styles.detailOverlay, {
          [styles.floating]: floating,
        })}
      >
        <div className={styles.band}>
          <div
            onClick={() => {
              setOpacity(0)
              setTimeout(close, 250)
            }}
            className={styles.closeButton}
          >
            <i className={'material-icons'}>close</i>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.cardAndRelated}>
            <Card {...{ ...itemData, detail: true }} />
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
                    }}
                  />
                </Panel>
              </div>
            )}
          </div>
          <div className={styles.sideBar}>
            <Panel {...{ title: 'Topic areas' }}>
              <div className={styles.keyTopics}>
                {keyTopics.map(d => (
                  <>
                    <div
                      className={classNames(styles.keyTopic, {
                        [styles.active]: itemData.key_topics.includes(d),
                      })}
                    >
                      <div className={styles.colorBlock}></div>
                      <span>{d}</span>
                    </div>
                  </>
                ))}
              </div>
            </Panel>
            <Panel {...{ title: 'Funders', iconName: 'payments' }}>
              <div className={styles.funders}>
                {itemData.funders.map(d => (
                  <>{d.name}</>
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

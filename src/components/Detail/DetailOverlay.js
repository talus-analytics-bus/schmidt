// 3rd party components
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
// import axios from 'axios'

// local components
import Layout from '../Layout/Layout'
import SEO from '../seo'
// import Results from '../components/Detail/Results/Results'
// import Options from '../components/Detail/Options/Options'
import { Card } from '../../components/common'

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
  // item and related items data
  const [itemData, setItemData] = useState(null)
  console.log('itemData')
  console.log(itemData)
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
      console.log('id = ' + id)
      getData()
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }
    }
  }, [id])
  if (itemData === null) return null
  else
    return (
      <div
        className={classNames(styles.detailOverlay, {
          [styles.floating]: floating,
        })}
      >
        <div className={styles.band}>
          <div onClick={close} className={styles.closeButton}>
            <i className={'material-icons'}>close</i>
          </div>
        </div>
        <Card {...{ ...itemData, detail: true }} />
      </div>
    )
}

export default DetailOverlay

// 3rd party components
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

// local components
import { CardList, Ticker, PrimaryButton } from '../../../common'

// local utility functions
import SearchQuery from '../../../misc/SearchQuery'
import { comma, getTooltipTextFunc, getIconByName } from '../../../misc/Util'

// styles and assets
import styles from './collection.module.scss'

// constants
const S3_URL = process.env.GATSBY_S3_URL

export const Collection = ({
  name,
  value,
  type,
  bookmarkedIds,
  setBookmarkedIds,
}) => {
  // STATE
  // is collection loaded yet? show nothing until it is
  const [loading, setLoading] = useState(true)

  // data for collections displayed -- top 10 most recent items by topic or by
  // author name (type?)
  const [data, setData] = useState(null)

  // track which item in the ticker is selected
  const [curItemIdx, setCurItemIdx] = useState(0)

  // entering?
  const [entered, setEntered] = useState(false)

  // FUNCTIONS
  const getData = async () => {
    const results = await SearchQuery({
      page: 1,
      pagesize: 15,
      filters: { [type]: [value] },
      order_by: 'date',
      is_desc: 'true',
      explain_results: false,
    })
    setData(results.data)
    setLoading(false)
  }
  // EFFECT HOOKS
  // load data initially
  useEffect(() => {
    if (data === null) {
      getData()
    }
  }, [])

  // once loaded, fly in card
  useEffect(() => {
    if (loading) {
      setEntered(true)
    }
  }, [loading])

  if (loading)
    return (
      <div
        style={{ opacity: 0, left: 20 }}
        key={name + '-collection'}
        className={styles.collection}
      />
    )
  else {
    // CONSTANTS
    // get tooltip text function
    const getTooltipText = getTooltipTextFunc({
      bookmark: true,
      detail: false,
      related: false,
    })

    // current item
    const item = data.data[curItemIdx]
    const icon = getIconByName({ field: 'key_topics', styles })
    return (
      <div
        style={{ opacity: entered ? 1 : 0, left: entered ? 0 : 20 }}
        key={name + '-collection'}
        className={styles.collection}
      >
        <div className={styles.cardCap}>
          <div className={styles.title}>
            {icon}
            {name}
          </div>
          <div className={styles.button}>
            <PrimaryButton
              {...{
                label: `View all ${comma(data.total)} items`,
                iconName: 'view_list',
                onClick: () => {
                  if (typeof window !== 'undefined') {
                    const filters = { [type]: [value] }
                    window.location.assign(
                      `/search/?filters=${JSON.stringify(filters)}`
                    )
                  }
                },
              }}
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.divider} />
          {
            <CardList
              {...{
                cardData: [item],
                start: curItemIdx + 1,
                getTooltipText,
                bookmark: true,
                bookmarkedIds,
                setBookmarkedIds,
                onViewDetails: () => {
                  if (typeof window !== 'undefined') {
                    const filters = { [type]: [value] }
                    window.location.assign(`/search/?show_overlay=${item.id}`)
                  }
                },
              }}
            />
          }
        </div>
        <div className={styles.ticker}>
          <Ticker
            {...{
              label: 'Most recently published items',
              curItemIdx,
              setCurItemIdx,
              items: data.data.map(d => {
                return {
                  id: d.id,
                  label: d.title,
                  imgSrcUrl:
                    d.files[0] !== undefined
                      ? `${S3_URL}/${d.files[0].s3_filename}_thumb`
                      : null,
                }
              }),
            }}
          />
        </div>
      </div>
    )
  }
}

export default Collection

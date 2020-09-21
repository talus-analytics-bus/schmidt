// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'
import { InfoTooltip } from '../../common'

// local assets and styling
import styles from './results.module.scss'

// local components
import { SearchBar, Paginator, CardList } from '../../common'

export const Results = ({ page, ...props }) => {
  // STATE // -------------------------------------------------------------- //
  // current page and pagesize of paginator
  const [curPage, setCurPage] = useState(1)
  const [pagesize, setPagesize] = useState(5)

  // EFFECT HOOKS // ------------------------------------------------------- //

  /**
   * Return JSX for search results that shows the search bar, results,
   * pagination controls, items per page controls
   */
  return (
    <div className={styles.results}>
      <SearchBar />
      <Paginator
        {...{
          curPage,
          setCurPage,
          nTotalRecords: 10,
          pagesize,
          setPagesize,
          noun: 'item',
          nouns: 'items',
        }}
      />
      <CardList {...{ cardData: [{}, {}, {}] }} />
    </div>
  )
}

export default Results

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

export const Results = ({
  searchData,
  curPage,
  setCurPage,
  pagesize,
  setPagesize,
  searchText,
  setSearchText,
  ...props
}) => {
  // STATE // -------------------------------------------------------------- //
  // CONSTANTS // ---------------------------------------------------------- //
  // show paginator if card data loaded
  const showPaginator = searchData !== null

  // EFFECT HOOKS // ------------------------------------------------------- //

  /**
   * Return JSX for search results that shows the search bar, results,
   * pagination controls, items per page controls
   */
  return (
    <div className={styles.results}>
      <SearchBar {...{ searchText, setSearchText }} />
      {showPaginator && (
        <>
          <Paginator
            {...{
              curPage,
              setCurPage,
              nTotalRecords: searchData.total,
              pagesize,
              setPagesize,
              noun: 'item',
              nouns: 'items',
            }}
          />
          <CardList {...{ cardData: searchData.data }} />
        </>
      )}
    </div>
  )
}

export default Results

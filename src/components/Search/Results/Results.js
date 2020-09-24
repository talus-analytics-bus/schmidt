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
  isSearchingText,
  setIsSearchingText,
  filters,
  setShowOverlay,
  onViewDetails,
  ...props
}) => {
  // STATE // -------------------------------------------------------------- //
  // CONSTANTS // ---------------------------------------------------------- //
  // show paginator if card data loaded
  const showPaginator = searchData !== null

  // define start / end result numbers
  // Showing {comma(curPage * pagesize - pagesize + 1)} to{' '}
  // {comma(Math.min(curPage * pagesize, nTotalRecords))} of{' '}
  // {comma(nTotalRecords)} {nTotalRecords !== 1 ? nouns : noun}
  const start = curPage * pagesize - pagesize + 1

  // EFFECT HOOKS // ------------------------------------------------------- //

  /**
   * Return JSX for search results that shows the search bar, results,
   * pagination controls, items per page controls
   */
  return (
    <div className={styles.results}>
      <SearchBar
        {...{ searchText, setSearchText, isSearchingText, setIsSearchingText }}
      />
      {showPaginator && (
        <>
          <Paginator
            {...{
              curPage,
              setCurPage,
              nTotalRecords: searchData.total,
              pagesize,
              setPagesize,
              showCounter: searchData.data.length > 0,
              noun: 'item',
              nouns: 'items',
            }}
          />
          <CardList
            {...{
              start,
              cardData: searchData.data,
              snippets: searchData.data_snippets || null,
              filters,
              onViewDetails,
              setNextPage:
                searchData.page !== searchData.num_pages
                  ? () => {
                      setCurPage(curPage + 1)
                      if (typeof window !== 'undefined') {
                        window.scrollTo(0, 0)
                      }
                    }
                  : false,
            }}
          />
        </>
      )}
    </div>
  )
}

export default Results

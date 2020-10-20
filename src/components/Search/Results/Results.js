// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'
import { InfoTooltip } from '../../common'

// local assets and styling
import styles from './results.module.scss'

// local components
import { getTooltipTextFunc, isEmpty } from '../../misc/Util'
import { SearchBar, Paginator, CardList, Selectpicker } from '../../common'
import { style } from 'd3'

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
  setFilters,
  setShowOverlay,
  onViewDetails,
  setFreezeDataUpdates,
  orderBy,
  setOrderBy,
  isDesc,
  setIsDesc,
  bookmarkedIds,
  setBookmarkedIds,
  setOptionsVisible,
  ...props
}) => {
  // STATE // -------------------------------------------------------------- //
  // CONSTANTS // ---------------------------------------------------------- //
  // show paginator if card data loaded
  const showPaginator = searchData !== null && searchData.total !== 0
  const empty = isEmpty(filters) && searchText == ''

  // tooltip text generator
  const getTooltipText = getTooltipTextFunc({
    detail: false,
    bookmark: false,
    related: false,
  })

  // define start / end result numbers
  const start = showPaginator ? searchData.page * pagesize - pagesize + 1 : 1

  // EFFECT HOOKS // ------------------------------------------------------- //

  /**
   * Return JSX for search results that shows the search bar, results,
   * pagination controls, items per page controls
   */
  return (
    <div className={styles.results}>
      {!empty && (
        <div className={styles.sortByRow}>
          {/* <div className={styles.optionsRow}> */}
          {/* <div
              className={styles.toggleOptions}
              onClick={() => setOptionsVisible(true)}
            >
              Filters
            </div> */}
          {searchData !== null && (
            <p className={styles.resultsText}>
              {searchData.total} result{searchData.total !== 1 ? 's' : ''}
            </p>
          )}
          <div className={styles.sortBy}>
            <p className={styles.sortHeader}>Sort by</p>
            <div>
              <Selectpicker
                {...{
                  setOption: setOrderBy,
                  curSelection: orderBy,
                  allOption: null,
                  label: null,
                  optionList: [
                    {
                      label: 'Relevance',
                      value: 'relevance',
                    },
                    {
                      label: 'Date',
                      value: 'date',
                    },
                    {
                      label: 'Title',
                      value: 'title',
                    },
                  ],
                }}
              />
            </div>
            {orderBy !== 'relevance' && (
              <div>
                <Selectpicker
                  {...{
                    setOption: setIsDesc,
                    curSelection: isDesc,
                    allOption: null,
                    label: null,
                    // TODO ensure this sticks when coming from another page
                    disabled: orderBy === 'relevance',
                    optionList: [
                      {
                        label: orderBy === 'date' ? 'Newest first' : 'Z to A',
                        value: true,
                      },
                      {
                        label: orderBy === 'date' ? 'Oldest first' : 'A to Z',
                        value: false,
                      },
                    ],
                  }}
                />
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      )}
      {showPaginator && !empty && (
        <div className={styles.content}>
          <CardList
            {...{
              start,
              cardData: searchData.data,
              snippets: searchData.data_snippets || null,
              filters,
              setFilters,
              setSearchText,
              onViewDetails,
              bookmarkedIds,
              setBookmarkedIds,
              getTooltipText,
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
        </div>
      )}
    </div>
  )
}

export default Results

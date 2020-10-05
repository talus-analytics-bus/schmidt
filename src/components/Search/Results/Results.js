// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'
import { InfoTooltip } from '../../common'

// local assets and styling
import styles from './results.module.scss'

// local components
import { getTooltipTextFunc } from '../../misc/Util'
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
  const showPaginator = searchData !== null

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
      <div className={styles.sortByAndSearchBar}>
        {
          <div className={styles.optionsRow}>
            <div
              className={styles.toggleOptions}
              onClick={() => setOptionsVisible(true)}
            >
              Filters
            </div>
            <div className={styles.sortBy}>
              <div>
                Sort by{' '}
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
                        label: 'Descending',
                        value: true,
                      },
                      {
                        label: 'Ascending',
                        value: false,
                      },
                    ],
                  }}
                />
              </div>
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
            </div>
          </div>
        }
        <SearchBar
          {...{
            searchText,
            setSearchText,
            isSearchingText,
            setIsSearchingText,
            setFreezeDataUpdates,
            setOrderBy,
            setIsDesc,
          }}
        />
      </div>
      {showPaginator && (
        <div className={styles.content}>
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
        </div>
      )}
    </div>
  )
}

export default Results

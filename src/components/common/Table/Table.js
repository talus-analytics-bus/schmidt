// standard modules
import React, { useEffect, useState } from 'react'
import styles from './table.module.scss'
import classNames from 'classnames'

import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'

// utilities and common components
import { comma, getInitCap } from '../../misc/Util'
import { ShowMore } from '../../common/'
import { Paginator } from './content/Paginator/Paginator'

// assets
import asc from '../../../assets/icons/table/sorted-asc.svg'
import desc from '../../../assets/icons/table/sorted-desc.svg'
import unsorted from '../../../assets/icons/table/unsorted.svg'

const Table = ({
  name,
  data,
  columns,
  dataGetter,
  childGetter,
  children,
  ordering = [['place_name', 'asc']],
  setOrdering,
  hiddenRowKeys = [],
  className,
  id,
  paginationTotalRenderer,
  year,
  noun = 'countries',
  allowExpand = false,
  indicatorNameMap,
  setPagesize,
  pagesize,
  curPage,
  setCurPage,
  nTotalRecords,
  useApiPagination = false,
  ...props
}) => {
  // define search bar
  const { SearchBar } = Search

  // define custom design for sort carets
  const sortCaret = (order, column) => {
    if (!order) return <img className={styles.sortable} src={unsorted} />
    else if (order === 'asc')
      return <img className={styles.sortable} src={asc} />
    else if (order === 'desc')
      return <img className={styles.sortable} src={desc} />
    return null
  }

  // for each column, specify various constants, including the null value,
  // sort carets, etc.
  columns.forEach(d => {
    if (useApiPagination) {
      d.onSort = (field, order) => {
        setOrdering([[field, order]])
      }
      d.sortFunc = (a, b, order, dataField) => {
        return 1
      }
    }
    d.sortCaret = sortCaret
    if (d.definition) {
      d.text = (
        <div>
          <p>{d.header}</p>
          <p className={styles.definition}>
            {<ShowMore text={d.definition} charLimit={d.defCharLimit || 30} />}
          </p>
        </div>
      )
    } else {
      d.text = (
        <div>
          <p>{d.header}</p>
        </div>
      )
    }
    if (d.formatter === undefined)
      d.formatter = cell =>
        cell === null || cell === 'Unspecified' ? (
          <span className={styles.unspecified}>{'No data'}</span>
        ) : (
          cell
        )
  })

  // define rows as non-expandable if they have no children
  const nonExpandable = allowExpand
    ? data
        .map((d, i) => {
          if (d.has_subs !== true) return d.id
          else return undefined
        })
        .filter(d => d !== undefined)
    : null

  const ChildRow = ({ code, descrip, level }) => {
    return (
      <div className={styles.childRow}>
        <div></div>
        <div></div>
        <div>{indicatorNameMap[code]}</div>
        <div>
          {getInitCap(level) || (
            <span className={styles.unspecified}>{'No data'}</span>
          )}
        </div>
        <div></div>
        <div></div>
      </div>
    )
  }

  // define how expandable rows should be rendered (e.g., note logs)
  // TODO move the notes-specific content out of this file, eventually
  const expandRow = {
    parentClassName: styles.expandedParent,
    nonExpandable,
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <i className={styles.expandAllToggle}>collapse all</i>
      }
      return <i className={styles.expandAllToggle}>expand all</i>
    },
    expandColumnRenderer: ({ expanded, expandable }) => {
      if (!expandable) return null
      else if (expanded) {
        return <i className={classNames('fas fa-angle-up', styles.caret)}></i>
      }
      return <i className={classNames('fas fa-angle-down', styles.caret)}></i>
    },
    expandColumnPosition: 'right',
    expandByColumnOnly: true,
    renderer: row => {
      // get all subindicators for this row
      const subindicators = children.filter(d => {
        return (
          d.iso2 === row.iso2 &&
          d.type === 'Subindicator' &&
          d.code.replace(/i/g, '') === row.code
        )
      })
      return (
        <div className={styles.children}>
          {subindicators.map((d, i) => ChildRow({ ...d }))}
        </div>
      )
    },
  }

  // define threshold at which to show pagination controls
  const paginationThresh = 0

  // define pagination options for Bootstrap table
  const customTotal = (from, to, size) => (
    <span className={styles.paginationTotal}>
      Showing {comma(from)} to {comma(to)} of {comma(size)} {noun}
    </span>
  )
  const paginationOptions = {
    paginationSize: 10,
    pageStartIndex: 1,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: 'All',
        value: data.length,
      },
    ],
  }

  // define pagination factory if record count is above pagination threshold
  // const pagination = paginationFactory(paginationOptions)
  const pagination =
    data.length > paginationThresh
      ? paginationFactory(paginationOptions)
      : undefined

  // table is expandable if at least on row has children to show
  const expandable = allowExpand
  const defaultSorted = [
    {
      dataField: ordering[0],
      order: ordering[1],
    },
  ]
  // main jsx for Bootstrap table
  return (
    <>
      <div className={styles.table}>
        <ToolkitProvider keyField="id" data={data} columns={columns} search>
          {props => (
            <div>
              <SearchBar
                {...{ ...props.searchProps, placeholder: 'search for...' }}
              />
              <BootstrapTable
                id={id || 'datatable'}
                pagination={!useApiPagination && pagination}
                expandRow={expandable ? expandRow : undefined}
                hiddenRows={hiddenRowKeys}
                classes={classNames({
                  // [styles.expandable]: expandable,
                  [styles[className]]: true,
                })}
                {...props.baseProps}
                defaultSorted={defaultSorted}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
      {useApiPagination && (
        <Paginator
          {...{
            setPagesize,
            pagesize,
            curPage,
            setCurPage,
            nTotalRecords,
          }}
        />
      )}
    </>
  )
  // const defaultSorted = [
  //   {
  //     dataField: "date_issued",
  //     order: "desc"
  //   }
  // ];
  // // main jsx for Bootstrap table
  // return (
  //   <div className={styles.table}>
  //     <BootstrapTable
  // defaultSorted={defaultSorted}
  //       keyField={"id"}
  //       data={data}
  //       columns={columns}
  //     />
  //   </div>
  // );
}
export default Table

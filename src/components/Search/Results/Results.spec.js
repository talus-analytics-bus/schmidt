import React from 'react'
import { render } from '@testing-library/react'
import Results from './Results'
import SearchQuery from '../../misc/SearchQuery'

it('should render without crashing', () => {
    const setPagesize = jest.fn()
    const setCurPage = jest.fn()
    const setSearchText = jest.fn()
    const setFilters = jest.fn()
    const onViewDetails = jest.fn()
    const setOrderBy = jest.fn()
    const setBookmarkedIds = jest.fn()
    const setIsDesc = jest.fn()
    const setOnEnter = jest.fn()
    const utils = render(<Results {...{
        searchData: { total: 1, page: 1, num_pages: 1, data: [], data_snippets: null },
        pagesize: 10,
        searchText: null,
        filters: {},
        curPage: 1,
        orderBy: 'date',
        isDesc: true,
        bookmarkedIds: [],
        loading: false,
        browse: false,
        fromYear: null,
        toYear: null,
        setCurPage,
        setPagesize,
        setSearchText,
        setFilters,
        onViewDetails,
        setOrderBy,
        setIsDesc,
        setBookmarkedIds,
        setOnEnter,
    }} />)
})


it('should render card lists without crashing', async () => {
    const testData = await SearchQuery({
        page: 1,
        pagesize: 10,
        // search_text: null,
        filters: {},
        // fromYear: null,
        // toYear: null,
        order_by: 'date',
        is_desc: false,
        explain_results: false,
    })
    const setPagesize = jest.fn()
    const setCurPage = jest.fn()
    const setSearchText = jest.fn()
    const setFilters = jest.fn()
    const onViewDetails = jest.fn()
    const setOrderBy = jest.fn()
    const setBookmarkedIds = jest.fn()
    const setIsDesc = jest.fn()
    const setOnEnter = jest.fn()
    const utils = render(<Results {...{
        searchData: testData.data,
        pagesize: 10,
        searchText: null,
        filters: {},
        curPage: 1,
        orderBy: 'date',
        isDesc: false,
        bookmarkedIds: [],
        loading: false,
        browse: false,
        fromYear: null,
        toYear: null,
        setCurPage,
        setPagesize,
        setSearchText,
        setFilters,
        onViewDetails,
        setOrderBy,
        setIsDesc,
        setBookmarkedIds,
        setOnEnter,
    }} />)
})
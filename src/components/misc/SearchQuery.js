import axios from 'axios'
const API_URL = process.env.GATSBY_API_URL

const SearchQuery = async ({
  page = 1,
  pagesize = 1000000,
  fields = [],
  by_category = null,
  order_by = 'date',
  is_desc = false,
  filters,
  search_text = '',
  explain_results = true,
  fromYear,
  toYear,
}) => {
  // prepare URL params
  const params = new URLSearchParams()

  // fields to return
  fields.forEach(d => {
    params.append('fields', d)
  })

  // pagination params
  params.append('page', page)
  params.append('pagesize', pagesize)
  params.append('explain_results', explain_results)
  params.append('search_text', search_text)
  params.append('order_by', order_by)
  params.append('is_desc', is_desc)

  // handle custom year range
  const usingCustomYearRange =
    filters.years !== undefined && filters.years[0] === 'custom'

  const filtersForReq = {}
  if (usingCustomYearRange) {
    console.log('setting it')
    filtersForReq.years = []
    filtersForReq.years[0] = `range_${fromYear || 0}_${toYear || 9999}`
  }
  console.log('filtersForReq')
  console.log(filtersForReq)
  // prepare request
  const req = await axios.post(
    `${API_URL}/get/search`,
    { filters: { ...filters, ...filtersForReq } },
    {
      params,
    }
  )
  const res = await req
  return res.data
}
export default SearchQuery

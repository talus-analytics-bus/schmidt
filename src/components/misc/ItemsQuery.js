import axios from 'axios'
const API_URL = process.env.GATSBY_API_URL

const ItemsQuery = async ({
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
  params.append('order_by', order_by)
  params.append('is_desc', is_desc)

  // prepare request
  const req = await axios.get(`${API_URL}/get/items`, {
    params,
  })
  const res = await req
  return res.data
}
export default ItemsQuery

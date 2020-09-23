import axios from 'axios'
const API_URL = process.env.GATSBY_API_URL

const ItemQuery = async ({
  page = 1,
  pagesize = 1000000,
  id = 1,
  include_related = true,
  order_by = 'date',
  is_desc = false,
}) => {
  // prepare URL params
  const params = new URLSearchParams()

  // pagination params
  params.append('page', page)
  params.append('pagesize', pagesize)
  params.append('order_by', order_by)
  params.append('is_desc', is_desc)
  params.append('include_related', include_related)
  params.append('id', id)

  // prepare request
  const req = await axios.get(`${API_URL}/get/item`, {
    params,
  })
  const res = await req
  return res.data
}
export default ItemQuery

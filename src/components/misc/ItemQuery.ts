import axios from 'axios'
const API_URL = process.env.GATSBY_API_URL

interface ItemQueryProps {
  page?: number
  pagesize?: number
  id?: number | null
  include_related?: boolean
  order_by?: 'date'
  is_desc?: boolean
}

/**
 * Get a single item from the database.
 * @returns The item.
 */
async function ItemQuery({
  page = 1,
  pagesize = 1000000,
  id = null,
  include_related = true,
  order_by = 'date',
  is_desc = false,
}: ItemQueryProps): Promise<any> {
  // prepare URL params
  const params = new URLSearchParams()

  // pagination params
  params.append('page', page.toString())
  params.append('pagesize', pagesize.toString())
  params.append('order_by', order_by)
  params.append('is_desc', is_desc.toString())
  params.append('include_related', include_related.toString())
  if (id !== null) params.append('id', id.toString())

  // prepare request
  const req = await axios.get(`${API_URL}/get/item`, {
    params,
  })
  const res = await req
  return res.data
}
export default ItemQuery

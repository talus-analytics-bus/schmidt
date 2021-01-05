import axios from 'axios'
import moment from 'moment'
const API_URL = process.env.GATSBY_API_URL

const ToExcelQuery = async ({
  ids = [],
  filters = null,
  order_by = 'date',
  is_desc = false,
  fromYear,
  toYear,
  searchText,
}) => {
  // prepare URL params
  const params = new URLSearchParams()

  // sorting params
  params.append('order_by', order_by)
  params.append('is_desc', is_desc)
  if (searchText !== undefined) params.append('search_text', searchText)

  // use POST if filters provided, otherwise GET
  const method = filters === null ? 'GET' : 'POST'

  // if GET: ids of items to return
  const filtersForReq = {} // POST only
  if (method === 'GET')
    ids.forEach(d => {
      params.append('ids', d)
    })
  else if (method === 'POST') {
    // handle custom year range
    const usingCustomYearRange =
      filters !== null &&
      filters.years !== undefined &&
      filters.years[0] === 'custom'

    if (usingCustomYearRange) {
      filtersForReq.years = []
      filtersForReq.years[0] = `range_${fromYear || 0}_${toYear || 9999}`
    }
  }

  // define data if POST
  const data =
    method === 'GET' ? {} : { filters: { ...filters, ...filtersForReq } }

  // prepare request
  const req = axios({
    url: `${API_URL}/${method.toLowerCase()}/export/excel`,
    method,
    responseType: 'blob',
    config: {
      headers: {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    },
    params,
    data,
  })

  const res = await req
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  const dateString = moment().format('YYYY-MM-DD')
  const fn = `Health Security Net - Data Download - ${dateString}.xlsx`
  link.setAttribute('download', fn)
  document.body.appendChild(link)
  link.click()
  return
}
export default ToExcelQuery

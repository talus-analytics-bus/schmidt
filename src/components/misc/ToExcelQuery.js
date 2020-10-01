import axios from 'axios'
const API_URL = process.env.GATSBY_API_URL

const ToExcelQuery = async ({
  ids = [1, 2, 3],
  order_by = 'date',
  is_desc = false,
}) => {
  // prepare URL params
  const params = new URLSearchParams()

  // sorting params
  params.append('order_by', order_by)
  params.append('is_desc', is_desc)

  // ids of items to return
  ids.forEach(d => {
    params.append('ids', d)
  })

  // prepare request
  const req = axios({
    url: `${API_URL}/export/excel`,
    method: 'GET',
    responseType: 'blob',
    config: {
      headers: {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    },
    params,
  })

  const res = await req
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  const dateString = ''
  // const dateString = moment().format('YYYY-MM-DD')
  const fn = `Health Security Net - Data Export.xlsx`
  link.setAttribute('download', fn)
  document.body.appendChild(link)
  link.click()
  return
}
export default ToExcelQuery

import React from 'react'
import * as d3 from 'd3/dist/d3.min'
import moment from 'moment'
import classNames from 'classnames'
import { navigate } from 'gatsby'

// project-specific assets - icons
// network blob
import events from '../../assets/icons/events.svg'
import events_blue from '../../assets/icons/events_blue.svg'
import events_disabled from '../../assets/icons/events_disabled.svg'

// speech bubble
import speech from '../../assets/icons/speech.svg'
import speech_orange from '../../assets/icons/speech_orange.svg'
import speech_disabled from '../../assets/icons/speech_disabled.svg'

// caution sign
import caution from '../../assets/icons/caution.svg'
import caution_orange from '../../assets/icons/caution_orange.svg'
import caution_disabled from '../../assets/icons/caution_disabled.svg'

// rings sign
import rings from '../../assets/icons/rings.svg'
import rings_orange from '../../assets/icons/rings_orange.svg'
import rings_disabled from '../../assets/icons/rings_disabled.svg'

// covid_tags
import covid_tags from '../../assets/icons/covid_tags.svg'
import covid_tags_orange from '../../assets/icons/covid_tags_orange.svg'
import covid_tags_disabled from '../../assets/icons/covid_tags_disabled.svg'

// Utility functions and data.
const Util = {}

// Return init lower case version of input string
Util.getInitLower = str => {
  return str.charAt(0).toLowerCase() + str.slice(1, str.length)
}

// Get ints from 1..N
Util.range1 = j => {
  const x = []
  let i = 1
  while (x.push(i++) < j) { }
  return x
}

// Returns cross-browser compatible date object from input date string.
Util.getDateObject = str => {
  return new moment(str).utc()
}

// Calculate age difference in months from text datetime strings.
// Assumes a is more recent than b
Util.getMonthsDiff = (aStr, bStr) => {
  const aDt = new Date(aStr.replace(/-/g, '/'))
  const bDt = new Date(bStr.replace(/-/g, '/'))

  // count months
  let monthsDiff = 0
  let stop = false
  while (!stop) {
    // get years
    const aYear = aDt.getUTCFullYear()
    const bYear = bDt.getUTCFullYear()
    const aMonth = aDt.getUTCMonth()
    const bMonth = bDt.getUTCMonth()

    if (aYear === bYear && aMonth === bMonth) stop = true
    else {
      aDt.setUTCMonth(aDt.getUTCMonth() - 1)
      monthsDiff++
    }
  }
  return monthsDiff
}

// Calc the cumulative caseload for X months from the most recent data point.
Util.getCumulativeCount = (data, nMonth = 12, lagMonths = 0) => {
  data.reverse()

  if (data.length === 0) {
    return { value: null }
  }

  let cumulativeCount = 0
  let nCounted = 0
  let nNull = 0

  const first = data[0]
  const firstDt = new Date(first.date_time.replace(/-/g, '/'))

  // cycle thru lag
  const startDt = new Date(firstDt)
  startDt.setUTCMonth(startDt.getUTCMonth() - lagMonths)

  // count from startDt
  let end, start
  for (let i = 0; i < data.length; i++) {
    const datum = data[i]
    const thisDt = new Date(datum.date_time.replace(/-/g, '/'))
    if (thisDt > startDt) continue
    else if (start === undefined) start = datum
    if (nCounted + nNull === nMonth) break
    end = datum
    if (datum.value !== null) {
      nCounted++
      cumulativeCount += datum.value
    } else {
      nNull++
    }
  }
  // return a datum
  data.reverse()

  return {
    data_source: start.data_source,
    date_time: start.date_time,
    end: start.date_time,
    start: end.date_time,
    definition: 'Sum of total cases in past ' + nMonth + ' months',
    metric: 'calc_cumcaseload_' + nMonth + 'month',
    observation_id: 0,
    place_fips: start.place_fips,
    place_id: start.place_id,
    place_iso: start.place_iso,
    place_name: start.place_name,
    stale_flag: start.stale_flag,
    updated_at: start.updated_at,
    value: cumulativeCount,
    n_null: nNull,
  }
}

// Calculate percent change between two values
Util.getPercentChange = (prv, cur) => {
  const diff = cur - prv
  if (diff === 0) return 0
  else if (prv === 0) {
    if (diff < 0) return -1000000000
    else return 1000000000
  } else {
    return diff / prv
  }
}

Util.getCumulativeTrend = (data, end, lagMonths = 12) => {
  const start = Util.getCumulativeCount(
    data,
    lagMonths, // n months
    lagMonths // lag months
  )

  const percentChange = Util.getPercentChange(start.value, end.value)

  return {
    change_per_period: end.value - start.value,
    definition:
      'Change in cumulative case count for ' + lagMonths + '-month period',
    end_date: end.date_time,
    end_obs: end.observation_id,
    metric: 'caseload_totalpop',
    percent_change: !isNaN(percentChange) ? percentChange : null,
    place_fips: start.place_fips,
    place_id: start.place_id,
    place_iso: start.place_iso,
    place_name: start.place_name,
    stale_flag: start.stale_flag,
    updated_at: start.updated_at,
    start_date: start.date_time,
    start_obs: start.observation_id,
    startDatum: start,
    endDatum: end,
    incomplete: start.n_null > 0 || end.n_null > 0,
  }
}

/**
 * Return + if delta > 0, - if less, none otherwise.
 * @method getDeltaSign
 * @param  {[type]}     deltaVal [description]
 * @return {[type]}              [description]
 */
Util.getDeltaSign = deltaVal => {
  if (deltaVal > 0) {
    return '+'
  } else if (deltaVal < 0) {
    return '-'
  } else {
    return ''
  }
}

Util.getDeltaWord = deltaVal => {
  if (deltaVal > 0) {
    return 'increase'
  } else if (deltaVal < 0) {
    return 'decrease'
  } else {
    return 'No change'
  }
}

Util.getDeltaData = datum => {
  if (datum && datum['percent_change'] !== null) {
    const pct = datum['percent_change']
    let direction
    if (datum.incomplete === true) direction = 'notCalc'
    else if (pct > 0) direction = 'inc'
    else if (pct < 0) direction = 'dec'
    else if (pct === 0) direction = 'same'

    return {
      delta: datum['percent_change'],
      deltaSign: Util.getDeltaSign(datum['percent_change']),
      deltaFmt: Util.percentizeDelta(datum['percent_change']),
      direction: direction,
    }
  } else return {}
}

Util.getMetricChartParams = metric => {
  switch (metric) {
    case 'cumcaseload_totalpop':
    default:
      return {
        tickFormat: Util.formatSIInteger,
        sort: 'desc',
        metric: 'cumcaseload_totalpop',
        label: 'Cases in past 12 months',
        dateFmt: allObs => {
          const firstObs = allObs[0]
          const firstObsDt = new Date(firstObs.date_time.replace(/-/g, '/'))
          const fakeObsDt = new Date(firstObsDt)
          fakeObsDt.setUTCFullYear(fakeObsDt.getUTCFullYear() - 1)
          fakeObsDt.setUTCMonth(fakeObsDt.getUTCMonth() + 1)

          const firstStr = fakeObsDt.toLocaleString('en-us', {
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
          })
          const lastStr = firstObsDt.toLocaleString('en-us', {
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
          })

          return `${firstStr} to ${lastStr}`
        },
      }
    case 'caseload_totalpop':
      return {
        tickFormat: Util.formatSIInteger,
        tickFormatLong: Util.comma,
        metric: 'caseload_totalpop',
        units: 'cases',
        getUnits: val => (val === 1 ? 'case' : 'cases'),
        sort: 'desc',
        label: 'Total cases of measles',
        name: 'Total cases of measles',
      }
    case 'incidence_monthly':
      return {
        tickFormat: Util.formatIncidence,
        tickFormatLong: Util.formatIncidence,
        metric: 'incidence_monthly',
        sort: 'desc',
        units: 'cases per 1M population',
        getUnits: val =>
          val === 1 ? 'case per 1M population' : 'cases per 1M population',
        label: 'Monthly incidence of measles (cases per 1M population)',
        name: 'Monthly incidence rate',
      }
    case 'incidence_yearly':
      return {
        tickFormat: Util.formatIncidence,
        tickFormatLong: Util.formatIncidence,
        metric: 'incidence_yearly',
        sort: 'desc',
        units: 'cases per 1M population',
        getUnits: val =>
          val === 1 ? 'case per 1M population' : 'cases per 1M population',
        label: 'Yearly incidence of measles (cases per 1M population)',
        name: 'Yearly incidence rate',
      }
    case 'monthlycaseload_totalpop':
      return {
        tickFormat: Util.formatSIInteger,
        tickFormatLong: Util.comma,
        metric: 'monthlycaseload_totalpop',
        sort: 'desc',
        temporal_resolution: 'monthly',
        label: 'Cases reported globally',
      }

    case 'coverage_mcv1_infant': // DEBUG
      return {
        tickFormat: Util.percentize,
        tickFormatLong: Util.percentize,
        metric: 'coverage_mcv1_infant',
        temporal_resolution: 'yearly',
        sort: 'asc',
        label: 'Vaccination coverage (% of infants)',
        dateFmt: allObs => Util.getDatetimeStamp(allObs[0], 'year'),
      }

    case 'avg_coverage_mcv1_infant': // DEBUG
      return {
        tickFormat: Util.percentize,
        tickFormatLong: Util.percentize,
        metric: 'avg_coverage_mcv1_infant',
        temporal_resolution: 'yearly',
        sort: 'asc',
        defaultTicks: [0, 50, 100],
        label: 'Average vaccination coverage',
        dateFmt: allObs => Util.getDatetimeStamp(allObs[0], 'year'),
      }
  }
}

Util.setColorScaleProps = (metric, colorScale) => {
  switch (metric) {
    case 'incidence_12months':
    case 'cumcaseload_totalpop':
    case 'caseload_totalpop':
    case 'incidence_monthly':
    default:
      colorScale.interpolate(d3.interpolateRgb).range(['#e6c1c6', '#b02c3a'])
      return

    case 'coverage_mcv1_infant': // DEBUG
      colorScale
        .interpolate(d3.interpolateRgbBasis)
        .range(Util.vaccinationColors)
      return
  }
}

Util.getColorScaleForMetric = (metric, domain) => {
  switch (metric) {
    default:
    case 'incidence_12months':
    case 'cumcaseload_totalpop':
    case 'caseload_totalpop':
    case 'incidence_monthly':
      return d3.scaleLinear().range(['#e6c1c6', '#b02c3a']).domain(domain)

    case 'coverage_mcv1_infant': // DEBUG
      return val => {
        return d3.interpolateRgbBasis(Util.vaccinationColors)(val / 100)
      }
  }
}

export const getIntArray = (min, max) => {
  const list = []
  for (let i = min; i <= max; i++) {
    list.push(i)
  }
  return list
}

Util.getScatterLabelData = datum => {
  switch (datum.metric || datum) {
    case 'incidence_12months':
    case 'caseload_totalpop':
      return 'Total measles cases reported'
    case 'incidence_monthly':
      return 'Monthly incidence of measles'
    case 'coverage_mcv1_infant':
      return 'Vaccination coverage'
    default:
      return ''
  }
}

Util.getSvgChartLabelData = datum => {
  switch (datum.metric) {
    case 'caseload_totalpop':
      return ['Cases reported']
    case 'incidence_monthly': // DEBUG
      return ['Global yearly', 'incidence']
    default:
      // DEBUG
      return ['Global vaccination', 'coverage']
  }
}

Util.getUTCDate = dt => {
  const utcYear = dt.getUTCFullYear()
  const utcMonth = dt.getUTCMonth()
  const utcDt = new Date(`${utcYear}/${utcMonth + 1}/1`)
  return utcDt
}

Util.getLocalDate = dt => {
  let utcYear = dt.getFullYear()
  const utcMonth = dt.getMonth() % 12
  if (utcMonth !== dt.getMonth()) utcYear++
  const utcDt = new Date(`${utcYear}/${utcMonth + 1}/1`)
  return utcDt
}

Util.getLocalNextMonth = dt => {
  let utcYear = dt.getFullYear()
  const utcMonth = (dt.getMonth() + 1) % 12
  if (utcMonth !== dt.getMonth() + 1) utcYear++
  const utcDt = new Date(`${utcYear}/${utcMonth + 1}/1`)
  return utcDt
}

Util.getTooltipItem = datum => {
  switch (datum.metric) {
    case 'caseload_totalpop':
    default:
      return {
        name: 'Cases reported',
        datum: datum,
        period: 'month',
        value: datum.value === null ? null : Util.comma(datum.value),
        label: datum.value === 1 ? 'case' : 'cases',
      }
    case 'incidence_monthly': // DEBUG
      return {
        name: 'Monthly incidence rate',
        datum: datum,
        period: 'month',
        value: datum.value === null ? null : Util.formatIncidence(datum.value),
        label: 'cases per 1M population',
      }
    case 'monthlycaseload_totalpop': // DEBUG
      return {
        name: 'Cases reported',
        datum: datum,
        period: 'month',
        value: Util.comma(datum.value),
        label: 'cases',
      }
    case 'coverage_mcv1_infant': // DEBUG
      return {
        name: 'Vaccination coverage',
        datum: datum,
        period: 'year',
        value: datum.value ? Util.percentize(datum.value) : null,
        label: 'of infants',
      }
    case 'avg_coverage_mcv1_infant': // DEBUG
      return {
        name: 'Average vaccination coverage',
        datum: datum,
        period: 'year',
        value: Util.percentize(datum.value),
        label: 'of infants',
      }
    case 'total_population':
      return {
        name: 'Total population',
        datum: datum,
        period: 'year',
        value: Util.formatSI(datum.value),
        label: 'cases',
      }
  }
}

Util.quantiles = [
  {
    name: 'Very low',
    value: 0.2,
  },
  {
    name: 'Low',
    value: 0.6,
  },
  {
    name: 'Average',
    value: 1.4,
  },
  {
    name: 'High',
    value: 4.1,
  },
]

// const getIncidenceQuantile = (allObsTmp, countryObs) => {
Util.getIncidenceQuantile = (countryObs, params = {}) => {
  if (countryObs.value === 0) {
    if (params.type === 'name') return ''
    return -9999
  }

  for (let i = 0; i < Util.quantiles.length; i++) {
    if (countryObs.value < Util.quantiles[i].value) {
      if (params.type === 'name') return Util.quantiles[i].name
      else return i
    } else if (
      i === Util.quantiles.length - 1 &&
      countryObs.value >= Util.quantiles[i].value
    ) {
      if (params.type === 'name') return 'Very high'
      return i + 1
    }
  }
  return null
}

Util.getDateTimeRange = item => {
  const data = item.value
  if (data === null) return ''
  const first = data[0]['date_time']
  const last = data[data.length - 1]['date_time']

  if (first === undefined) return ''

  const firstStr = new Date(first.replace(/-/g, '/')).toLocaleString('en-us', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const firstStrNoYear = new Date(first.replace(/-/g, '/')).toLocaleString(
    'en-us',
    {
      month: 'short',
      timeZone: 'UTC',
    }
  )
  const lastStr = new Date(last.replace(/-/g, '/')).toLocaleString('en-us', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const sameYear = first.slice(0, 4) === last.slice(0, 4)

  if (firstStr === lastStr) return `${firstStr}`
  else if (sameYear) return `${firstStrNoYear} to ${lastStr}`
  else return `${firstStr} to ${lastStr}`
}

Util.formatDatetimeApi = dt => {
  const year = dt.getFullYear()
  const monthTmp = dt.getMonth() + 1
  const month = monthTmp > 9 ? '' + monthTmp : '0' + monthTmp

  const dateTmp = dt.getDate()
  const date = dateTmp > 9 ? '' + dateTmp : '0' + dateTmp

  // const hoursTmp = dt.getHours();
  // const hours = hoursTmp > 9 ? ('' + hoursTmp) : ('0' + hoursTmp);
  //
  // const minutesTmp = dt.getMinutes();
  // const minutes = minutesTmp > 9 ? ('' + minutesTmp) : ('0' + minutesTmp);
  //
  // const secondsTmp = dt.getSeconds();
  // const seconds = secondsTmp > 9 ? ('' + secondsTmp) : ('0' + secondsTmp);

  const yyyymmdd = `${year}-${month}-${date}`
  return `${yyyymmdd}`
  // const hhmmss = `${hours}:${minutes}:${seconds}`;
  // return `${yyyymmdd}T${hhmmss}`;
}

Util.globalMaxDate = () => {
  const globalMaxDate = new Date('2000/01/01')
  globalMaxDate.setDate(1)
  globalMaxDate.setMonth(0)
  globalMaxDate.setYear(2020)
  return globalMaxDate
}

Util.today = () => {
  const today = new Date()
  return today
}

Util.getDatetimeStamp = (datum, type = 'year') => {
  if (!datum || datum['value'] === null) return ''

  let datetimeStamp
  const date_time = datum['date_time'].replace(/-/g, '/')
  if (type === 'month') {
    datetimeStamp = new Date(date_time).toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
  } else if (type === 'year') {
    datetimeStamp = new Date(date_time).toLocaleString('en-US', {
      year: 'numeric',
      timeZone: 'UTC',
    })
  }
  return `${datetimeStamp}`
}

Util.importAll = r => {
  let images = {}
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item)
    return null
  })
  return images
}

// Sorting functions to sort alerts and statuses data by datetime and by
// unique ID (sequential relative to submission order).
Util.sortByDatetime = (a, b) => {
  const dateA = new Date(a.effective_dtm)
  const dateB = new Date(b.effective_dtm)
  if (dateA > dateB) return -1
  if (dateA < dateB) return 1
  return 0
}
Util.sortByAlertId = (a, b) => {
  if (a.alert_id > b.alert_id) return -1
  if (a.alert_id < b.alert_id) return 1
  return 0
}
Util.sortByDetailsId = (a, b) => {
  if (a.details_id > b.details_id) return -1
  if (a.details_id < b.details_id) return 1
  return 0
}
Util.sortByName = (a, b) => {
  if (a.name > b.name) return -1
  if (a.name < b.name) return 1
  return 0
}
Util.sortByField = field => {
  return (a, b) => {
    if (a[field] > b[field]) return -1
    if (a[field] < b[field]) return 1
    return 0
  }
}

// Percentize number
Util.percentize = val => {
  if (val > 100 || val < -100) {
    return '>200%'
  } else return parseFloat(val).toFixed(0) + '%'
}

// Format delta value
Util.percentizeDelta = deltaTmp => {
  const delta = Math.abs(deltaTmp)
  const d3Format = d3.format(',.0%')
  const d3FormattedNum = d3Format(delta)

  if (Math.abs(delta) > 1) return '>100%'

  if (d3FormattedNum === '0%' && delta !== 0) {
    return '<1%'
  } else {
    return d3FormattedNum
  }
}

// Format incidence value
Util.formatIncidence = inc => {
  if (inc === 0) return '0'
  else if (inc < 0.001) return '<0.001'
  else return Util.formatSI(inc)
}

// Decimalize-ize numbers to one place
Util.decimalizeOne = d3.format('.1f')

// Comma-ize numbers
Util.comma = function (num) {
  const resultTmp = d3.format(',.0f')(num)
  return resultTmp
}

// Format money as comma number with USD suffix
Util.money = val => {
  return Util.comma(val)
}

Util.formatSIInteger = val => {
  if (val === 0) return '0'
  else if (val <= 999) return val
  else return d3.format('.2s')(val)
}

// Format using standard suffixes
export const formatSI = val => {
  // If zero, just return zero
  if (val === 0) return '0'
  // If 1 or less, return the value with three significant digits. (?)
  else if (val < 1) return d3.format('.3f')(val)
  // If between 1 - 1000, return value with two significant digits.
  else if (val >= 1 && val < 1000) return comma(d3.formatPrefix('.2f', 1)(val))
  // k
  // If 1k or above, return SI value with two significant digits
  else if (val >= 1000 && val < 1000000)
    return d3.formatPrefix('.2f', 1000)(val)
  // k
  // If 1k or above, return SI value with two significant digits
  else if (val >= 1000000 && val < 1000000000)
    return d3.formatPrefix('.2f', 1000000)(val)
  // M
  else return d3.formatPrefix(',.2s', 1000000000)(val).replace(/G/, 'B') // B
}

/**
 * Capitalizes each word in the input text and returns the result.
 * @method toTitleCase
 * @param  {[string]}    str [Input string.]
 * @return {[string]}        [Capitalized input string]
 */
Util.toTitleCase = str => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

// Formatting functions for dates and datetimes.
Util.formatDatetime = input => {
  return input.toLocaleString('en-us', {
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    day: 'numeric',
  })
}
Util.formatDate = input => {
  return input.format('MMM D, YYYY')
}

Util.formatDateRange = range => {
  const startStr = range[0].format('MMM D, YYYY')
  const endStr = range[1].format('MMM D, YYYY')
  if (range[0].isSame(range[1], 'day')) return `on ${startStr}`
  else return `from ${startStr} to ${endStr}`
}

Util.getWrappedText = (text, thresh = 20) => {
  // Get label text
  // If it's more than 20 chars try to wrap it
  const tryTextWrap = text.length > thresh
  let svgLabelTspans
  if (tryTextWrap) {
    svgLabelTspans = []

    // Split names by word
    const words = text.split(' ')

    // Concatenate words for each tspan until over 20 chars
    let curTspan = ''
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if ((curTspan + ' ' + word).length < thresh) {
        curTspan += ' ' + word
      } else {
        svgLabelTspans.push(curTspan)
        curTspan = word
      }
    }
    if (curTspan !== '') svgLabelTspans.push(curTspan)
  }

  // Otherwise just use the name as-is
  else {
    svgLabelTspans = [text]
  }
  return svgLabelTspans
}

export default Util

/**
 * Check to see if two arrays match
 * https://gomakethings.com/how-to-check-if-two-arrays-are-equal-with-vanilla-js/
 * @method
 * @param  {[type]} arr1 [description]
 * @param  {[type]} arr2 [description]
 * @return {[type]}      [description]
 */
export const arraysMatch = function (arr1, arr2) {
  arr1.sort()
  arr2.sort()

  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }

  // Otherwise, return true
  return true
}

/**
 * Given the min and max size of the scale, and the maximum value that the
 * data takes on, returns a scale with log base 10 interpolation between the
 * min size and max size up to the max value.
 * @method getLog10Scale
 * @param  {[type]}      minSize  [description]
 * @param  {[type]}      maxSize  [description]
 * @param  {[type]}      maxValue [description]
 * @return {[type]}               [description]
 */
export const getLog10Scale = ({
  minSize,
  maxValue,
  featurePropertyKey,
  zeroSize = 0,
}) => {
  // divide into 5 decades ending with the maxValue
  const x = Math.log10(maxValue)

  // store interpolator breakpoints as pairs of elements:
  // 1: value
  // 2: scale value at that value
  const decades = [0, zeroSize, 1, minSize]

  // total decades to define, including for zero and 1
  const totalDecades = 7

  // create decades
  for (let i = 1; i < totalDecades - 1; i++) {
    decades.push(Math.pow(10, x * (i / (totalDecades - 2))))
    decades.push(minSize * Math.pow(2, i))
  }

  // return scale with decades
  return [
    'interpolate',
    ['linear'],
    ['feature-state', featurePropertyKey],
    ...decades,
  ]
}

/**
 * Returns true if the object has no keys, false otherwise.
 * @method isEmpty
 * @param  {[type]}  d [description]
 * @return {Boolean}   [description]
 */
export const isEmpty = d => {
  if (d === undefined || Object.keys(d).length === 0) return true
  else return false
}

export const getMetricInfo = id => {
  if (id === -9999) {
    return {
      name: 'Notional metric number -9999',
      value: v => comma(v),
      unit: v => (v === 1 ? 'unit' : 'units'),
      trendTimeframe: 'over prior 24 hours',
    }
  } else if (id === -9997) {
    return {
      name: 'Notional metric number -9997',
      value: v => comma(v),
      unit: v => (v === 1 ? 'unit' : 'units'),
      trendTimeframe: 'over prior 24 hours',
    }
  }
}

// misc functions
// formatting values
export const percentize = val => {
  if (val > 100 || val < -100) {
    return '>200%'
  } else return parseFloat(val).toFixed(0) + '%'
}

export const percentizeNoSign = val => {
  const temp = percentize(val)
  return temp.replace('-', '')
}

export const comma = num => {
  const resultTmp = d3.format(',.0f')(num)
  return resultTmp
}

export const getAndListString = (arr, conjunction = 'and') => {
  if (arr === undefined || arr == null || arr.length === 0) return ''
  else if (arr.length === 1) return arr[0]
  else if (arr.length === 2) return `${arr[0]} ${conjunction} ${arr[1]}`
  else {
    const first = arr.slice(0, arr.length - 1).join(', ')
    return first + ', ' + conjunction + ' ' + arr[arr.length - 1]
  }
}

export const isLightColor = color => {
  if (color === undefined) return false
  // Variables for red, green, blue values
  var r, g, b, hsp

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    )

    r = color[1]
    g = color[2]
    b = color[3]
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))

    r = color >> 16
    g = (color >> 8) & 255
    b = color & 255
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  // Using the HSP value, determine whether the color is light or dark
  return hsp > 127.5
}

// return string with first char capitalized
export const getInitCap = str => {
  if (str === undefined || str === null) return str
  else
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1, str.length)
}

/**
 * Returns the formatted value of `d` following the sequence of object keys
 * provided in `keys`, otherwise returns a "No data" JSX element.
 * @method getFormattedValue
 * @param  {[type]}        d         [description]
 * @param  {[type]}        fields    [description]
 * @param  {[type]}        formatter [description]
 * @return {[type]}                  [description]
 */
export const getFormattedValue = ({
  d,
  keys,
  formatter = v => v,
  noData = '',
  asJsx = v => v,
}) => {
  let dLevel = d
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    dLevel = dLevel[key]
    if (dLevel === undefined || dLevel === null) {
      return noData
    }
  }
  if (asJsx) {
    return asJsx(dLevel, formatter(dLevel))
  } else return formatter(dLevel)
}

export const arrSum = arr => {
  return arr.reduce(function (a, b) {
    return a + b
  }, 0)
}

export const defined = (datum, keys, finalVal) => {
  let datumLevel = datum
  keys.forEach((k, i) => {
    if (datumLevel[k] === undefined) {
      if (i === keys.length - 1) {
        datumLevel[k] = finalVal
      } else {
        datumLevel[k] = {}
      }
    }
    datumLevel = datumLevel[k]
  })
}

export const sortByOverallAdoptionStatus = (
  a,
  b,
  order,
  dataField,
  rowA,
  rowB
) => {
  switch (rowA.adoptionScoreLevel) {
    case 'Most':
      a = 5
      break
    case 'Many':
      a = 4
      break
    case 'Some':
      a = 3
      break
    case 'Few':
      a = 2
      break
    case 'Very few':
      a = 1
      break
    default:
      a = 0
  }
  switch (rowB.adoptionScoreLevel) {
    case 'Most':
      b = 5
      break
    case 'Many':
      b = 4
      break
    case 'Some':
      b = 3
      break
    case 'Few':
      b = 2
      break
    case 'Very few':
      b = 1
      break
    default:
      b = 0
  }
  if (a == b) {
    return order === 'asc'
      ? rowA.overall - rowB.overall
      : rowB.overall - rowA.overall
  } else {
    return order === 'asc' ? a - b : b - a
  }
}

export const sortByAreaScore = (
  a,
  b,
  order,
  dataField,
  rowA,
  rowB,
  property
) => {
  switch (rowA.areaScore) {
    case 'Most':
      a = 5
      break
    case 'Many':
      a = 4
      break
    case 'Some':
      a = 3
      break
    case 'Few':
      a = 2
      break
    case 'Very few':
      a = 1
      break
    default:
      a = 0
  }
  switch (rowB.areaScore) {
    case 'Most':
      b = 5
      break
    case 'Many':
      b = 4
      break
    case 'Some':
      b = 3
      break
    case 'Few':
      b = 2
      break
    case 'Very few':
      b = 1
      break
    default:
      b = 0
  }
  if (a == b) {
    return order === 'asc'
      ? rowA[property] - rowB[property]
      : rowB[property] - rowA[property]
  } else {
    return order === 'asc' ? a - b : b - a
  }
}

export const sortBySpecificAdoptionStatus = (a, b, order) => {
  switch (a) {
    case 'adopted':
      a = 3
      break
    case 'partial':
      a = 2
      break
    case 'not adopted':
      a = 1
      break
    default:
      a = 0
  }
  switch (b) {
    case 'adopted':
      b = 3
      break
    case 'partial':
      b = 2
      break
    case 'not adopted':
      b = 1
      break
    default:
      b = 0
  }
  if (order === 'asc') {
    // asc
    return a - b
  }
  return b - a // desc
}

export const formatDate = (input, dateType) => {
  if (dateType === 0 || dateType === 1) return moment(input).format('MMM YYYY')
  else if (dateType === 2) return moment(input).format('YYYY')
  else return null
}

/**
 * Execute queries in parallel
 * @method
 * @param  {[type]} queries [description]
 * @return {[type]}         [description]
 */
export const execute = async function ({ queries }) {
  const results = {}
  for (const [k, v] of Object.entries(queries)) {
    const res = await v
    results[k] = res
  }
  return results
}

// Project-specific exports // --------------------------------------------- //
export const areaScorecardDefs = [
  {
    abbrev: 'CT',
    area: 'Clinical / treatment',
  },
  {
    abbrev: 'TP',
    area: 'Testing and prevention',
  },
  {
    abbrev: 'S',
    area: 'Structural',
  },
  {
    abbrev: 'HS',
    area: 'Health systems',
  },
]

/**
 * Convert KB to MB
 */
export const bytesToMegabytes = v => {
  return Util.decimalizeOne(parseFloat(v) / 1000000.0) + ' Mb'
}

/**
 * Make bookmarked items available to a callback function
 */
export const withBookmarkedIds = async ({ callback }) => {
  // get bookmarked items
  if (typeof localStorage !== 'undefined') {
    // getter
    const bookmarkedIds = localStorage.getItem('bookmarkedIds') || ''
    if (callback)
      callback(
        bookmarkedIds
          .split(',')
          .filter(d => d !== '')
          .map(d => +d)
      )
  }
}

// remove a bookmark
export const removeBookmark = ({ id, callback }) => {
  if (typeof localStorage !== 'undefined') {
    // get bookmarked items
    const bookmarkedIds = localStorage.getItem('bookmarkedIds') || []
    const newBookmarkedIds = bookmarkedIds.filter(d => +d !== +id)
    localStorage.setItem('bookmarkedIds', newBookmarkedIds)
    if (callback) callback(newBookmarkedIds)
  }
}

// define icon names to use for each section
export const iconNamesByField = {
  // key_topics: 'device_hub',
  key_topics: 'topic',
  covid_tags: 'covid_tags',
  // covid_tags: 'topic',
  // key_topics: 'speech',
  // key_topics: 'speech_orange',
  //authors: 'person',
  authors: 'apartment', // this is actually the icon for publishing org
  author_types: 'outbreak_events',
  years: 'event',
  funders: 'monetization_on',
  types_of_record: 'insert_drive_file',
  // events: 'outbreak_events',
  // events: 'rings',
  // events: 'rings_orange',
  events: 'caution',
  // events: 'caution_orange',
}

// return icon JSX by name
export const getIconByName = ({
  field = undefined,
  iconName = iconNamesByField[field],
  styles = {},
  disabled = false,
}) => {
  // special icon?
  const specialIcons = {
    // network blob
    outbreak_events: events,
    outbreak_events_blue: events_blue,
    outbreak_events_disabled: events_disabled,

    // speech bubble
    speech,
    speech_orange,
    speech_disabled,

    // caution sign
    caution,
    caution_orange,
    caution_disabled,
    caution_orange_disabled: caution_disabled,

    // rings
    rings,
    rings_orange,
    rings_orange_disabled: rings_disabled,
    rings_disabled,

    // covid_tags
    covid_tags,
    covid_tags_orange,
    covid_tags_orange_disabled: covid_tags_disabled,
    covid_tags_disabled,
  }
  const specialIcon = specialIcons[iconName + (disabled ? '_disabled' : '')]
  const icon =
    specialIcon !== undefined ? (
      <img className={styles.specialIcon} src={specialIcon} />
    ) : (
      <>{iconName && <i className={'material-icons'}>{iconName}</i>}</>
    )
  return icon
}

// return JSX of text array as a bullet-delimited list
export function asBulletDelimitedList(d, i, all) {
  return (
    <React.Fragment
      key={d}
    >
      {d}
      {i !== all.length - 1 ? <span>&nbsp;•&nbsp;</span> : ''}
    </React.Fragment>
  )
}

// toggle specific filter on / off given a datum that contains it
export const toggleFilter = ({
  e,
  datum,
  getFilterVal,
  filters,
  filterKey,
  setFilters,
  setSearchText,
  openNewPage = false,
  alwaysStartNew = false,
}) => {
  e.stopPropagation()

  const thisVal = getFilterVal(datum).toString()

  // if on a page other than search, open a new search page
  if (openNewPage) {
    if (typeof window !== 'undefined') {
      navigate(
        `/search/?filters={"${filterKey}":["${thisVal}"]}&search_text=&show_overlay=false`,
        {
          state: {
            filters: { [filterKey]: [thisVal] },
            searchText: '',
            showOverlay: false,
          },
        }
      )
    }
  } else {
    // otherwise, update filters
    const newFilters = { ...filters }
    const curVals = filters[filterKey]
    const newVals = curVals !== undefined ? [...filters[filterKey]] : []
    if (!newVals.includes(thisVal) || alwaysStartNew) {
      newVals.push(thisVal)
      newFilters[filterKey] = newVals
      // filter by just this tag
      setFilters({ [filterKey]: [thisVal.toString()] })
      setSearchText('')
    }

    // // OLD update filters
    // // otherwise, update filters
    // const newFilters = { ...filters }
    // const curVals = filters[filterKey]
    // const newVals = curVals !== undefined ? [...filters[filterKey]] : []
    // if (!newVals.includes(thisVal)) {
    //   newVals.push(thisVal)
    //   newFilters[filterKey] = newVals
    // } else {
    //   newFilters[filterKey] = newVals.filter(v => v !== thisVal)
    // }
    // if (newFilters[filterKey].length === 0) {
    //   delete newFilters[filterKey]
    // }
    // setFilters(newFilters)
  }
}

/**
 * Get highlighted text snippets in the card data and assign them to the
 * `card` object that holds card text, if found, otherwise assign normal txt
 * @method getHighlightSegments
 * @param  {[type]}             text           [description]
 * @param  {String}             [type='normal' }]            [description]
 * @return {[type]}                            [description]
 */
export const getHighlightSegments = ({
  text,
  type = 'normal',
  maxWords = null,
  highlightAll = false,
  styles = {},
  getTooltipText = () => null,
  key = '',
}) => {
  // if highlight all, simply return the entire text highlighted.
  if (highlightAll) {
    return (
      <span
        data-for={'searchHighlightInfo'}
        data-tip={getTooltipText('remove')}
        className={classNames(styles.highlighted, styles[type])}
      >
        {text}
      </span>
    )
  } else {
    // replace text within highlight tags with JSX, taking care not to
    // introduce extra spaces before or after the highlighted words
    const textArr = text
      .replace(/<\/highlight>/g, '<highlight>')
      .replace(/"/g, "'")
      .split('<highlight>')
    const firstFewFrags = text.split(/<\/?highlight>/g).slice(0, 3)

    // was there a space after the last highlighted word? If so, don't trim it
    const firstFewStr = `${firstFewFrags[0]}<highlight>${firstFewFrags[1]}</highlight>${firstFewFrags[2]}`

    // check whether we need to trim extra spaces out of the final string
    const trimPost = /\/highlight>(?!\s)/g.test(firstFewStr)
    const trimPre = !/(?=\s)\s<highlight>/g.test(firstFewStr)

    // arr to hold new text (with highlights)
    const newText = []

    // for each text chunk, wrap in highlight JSX tag
    textArr.forEach((d, i) => {
      // odd segments are highlighted portions
      const highlightSegment = i % 2 === 1
      if (highlightSegment) {
        newText.push(
          <span
            key={d}
            data-for={'searchHighlightInfo'}
            data-tip={key !== 'title' ? getTooltipText('remove') : null}
            className={classNames(styles.highlighted, styles[type])}
          >
            {d}
          </span>
        )
      } else {
        // push normal text if not a highlight snippet
        newText.push(
          <span
            key={d}
            data-for={'searchHighlightInfo'}
            data-tip={key !== 'title' ? getTooltipText('add') : null}
          >
            {d}
          </span>
        )
      }
    })

    // if max words provided, trim
    let pre, post, highlighted
    let nWords = 0
    if (maxWords !== null) {
      const trimmedText = []
      const halfMax = maxWords / 2
      let done = false
      let i = 0
      while (!done && i < newText.length) {
        const frag = newText[i]

        if (pre === undefined) {
          // get first words of first fragment
          const preWordsAll = frag.props.children.split(' ')
          const preWordsTrimmed = preWordsAll.slice(
            Math.max(preWordsAll.length - halfMax, 0),
            preWordsAll.length
          )

          // add ellipsis only if fragment is the very beginning or end of text
          const ellipsis = Math.max(preWordsAll.length - halfMax, 0) !== 0
          pre = `${ellipsis ? '...' : ''}${preWordsTrimmed.join(' ')}`
          nWords += preWordsTrimmed.length
          trimmedText.push(<span>{trimPre ? pre.trim() : pre}</span>)
        } else if (highlighted === undefined) {
          highlighted = frag
          trimmedText.push(highlighted)
        } else if (post === undefined) {
          const wordsAll = frag.props.children.split(' ')
          const wordsTrimmed = wordsAll.slice(0, halfMax)

          const ellipsis = wordsTrimmed.length !== wordsAll.length
          post = ` ${wordsTrimmed.join(' ')}${ellipsis ? '...' : ''}`
          nWords += wordsTrimmed.length
          trimmedText.push(<span>{trimPost ? post.trim() : post}</span>)
        }
        done =
          pre !== undefined && post !== undefined && highlighted !== undefined
        i += 1
        continue
      }
      return trimmedText
    } else return newText
  }
}

/**
 * Get the appropriate tooltip text function for filter tags based on the
 * context
 * @method getTooltipTextFunc
 * @param  {[type]}           detail   [description]
 * @param  {[type]}           bookmark [description]
 * @param  {[type]}           related  [description]
 * @return {[type]}                    [description]
 */
export const getTooltipTextFunc = ({ detail, bookmark, related }) => {
  const getTooltipText = add => {
    if (add === 'add') return 'Click to start a new search filtered by this tag'
    else return null

    // OLD: allow toggling on/off
    // if (bookmark) {
    //   return 'Click to start a new search filtered by this tag'
    // } else if (detail || related) {
    //   return `Click to return to your search and ${add} this filter tag`
    // } else {
    //   return `Click to ${add} this filter tag`
    // }
  }
  return getTooltipText
}

// default context
export const defaultContext = {
  data: { filterCounts: undefined, items: {}, defs: [], metadata: [] },
  setData: () => {
    throw new Error('Context setter undefined')
  },
}

// filter defs
export const filterDefs = {
  years: {
    field: 'years',
    key: 'years',
    label: 'Year',
    resultLabel: 'year',
    choices: [],
    custom: true,
    order: 0,
  },
  key_topics: {
    field: 'key_topics',
    key: 'key_topics',
    label: 'Topic area',
    resultLabel: 'topic area',
    choices: [],
    order: 1,
  },
  covid_tags: {
    field: 'covid_tags',
    key: 'covid_tags',
    label: 'Tags',
    resultLabel: 'tag',
    choices: [],
    order: 2,
  },
  author_types: {
    field: 'author.type_of_authoring_organization',
    key: 'author_types',
    label: (
      <div>
        Publishing
        <br /> org. type
      </div>
    ),
    resultLabel: 'publishing organization type',
    choices: [],
    order: 3,
  },
  authors: {
    field: 'author.id',
    key: 'authors',
    label: (
      <div>
        Publishing
        <br /> organization
      </div>
    ),
    resultLabel: 'publishing organization',
    choices: [],
    order: 4,
  },
  events: {
    field: 'event.name',
    key: 'events',
    label: 'Event',
    resultLabel: 'event',
    choices: [],
    order: 5,
  },
  funders: {
    field: 'funder.name',
    key: 'funders',
    label: 'Funder',
    resultLabel: 'funder',
    choices: [],
    order: 6,
  },
  types_of_record: {
    field: 'type_of_record',
    key: 'types_of_record',
    label: 'Document type',
    resultLabel: 'document type',
    choices: [],
    order: 7,
  },
}

/**
 * Orders filter keys based on their order values in `filterDefs`
 * @param {string} a First filter name
 * @param {string} b Second filter name
 * @returns The order value
 */
export const sortByFilterOrder = function (a, b) {
  const aRank = filterDefs[a].order
  const bRank = filterDefs[b].order
  if (aRank > bRank) return 1
  if (bRank > aRank) return -1
  else return 0
}

import React, { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import YearsCheckboxSet from './YearsCheckboxSet'
import styles from './options.module.scss'

const YearsCheckboxSetWrapper = () => {
  const [filters, setFilters] = useState({})
  return <YearsCheckboxSet
    filters={filters}
    field={'years'}
    setFromYear={() => ''}
    setToYear={() => ''}
    curFilterSectionData={{
      label: 'years',
      field: 'years',
      choices: ['2020', '2019', '2018'].map(value => {
        return { value, label: value }
      }),
      iconName: null,
    }}
    {...{ setFilters, styles }}
  />
};

it('YearsCheckboxSet checkbox checks after click', () => {
  const { container, queryAllByText } = render(
    <YearsCheckboxSetWrapper />
  )

  expect(queryAllByText(/2019/)).toBeTruthy()
  expect(queryAllByText(/1900/i)).toHaveLength(0)
  const cbValues = ['2019', 'custom']
  cbValues.forEach(cbValue => {
    const cbLabel = container.querySelector(`label[for="${cbValue}"]`)
    const cb = cbLabel.querySelector(`input[value="${cbValue}"]`)
    const cbIcon = cbLabel.querySelector('span:first-child')
    expect(cbLabel).toBeTruthy()
    expect(cbIcon).toBeTruthy()
    expect(cb).toBeTruthy()
    expect(cbIcon.className).toContain('check')
    expect(cbIcon.className).not.toContain('visible')
    fireEvent.click(cb)
    expect(cbIcon.className).toContain('visible')
  })
})

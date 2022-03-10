import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import YearsCheckboxSet from './YearsCheckboxSet'
import styles from './options.module.scss'

it('YearsCheckboxSet changes the text after click', () => {
  const { container, queryByText, queryAllByText } = render(
    <YearsCheckboxSet
      filters={{ "years": ["2019"] }}
      field={'years'}
      setFromYear={() => ''}
      setToYear={() => ''}
      setFilters={() => ''}
      curFilterSectionData={{
        label: 'years',
        field: 'years',
        choices: ['2020', '2019', '2018'].map(value => { return { value, label: value } }),
        iconName: null,
      }}
      {...{ styles }}
    />
  )

  expect(queryAllByText(/2019/)).toBeTruthy()
  expect(queryAllByText(/1900/i)).toHaveLength(0)
  const checkbox = container.querySelector('input[value="2019"]')
  expect(checkbox).toBeTruthy()
  // expect(queryByText(/1900/i)).toBeFalsy()
  // const checkbox = getByText(/2019/)
  // fireEvent.click(checkbox)
  // screen.debug()

  // expect(queryByLabelText(/on/i)).toBeTruthy()
})

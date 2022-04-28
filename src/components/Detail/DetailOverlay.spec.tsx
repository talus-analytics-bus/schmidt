/**
 * Simple test to test that Jest is working
 */
import React from 'react'
import { render } from '@testing-library/react'
import DetailOverlay from './DetailOverlay.js'
import { appContext } from '../misc/ContextProvider'
import { MOCK_ITEM_QUERY_RES, VALID_APPLICABILITY_VALS } from './testData'
jest.mock("../misc/ItemQuery")

describe('DetailsOverlay component', () => {

  /**
   * Define test item. Currently based on the mock item query response above
   * Use code like below commented `await` stmt to get test data from API instead
   */
  const testItem = MOCK_ITEM_QUERY_RES.data
  // const testItemData = (await ItemQuery({})).data

  const component = render(
    <appContext.Provider
      value={{
        data: { items: { [testItem.data.id]: testItem.data } },
        setData: () => '',
      }}
    >
      <DetailOverlay floating id={testItem.data.id} />
    </appContext.Provider>
  )


  it('should show valid values for "Applicability"', async () => {

    const header: HTMLElement = await component.findByText('Applicability (US or global)')
    expect(header).toBeTruthy()

    const val: string = header.nextSibling?.firstChild?.textContent || ''
    // valid value?
    const validVal: boolean = VALID_APPLICABILITY_VALS.includes(val)
    expect(validVal).toStrictEqual(true)

    // shows unspecified if undefined or null?
    const showsUnspecifiedIfAppropriate: boolean =
      ![undefined, null].includes(testItem.data.geo_specificity) ||
      val === 'Unspecified'
    expect(showsUnspecifiedIfAppropriate).toStrictEqual(true)
  })
})
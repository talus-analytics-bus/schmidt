/**
 * Simple test to test that Jest is working
 */
import React from 'react'
import { cleanup, render } from '@testing-library/react'
// import ItemQuery from '../misc/ItemQuery'
import DetailOverlay from './DetailOverlay.js'
import { appContext } from '../misc/ContextProvider'
import ItemQuery from "../misc/ItemQuery"
import { MOCK_ITEM_QUERY_RES, VALID_APPLICABILITY_VALS } from './testData'


jest.mock("../misc/ItemQuery")
afterEach(() => {
  cleanup()
})

describe('DetailsOverlay component', () => {


  /**
   * Define test item. Currently based on the mock item query response above
   * Use code like below commented `await` stmt to get test data from API instead
   */
  const testItem = MOCK_ITEM_QUERY_RES.data
  // const testItemData = (await ItemQuery({})).data

  /**
   * Renders the DetailOverlay component and returns an object will access to
   * testing functions for it.
   * @returns Object with testing library functions for the rendered component
   */
  function getQueries() {
    return render(
      <appContext.Provider
        value={{
          data: { items: { [testItem.data.id]: testItem.data } },
          setData: () => '',
        }}
      >
        <DetailOverlay floating id={testItem.data.id} />
      </appContext.Provider>
    )
  }

  // const { findByText } = getQueries()



  it.only('should show valid values for "Applicability"', async () => {

    // correct header?
    const { findByText } = getQueries()
    const header: HTMLElement = await findByText('Applicability (US or global)')
    // const heade2r: HTMLElement = await findByText('Applicability (US or global)')
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

  // it('should show valid values for "Applicability" again', async () => {

  //   // correct header?
  //   const { findByText } = getQueries()
  //   const header: HTMLElement = await findByText('Applicability (US or global)')
  //   expect(header).toBeTruthy()

  //   const val: string = header.nextSibling?.firstChild?.textContent || ''
  //   // valid value?
  //   const validVal: boolean = VALID_APPLICABILITY_VALS.includes(val)
  //   expect(validVal).toStrictEqual(true)

  //   // shows unspecified if undefined or null?
  //   const showsUnspecifiedIfAppropriate: boolean =
  //     ![undefined, null].includes(testItem.data.geo_specificity) ||
  //     val === 'Unspecified'
  //   expect(showsUnspecifiedIfAppropriate).toStrictEqual(true)
  // })




  const testCases: { headerName: string; fieldName: 'covid_tags' | 'key_topics' }[] = [
    // { headerName: 'Tags', fieldName: 'covid_tags' },
    { headerName: 'Topic area', fieldName: 'key_topics' },
  ]
  it.each(testCases)(
    'should show valid values for list of "$headerName"',
    async ({ headerName, fieldName }: { headerName: string, fieldName: 'covid_tags' | 'key_topics' }) => {

      // if this test fails, check that the values referenced in the 'siblings'
      // `forEach` loop below are being obtained from the right DOM nodes

      // correct header?
      const { findByText } = render(
        <appContext.Provider
          value={{
            data: { items: { [testItem.data.id]: testItem.data } },
            setData: () => '',
          }}
        >
          <DetailOverlay floating id={testItem.data.id} />
        </appContext.Provider>
      )
      const header: HTMLElement = await findByText(headerName)
      expect(header).toBeTruthy()

      // expect all tag names listed in UI to be same as values in data
      let allValid: boolean = true
      const fieldVals = fieldName in testItem.data ? testItem.data[fieldName] : []
      const nTags: number = (fieldVals || []).length
      if (nTags > 0) {
        const valuesEl: ChildNode | null = header.nextSibling
        expect(valuesEl).toBeTruthy()
        if (valuesEl === null) return
        if (
          !testItem.data[fieldName].some(
            (t: string) =>
              t ===
              valuesEl.firstChild?.firstChild?.firstChild?.firstChild
                ?.textContent ||
              t === valuesEl.firstChild?.firstChild?.firstChild?.textContent
          )
        )
          allValid = false
      }
      // valid value?
      expect(allValid).toStrictEqual(true)
    }
  )

})



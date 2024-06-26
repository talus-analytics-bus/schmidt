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



    const testCases: { headerName: string; fieldName: 'covid_tags' | 'key_topics' }[] = [
        { headerName: 'Tags', fieldName: 'covid_tags' },
    ]
    it.each(testCases)(
        'should show valid values for list of "$headerName"',
        async ({ headerName, fieldName }: { headerName: string, fieldName: 'covid_tags' | 'key_topics' }) => {

            const header: HTMLElement = await component.findByText(headerName)
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



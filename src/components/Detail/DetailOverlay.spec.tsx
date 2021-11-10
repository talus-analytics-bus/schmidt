/**
 * Simple test to test that Jest is working
 */
import React from 'react'
import { render } from '@testing-library/react'
// import ItemQuery from '../misc/ItemQuery'
import DetailOverlay from './DetailOverlay.js'
import { appContext } from '../misc/ContextProvider'

it('should show valid values for "Applicability"', async () => {
  // correct header?
  const { findByText } = getQueries()
  const header: HTMLElement = await findByText('Applicability')
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

const testCases: { headerName: string; fieldName: string }[] = [
  { headerName: 'Tags', fieldName: 'covid_tags' },
  { headerName: 'Topic area', fieldName: 'key_topics' },
]
it.each(testCases)(
  'should show valid values for list of "$headerName"',
  async ({ headerName, fieldName }) => {
    // if this test fails, check that the values referenced in the 'siblings'
    // `forEach` loop below are being obtained from the right DOM nodes

    // correct header?
    const { findByText } = getQueries()
    const header: HTMLElement = await findByText(headerName)
    expect(header).toBeTruthy()

    // expect all tag names listed in UI to be same as values in data
    let allValid: boolean = true
    const nTags: number = testItem.data[fieldName].length
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

/**
 * Valid values for the "Applicability" field.
 */
const VALID_APPLICABILITY_VALS: string[] = [
  'United States of America',
  'Global',
  'N/A',
  'Unspecified',
]

/**
 * Mock item query response (see `src/components/misc/ItemQuery.ts`)
 * Can obtain from API via GET /get/item
 * Defined on Oct 18, 2021
 */
const MOCK_ITEM_QUERY_RES: Record<string, any> = {
  data: {
    data: {
      id: 1,
      internal_date_of_initial_entry: '2020-09-13',
      date: '2019-11-01',
      date_type: 1,
      type_of_record: 'Report',
      key_topics: ['Strategic planning'],
      title:
        'Ending the Cycle of Crisis and Complacency in U.S. Global Health Security',
      description:
        "The Center for Strategic and International Studies Commission on Strengthening America's Health Security developed this report to advocate that U.S. national policymakers improve pandemic prevention and preparedness. The report advocated for sustained funding for a variety of domestic programs and international programs, including at the World Health Organization and World Bank. It supported improved medical preparedness through investment in new vaccines and therapeutics and reinstatement of leadership at the U.S. National Security Council for pandemic response.",
      related_description: '',
      sub_organizations:
        'CSIS Commission on Strengthening America’s Health Security',
      link:
        'https://www.csis.org/analysis/ending-cycle-crisis-and-complacency-us-global-health-security',
      internal_research_note: 'MONTH/YEAR; Source=think tank',
      ra_coder_initials: 'RR',
      final_review: true,
      file_search_text:
        'november 2019\nending the cycle of  \ncrisis and complacency  \nin u.s. global  \nhealth security\na report of the csis commission on  \nstrengthening america’s health security\nco-chairs  project director \nkelly ayotte j. stephen morrison\njulie gerberdingnovember 2019\nending the cycle of  \ncrisis and complacency  \nin u.s. global  \nhealth security\na report of the csis commission on  \nstrengthening america’s health security\nco-chairs  project director \nkelly ayotte jstephen morrison\njulie gerberdingii\ny\nurit about csis\nc\n hse\nalt\nhe established in washington, d.c., over 50 years ago, the \n al\nob center for strategic and international studies (csis) is a \ngl\n.. us bipartisan, nonprofit policy research organization dedicated \n  yin to providing strategic insights and policy solutions to help \nc\ncen decisionmakers chart a course toward a better world.\na\nmpl\nco in late 2015, thomas j. pritzker was named chairman of \n d\nn\n crisisa tuh.es .c sseinsa btoora srdam of n turunsnt e(eds-.g mar).,  pwrhit',
      authoring_organization_has_governance_authority: false,
      source_id: 'recHyKOiV5Omei8mL',
      tags: [],
      exclude_pdf_from_site: false,
      is_covid_commission_doc: false,
      field_relationship: null,
      geo_specificity: undefined,
      covid_topics: [],
      covid_tags: [],
      authors: [
        {
          id: 8,
          authoring_organization:
            'Center for Strategic and International Studies',
          type_of_authoring_organization: 'Non-governmental organization',
          if_national_country_of_authoring_org: null,
          if_national_iso2_of_authoring_org: null,
          acronym: 'CSIS',
        },
      ],
      funders: [
        {
          id: 90,
          name: 'Funder not specified',
        },
      ],
      events: [],
      files: [
        {
          id: 1685,
          num_bytes: 3239900,
          filename: '191122_EndingTheCycle_GHSC_WEB_FULL_11.22.pdf',
          s3_filename: 'attCZyoAby7DYiIb5',
          has_thumb: true,
        },
      ],
      related_files: [],
      items: [
        {
          id: 3,
          title: 'Can Digital Health Help Stop the Next Epidemic?',
          description:
            "The Center for Strategic and International Studies Commission on Strengthening America's Health Security  proposed in this report that the United States use modern data management and digital tools to improve disease surveillance. The report recommended that policymakers use these tools to improve tracking of disease burdens and to better gather information on new outbreaks. The report proposed that the U.S. government put in place a five-year initiative in the United States and partner countries to pilot these digital health tools for outbreak preparedness.",
          type_of_record: 'Report',
          date: '2019-10-01',
          date_type: 1,
          funders: [
            {
              id: 90,
              name: 'Funder not specified',
            },
          ],
          authors: [
            {
              id: 8,
              authoring_organization:
                'Center for Strategic and International Studies',
              type_of_authoring_organization: 'Non-governmental organization',
              if_national_country_of_authoring_org: null,
              if_national_iso2_of_authoring_org: null,
              acronym: 'CSIS',
            },
          ],
          events: [],
          files: [
            {
              id: 1691,
              num_bytes: 2801982,
              filename: '191011_DigitalHealth_WEB_v2.pdf',
              s3_filename: 'attRqU7O4jZyboS4b',
              has_thumb: true,
            },
          ],
          key_topics: ['Disease surveillance / detection'],
          authoring_organization_has_governance_authority: false,
          link:
            'https://www.csis.org/analysis/can-digital-health-help-stop-next-epidemic',
          exclude_pdf_from_site: false,
        },
        {
          id: 939,
          title: 'Biological Threats to United States National Security',
          description:
            'The Senate Committee on Armed Services Subcommittee on Emerging Threats and Capabilities held a hearing in response to the Center for Strategic and International Studies\' Commission on Strengthening Health Security report, "Ending the Cycle of Crisis and Complacency in U.S. Global Health Security." The committee received testimony on the magnitude of the threat of biological events (including emerging infectious disease, intentional biological attacks, and biological accidents) to the United States. The hearing also focused on U.S. efforts to mitigate that threat through implementing the 2018 National Biodefense Strategy, stockpiling medical countermeasures in the Strategic National Stockpile, innovation in biotechnology, and the activities of Department of Defense.',
          type_of_record: 'Government action',
          date: '2019-11-20',
          date_type: 0,
          funders: [
            {
              id: 90,
              name: 'Funder not specified',
            },
          ],
          authors: [
            {
              id: 79,
              authoring_organization: 'Senate Committee on Armed Services (US)',
              type_of_authoring_organization: 'National / federal government',
              if_national_country_of_authoring_org: 'United States of America',
              if_national_iso2_of_authoring_org: 'US',
              acronym: 'SASC',
            },
          ],
          events: [],
          files: [
            {
              id: 549,
              num_bytes: 7589965,
              filename: 'CHRG-116shrg41309.pdf',
              s3_filename: 'atthsgjaKZz0oDH7F',
              has_thumb: true,
            },
          ],
          key_topics: ['Threat / risk awareness'],
          authoring_organization_has_governance_authority: true,
          link:
            'https://www.govinfo.gov/app/details/CHRG-116shrg41309/CHRG-116shrg41309',
          exclude_pdf_from_site: false,
        },
      ],
      _items: [
        {
          id: 3,
          title: 'Can Digital Health Help Stop the Next Epidemic?',
          description:
            "The Center for Strategic and International Studies Commission on Strengthening America's Health Security  proposed in this report that the United States use modern data management and digital tools to improve disease surveillance. The report recommended that policymakers use these tools to improve tracking of disease burdens and to better gather information on new outbreaks. The report proposed that the U.S. government put in place a five-year initiative in the United States and partner countries to pilot these digital health tools for outbreak preparedness.",
          type_of_record: 'Report',
          date: '2019-10-01',
          date_type: 1,
          funders: [
            {
              id: 90,
              name: 'Funder not specified',
            },
          ],
          authors: [
            {
              id: 8,
              authoring_organization:
                'Center for Strategic and International Studies',
              type_of_authoring_organization: 'Non-governmental organization',
              if_national_country_of_authoring_org: null,
              if_national_iso2_of_authoring_org: null,
              acronym: 'CSIS',
            },
          ],
          events: [],
          files: [
            {
              id: 1691,
              num_bytes: 2801982,
              filename: '191011_DigitalHealth_WEB_v2.pdf',
              s3_filename: 'attRqU7O4jZyboS4b',
              has_thumb: true,
            },
          ],
          key_topics: ['Disease surveillance / detection'],
          authoring_organization_has_governance_authority: false,
          link:
            'https://www.csis.org/analysis/can-digital-health-help-stop-next-epidemic',
          exclude_pdf_from_site: false,
        },
        {
          id: 939,
          title: 'Biological Threats to United States National Security',
          description:
            'The Senate Committee on Armed Services Subcommittee on Emerging Threats and Capabilities held a hearing in response to the Center for Strategic and International Studies\' Commission on Strengthening Health Security report, "Ending the Cycle of Crisis and Complacency in U.S. Global Health Security." The committee received testimony on the magnitude of the threat of biological events (including emerging infectious disease, intentional biological attacks, and biological accidents) to the United States. The hearing also focused on U.S. efforts to mitigate that threat through implementing the 2018 National Biodefense Strategy, stockpiling medical countermeasures in the Strategic National Stockpile, innovation in biotechnology, and the activities of Department of Defense.',
          type_of_record: 'Government action',
          date: '2019-11-20',
          date_type: 0,
          funders: [
            {
              id: 90,
              name: 'Funder not specified',
            },
          ],
          authors: [
            {
              id: 79,
              authoring_organization: 'Senate Committee on Armed Services (US)',
              type_of_authoring_organization: 'National / federal government',
              if_national_country_of_authoring_org: 'United States of America',
              if_national_iso2_of_authoring_org: 'US',
              acronym: 'SASC',
            },
          ],
          events: [],
          files: [
            {
              id: 549,
              num_bytes: 7589965,
              filename: 'CHRG-116shrg41309.pdf',
              s3_filename: 'atthsgjaKZz0oDH7F',
              has_thumb: true,
            },
          ],
          key_topics: ['Threat / risk awareness'],
          authoring_organization_has_governance_authority: true,
          link:
            'https://www.govinfo.gov/app/details/CHRG-116shrg41309/CHRG-116shrg41309',
          exclude_pdf_from_site: false,
        },
      ],
    },
  },
  error: false,
  message: 'Success',
}

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
        data: { items: { [testItem.id]: testItem } },
        setData: () => '',
      }}
    >
      <DetailOverlay floating id={testItem.data.id} />
    </appContext.Provider>
  )
}

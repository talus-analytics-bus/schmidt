// 3rd party components
import React, { useState, useEffect } from 'react'

// local components
import { PrimaryButton } from '../common'

// styles and assets
import styles from './about.module.scss'

const Documentation = ({}) => {
  // STATE  // --------------------------------------------------------------//

  // UTILITY FUNCTIONS
  // handle scrollTo for when endnote anchors are clicked
  const onClick = e => {
    let el
    if (e.target.dataset.type === 'ref') {
      // const num = e.target.id.split('_ednref')[1]
      // el = document.getElementById('_edn' + num)
      // el.scrollIntoView()
      // window.scrollBy(0, -60)
    } else {
      // const num = e.target.id.split('_edn')[1]
      // el = document.getElementById('_ednref' + num)
      // el.scrollIntoView()
      // window.scrollBy(0, -113)
    }
  }

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//

  // JSX
  return (
    <>
      <p>
        The Global Health Security Library is one of a suite of free resources
        that makes data and information about pandemic planning and oversight
        publicly accessible and centralized. As of November 2020, the library
        includes global and national-level sources. Global sources are the Food
        and Agriculture Organization, United Nations General Assembly, United
        Nations Security Council, World Organisation for Animal Health, and
        World Health Organization. National sources include the United States
        and five African countries—Egypt, Ethiopia, Kenya, Nigeria, and South
        Africa; some additional entries point to other nations, but they were
        not explicitly researched. The peer-reviewed literature as it relates to
        coronaviruses as a global infectious disease threat is also represented.
      </p>
      <p>
        The site includes:
        <ol>
          <li>
            A searchable, filterable database of all documents in the dataset.
            The complete can be downloaded in an Excel file format directly from
            the site.
          </li>
          <li className={styles.noTopMargin}>
            An analysis from the Georgetown University Center for Global Health
            Science and Security reflecting key observations about the dataset.
          </li>
        </ol>
      </p>
      <p>
        This work and underlying dataset is available for use under the{' '}
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
          Creative Commons Attribution By License agreement
        </a>
        , with appropriate reference and acknowledgement of the original
        research team, as available under the About section of the website.
      </p>
      <h2>Library</h2>
      <h3>Data collection</h3>
      <p>
        The modern biothreat can be viewed as a tripartite construct that
        consists of intentional acts, emerging infectious diseases (EID) from
        nature, and accidents. Preparedness for that threat may be specific to
        one of those elements, to individual pathogens of concern, or may be
        approached generally as “all-hazards.” This study was designed to
        primarily capture federal and global officials’ awareness of the EID or
        naturally-occurring pandemic threat and the risk from that threat. It
        did not specifically seek information related to intentional acts and
        bio-accidents, but did not exclude such documents where they were
        relevant to pandemics.
      </p>
      <h4>Global</h4>
      <p>
        The Georgetown University Center for Global Health Science and Security
        (Center) team researched the following sources for information:
      </p>
      <p>
        <ol>
          <li>
            <i>Food and Agriculture Organization (FAO)</i>: FAO holds regular
            conferences to discuss and review programs and provide guidance for
            member states on health-related activities. Resolutions and
            decisions from each conference are published on the{' '}
            <a href="http://www.fao.org/home/en/" target="_blank">
              FAO website
            </a>
            . The search function is not sufficiently advanced to allow
            employment of the comprehensive list of search terms used in other
            areas (see United States section below); the research team therefore
            reviews the table of contents and the titles of the resolutions and
            decisions to determine whether the document should be captured. If
            the title either explicitly includes or the content is aligned with
            our list of search terms, I then go to each one to make a final
            determination on whether or not to code it.
          </li>
          <li>
            <i>United Nations General Assembly</i>: Content coming soon
          </li>
          <li>
            <i>United Nations Security Council (UNSC)</i>: Based on the
            judgement of Center faculty, the following four UNSC resolutions
            were deemed the most pivotal for global health security in the
            timeframe parameters: 1308, 1983, 2177, and 2439. Each of these were
            logged and each resolution mentioned therein was also logged. Where
            a logged item was deemed irrelevant to health security, it was
            excluded.
          </li>
          <li>
            <i>World Organisation for Animal Health (OIE)</i>: OIE holds regular
            conferences to discuss and review programs and provide guidance for
            member states on health-related activities. Resolutions and
            decisions from each conference are published on the{' '}
            <a href="https://www.oie.int/" target="_blank">
              OIE website
            </a>
            . The search function is not sufficiently advanced to allow
            employment of the comprehensive list of search terms used in other
            areas (see United States section below); the research team therefore
            reviews the table of contents and the titles of the resolutions and
            decisions to determine whether the document should be captured. If
            the title either explicitly includes or the content is aligned with
            our list of search terms, I then go to each one to make a final
            determination on whether or not to code it.
          </li>
          <li>
            <i>World Health Organization (WHA)</i>: WHA holds regular
            conferences to discuss and review programs and provide guidance for
            member states on health-related activities. Resolutions and
            decisions from each conference are published on the WHA website. The
            search function is not sufficiently advanced to allow employment of
            the comprehensive list of search terms used in other areas (see
            United States section below); the research team therefore reviews
            the table of contents and the titles of the resolutions and
            decisions to determine whether the document should be captured. If
            the title either explicitly includes or the content is aligned with
            our list of search terms, I then go to each one to make a final
            determination on whether or not to code it.
          </li>
        </ol>
      </p>
      <p>
        After all documents are captured, we exclude duplicates, those solely
        targeted to intentional acts and accidents, and those that based on the
        researchers expert judgement are irrelevant to health security.
      </p>
      <h4>National</h4>
      <p>
        The Georgetown University Center for Global Health Science and Security
        team researched United States documentation in the form of congressional
        hearings, government reports and other documents, and third party
        reports and other documents.
      </p>
      <p>
        <ol>
          <li>
            <i>Hearings</i>: The website www.congress.gov is used as a primary
            source of information on congressional activity by way of the
            Congressional Record (CR). The CR captures committee activity in the
            form of committee hearings, briefings, and business meetings.
            Records are sought using keyword searches (biodefense; biological
            threat; biopreparedness; biosurveillance; biothreat; CBRN; chemical,
            biological, radiological, and nuclear; coronavirus; Ebola; emerging
            infectious disease; global infectious disease; health security;
            infectious disease epidemic; influenza; MCM; medical countermeasure;
            medical preparedness; medical readiness; medical supply chain
            security; MERS; middle east respiratory syndrome; pandemic; public
            health response; SARS; severe acute respiratory syndrome) from the
            beginning of the database’s availability with a cut-off of December
            31, 2019 (marking the approximate beginning of awareness of
            COVID-19, and allowing us to consider all hearings from the first
            session of the 116th Congress) and exported into .csv files. These
            are reviewed for the two types of hits that contain information on
            committee activity, the Daily Digest and Senate Committee Meetings.
            Each record is reviewed and the activity it represented categorized
            as a hearing, briefing, or business meeting. Hearings were the
            primary unit of interest, as they represent one of the most public
            forms of congressional oversight and information-gathering.
            Briefings are often not formalized and noticed in the CR; because
            the number of briefings listed thus would be an insignificant
            fraction of the briefings that Members would actually receive during
            their time in Congress, search results representing briefings were
            removed from the analysis. Business meetings almost always represent
            markups of legislation; because this study was unconcerned with
            legislation, these data points were also removed.
            <p>
              After all hearings consistent with the search terms are
              identified, the policy team excludes those that, based on the
              titles (or descriptions provided in lieu of titles), are solely
              targeted to terrorism, not naturally emerging diseases. Some
              hearings covered both topics or used the topic of bioterrorism to
              discuss broader preparedness efforts also relevant to EID, and
              these are included. Hearings that specifically address HIV/AIDS,
              tuberculosis, or malaria are excluded. Hearings identified from
              early in the timeframe parameters that relate to Department of
              Defense (DOD) budgets are removed as they used terms like “health
              security” in a way different from the contemporary usage, or cover
              the topic of “health readiness” more broadly than this study was
              meant to capture. The Daily Digest includes both announcements for
              hearings and notices of hearings held. Occasionally the search
              results in an announcement for a hearing but no actual notice
              confirming that the hearing took place; in these cases, additional
              research through www.congress.gov, www.gpo.gov, or committee
              websites is undertaken to find a notice confirming that the
              hearing was held. Rarely no such notice can be found, and these
              hearings are excluded from the final tally on the presumption that
              they had been cancelled. On occasion when the research team is
              aware of relevant hearings not captured by any of the keywords,
              these are included for comprehensiveness. Witness names and
              affiliations for each hearing were noted from the CR and other
              sources, including official committee reports available at
              www.govinfo.gov and committee websites. Names are manually
              standardized to resolve spelling or other discrepancies. Each
              hearing is tagged as having occurred during either Democrat or
              Republican control of a given chamber.
              <a data-type="ref" id="_ednref1" onClick={onClick}>
                1
              </a>
              <a data-type="ref" id="_ednref2" onClick={onClick}>
                2
              </a>{' '}
              <span>
                Some committee names changed across the data capture period;
                hearings from committees with changed names were grouped with
                their current names to permit proper committee-level analysis of
                activity.
              </span>
              <a data-type="ref" id="_ednref3" onClick={onClick}>
                3
              </a>{' '}
              One hearing was held jointly by two committees and this was
              treated as though it were held by a unique, third committee.
            </p>
          </li>
          <li>
            <i>Government reports</i>. The research team sought reports from
            sources to which decision-makers in the Executive and/or Legislative
            branches could or should reliably be exposed. We considered three
            primary groups: independent advisory bodies such as federal advisory
            committees; departments and agencies with significant operational
            jurisdiction over and spending on EID-relevant activity;
            <a data-type="ref" id="_ednref4" onClick={onClick}>
              4
            </a>
            <a data-type="ref" id="_ednref5" onClick={onClick}>
              5
            </a>{' '}
            and government bodies whose specific role is to advise
            decision-makers.
            <p>
              Rosters of federal advisory committees for the Department of
              Health and Human Services (HHS) (specifically for the Centers for
              Disease Control and Prevention, National Institutes of Health, and
              Office of the Assistant Secretary for Preparedness and Response),
              the Department of Homeland Security (DHS), and DOD are reviewed;
              those with some responsibility for biodefense are further
              researched for all published reports, and those consistent with
              the same parameters used for hearing adjudication are retained.
              Reports issued by the President’s Council of Advisors on Science
              and Technology, the primary source of independent scientific
              analyses for the Office of the President, are included in the same
              manner. Because the body of work issued by each of these entities
              is relatively small and not contained in searchable databases, we
              do not apply the hearing search terms but rather examine the
              available report titles, and content where necessary, to judge
              whether reports were relevant.
            </p>
            <p>
              All Worldwide Threat Assessments issued by the Director of
              National Intelligence (and their precursors by a different name)
              are identified; those that reported an infectious disease threat
              are included in our analysis. Reports from Inspectors General (IG)
              of DHS, DOD, HHS, U.S. Agency for International Development
              (USAID), and Department of Veterans Affairs (VA) are sought on
              their respective websites. The hearing search terms are input into
              the search bar for DHS, DOD, HHS, and VA; HHS additionally
              provides a pre-populated category of “infectious disease
              preparedness and response” reports and these reports were also
              captured.
              <a data-type="ref" id="_ednref6" onClick={onClick}>
                6
              </a>{' '}
              USAID presents its reports by category; from the “Global Health”
              page we manually review all entries to extract relevant reports.
              The HHS Public Health Emergency Medical Countermeasures Enterprise
              (PHEMCE) collates and makes a variety of reports available on its
              website, and from these we pull the organization’s multi-year
              budgets, which describe how it intends to spend its resources. For
              all of these searches, reports from 1995-2019 are kept for
              inclusion in the database (each site varies in how far back it
              provides online records, and in some cases, the cutoff is
              unclear); those deemed topically irrelevant or focused on areas
              like expenditure audits are omitted. While these and other
              departments and agencies have issued additional EID-relevant
              reports throughout the timeframe of interest, these reports are
              often one-offs and are not available in any systematized fashion
              to the authors’ knowledge, and were thus unable to be captured.
            </p>
            <p>
              Two legislative branch agencies that provide analyses to Congress
              are also included: the Congressional Research Service (CRS) and
              the Government Accountability Office (GAO). The same search terms
              and date parameters used for hearings were applied. For CRS, we
              used the primary search bar in the public database
              (crsreports.congress.gov) and for GAO, the primary search bar on
              its{' '}
              <a href="https://www.gao.gov/" target="_blank">
                website
              </a>{' '}
              .
            </p>
            <p>
              Finally, we sought to identify relevant federal strategies and
              implementation plans. We aimed to keep these related as narrowly
              as possible to biothreats, excluding broader works like national
              defense or national security strategies. We used the following
              sources for this information: the HHS Public Health Emergency
              website,
              <a data-type="ref" id="_ednref7" onClick={onClick}>
                7
              </a>{' '}
              <span>
                which compiles several relevant strategies and plans, and two
                published collations of key strategies, executive orders, and
                related documents.
                <a data-type="ref" id="_ednref8" onClick={onClick}>
                  8
                </a>
                <a data-type="ref" id="_ednref9" onClick={onClick}>
                  9
                </a>{' '}
              </span>
            </p>
            <p>
              In a small number of cases, the researchers become aware of
              reports that were not captured by the search strategy, for
              instance, when a captured GAO testimony is based on a series of
              prior GAO reports, some of which were not originally captured;
              these are included for comprehensiveness.
            </p>
          </li>
          <li>
            <i>Third-party reports</i>. The National Academies of Science,
            Engineering, and Medicine (NASEM) was established by the federal
            government as a research resource for the government, and federal
            departments and agencies often contract with NASEM to evaluate
            critical science and science policy questions; often these
            engagements are congressionally mandated.
            <a data-type="ref" id="_ednref10" onClick={onClick}>
              10
            </a>{' '}
            For NASEM, we searched the National Academies Press reports
            (www.nap.edu) within the topics "Biology and Life Sciences" and
            "Heath and Medicine," dated from 1995-2019; the same search terms
            and date parameters used for hearings are applied. The researchers
            are aware from experience about the existence of one relevant NASEM
            report not captured by any of the keywords, and include it for
            comprehensiveness.
          </li>
        </ol>
      </p>
      <p>
        After all hearings and reports are captured, we exclude duplicates,
        those solely targeted to intentional acts and accidents, and those that
        based on the researchers expert judgement are irrelevant to health
        security.
      </p>
      <h3>Data coding</h3>
      <p>
        The team developed a custom data taxonomy and data dictionary to define
        key metadata and organize the dataset. The data were populated into
        Airtable and transferred via API into a database on Amazon Web Services.
        The data dictionary with complete description of all metadata fields can
        be downloaded as an Excel file. The complete dataset can be downloaded
        from the Policy data page.
      </p>
      {/* ENDNOTES */}
      <div className={styles.endnotes}>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn1">
            1
          </a>{' '}
          <p>
            United States House of Representatives Office of the Historian
            website. Institution page. Party Divisions of the House of
            Representatives, 1789 to Present.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn2">
            2
          </a>{' '}
          <p>
            United States Senate website. Art and History page. Party Division.{' '}
            <a
              href="https://www.senate.gov/history/partydiv.htm"
              target="_blank"
            >
              https://www.senate.gov/history/partydiv.htm
            </a>
            . Accessed June 27, 2020.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn3">
            3
          </a>{' '}
          <p>
            Congress.gov website. Committees webpage. Committee Name History.{' '}
            <a
              href="https://www.congress.gov/help/field-values/current-committees"
              target="_blank"
            >
              https://www.congress.gov/help/field-values/current-committees
            </a>
            . Accessed June 27, 2020.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn4">
            4
          </a>{' '}
          <p>
            Watson C, Watson M, Gastfriend D, Sell TK. Federal Funding for
            Health Security in FY2019. Health Secur. 2018;16(5):281-303. Epub
            2018/10/20. doi: 10.1089/hs.2018.0077. PubMed PMID: 30339096.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn5">
            5
          </a>{' '}
          <p>
            Michaud J, Moss K, Kates J. The U.S. Government and Global Health
            Security. Kaiser Family Foundation, December 19, 2020.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn6">
            6
          </a>{' '}
          <p>
            U.S. Department of Health and Human Services. Office of Inspector
            General. Infectious Disease Preparedness and Response. Available
            from:{' '}
            <a
              href="https://oig.hhs.gov/reports-and-publications/featured-topics/infectious-disease/index.asp"
              target="_blank"
            >
              https://oig.hhs.gov/reports-and-publications/featured-topics/infectious-disease/index.asp
            </a>
            . Accessed June 16, 2020.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn7">
            7
          </a>{' '}
          <p>
            U.S. Department of Health and Human Services. Office of the
            Assistant Secretary for Preparedness and Response. Medical
            Countermeasures Strategies and Reports. Available from:{' '}
            <a
              href="https://www.phe.gov/Preparedness/mcm/Pages/strategies-reports.aspx"
              target="_blank"
            >
              https://www.phe.gov/Preparedness/mcm/Pages/strategies-reports.aspx
            </a>
            . Accessed July 7, 2020.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn8">
            8
          </a>{' '}
          <p>
            Homeland Security Digital Library. National Strategy Documents.
            Available from:{' '}
            <a
              href="https://www.hsdl.org/?collection&id=4#Pandemics"
              target="_blank"
            >
              https://www.hsdl.org/?collection&id=4#Pandemics
            </a>
            . Accessed July 8, 2020.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn9">
            9
          </a>{' '}
          <p>
            Blue Ribbon Study Panel on Biodefense. A National Blueprint for
            Biodefense: Leadership and Major Reform Needed to Optimize Efforts.
            Table 2 (p. 14). Washington, DC: Blue Ribbon Study Panel on
            Biodefense. Hudson Institute, October 2015.
          </p>
        </div>
        <div className={styles.endnote}>
          <a data-type="endnote" onClick={onClick} id="_edn10">
            10
          </a>{' '}
          <p>
            National Academies of Sciences E, and Medicine website. About Us.{' '}
            <a href="https://www.nationalacademies.org/about" target="_blank">
              https://www.nationalacademies.org/about
            </a>
            . Accessed June 29, 2020.
          </p>
        </div>
      </div>
    </>
  )
}

export default Documentation

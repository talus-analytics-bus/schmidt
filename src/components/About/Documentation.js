// 3rd party components
import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

// local components
import { PrimaryButton } from '../common'

// styles and assets
import styles from './about.module.scss'

import ToExcelQuery from '../misc/ToExcelQuery'

import * as Endnotes from '../Endnotes/Endnotes'

const Documentation = ({}) => {
  // STATE  // --------------------------------------------------------------//

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//

  // JSX
  // external link convenience component
  const ExtLink = ({ url, children }) => (
    <a href={url} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
  return (
    <Endnotes.Provider offset={-100}>
      <div className={styles.doc}>
        <h1>Documentation</h1>
        <p className={styles.noTopMargin}>
          Health Security Net is one of a{' '}
          <ExtLink url={'https://gida.ghscosting.org/'}>
            suite of free resources
          </ExtLink>{' '}
          from the Georgetown University Center for Global Health Science and
          Security that makes data and information about pandemic planning and
          oversight centralized and publicly accessible. Built on an integrated
          data architecture to support cross-platform analysis, this global
          health security library is a searchable and filterable database
          designed to enable ready access to warnings, evaluations, oversight
          efforts, strategies, and other documents concerning pandemic risk and
          related issues, including documents from governmental, international,
          and non-governmental organizations. The library is a work in progress
          and continues to be updated as additional resources are identified.
          Please contact us with any questions or additions at{' '}
          <a
            target="_blank"
            href="mailto:healthsecuritynet@georgetown.edu"
            rel="noreferrer"
          >
            healthsecuritynet@georgetown.edu.
          </a>
        </p>
        <p>
          As of its launch in January 2021, the library includes documents from
          global and national-level sources dated from 1995-2019. Global sources
          are the Food and Agriculture Organization, United Nations General
          Assembly, United Nations Security Council, World Organisation for
          Animal Health, and World Health Organization (including the World
          Health Assembly). National sources as of January 2021 are drawn from
          the United States. Academic journal literature as it relates to
          coronaviruses as a global infectious disease threat is also
          represented. This is an ongoing research project and the library may
          be updated to reflect pre-1995 or post-2019 sources, additional
          countries, and other elements.
        </p>
        <p>The site includes:</p>
        <ol>
          <li>
            A searchable, filterable database of all documents in the dataset.
            The complete dataset can be downloaded in an Excel file format
            directly from the site.
          </li>
          <li>
            A written analysis from the Georgetown University Center for Global
            Health Science and Security reflecting key observations about the
            dataset.
          </li>
        </ol>
        <p>
          This work and underlying dataset is available for use under the
          Creative Commons Attribution 4.0 International Public License (
          <ExtLink url={'https://creativecommons.org/licenses/by/4.0/'}>
            https://creativecommons.org/licenses/by/4.0/
          </ExtLink>
          ), with appropriate reference and acknowledgement of the original
          research teams, as listed{' '}
          <ExtLink url="/about/">on this site</ExtLink>.
        </p>
        <p>
          <strong>This documentation includes:</strong>
        </p>
        <ol>
          <li>
            <a
              href="#library"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`library`).scrollIntoView()
              }}
            >
              The Library and the methodology used to populate it
            </a>
          </li>
          <li>
            <a
              href="#datacoding"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`datacoding`).scrollIntoView()
              }}
            >
              The data coding process
            </a>
          </li>
          <li>
            <a
              href="#glossary"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`glossary`).scrollIntoView()
              }}
            >
              The glossary of terms as applied to the Library
            </a>
          </li>
        </ol>
        <div id="library" style={{ position: 'relative', top: -100 }} />
        <h1>Library</h1>
        <h2>Data collection</h2>
        <p>
          The modern biothreat can be viewed as a tripartite construct that
          consists of intentional acts, emerging infectious diseases (EID) from
          nature, and accidents. Preparedness for that threat may be specific to
          one of those elements, to individual pathogens of concern, or may be
          approached generally as &ldquo;all-hazards.&rdquo; This library is
          designed to primarily capture documents relating to federal/national
          and global officials&rsquo; awareness of the EID or
          naturally-occurring pandemic threat and the risk from that threat. The
          researchers did not specifically seek information related to
          intentional acts and biological accidents, but did not exclude such
          documents where they were relevant to pandemic preparedness in
          general. All-hazards items captured by the search were included only
          if they also directly addressed the nexus between all-hazards
          preparedness and infectious disease. The library includes items
          published from January 1, 1995 &ndash; December 31, 2019.
        </p>
        <h3>Global</h3>
        <p>
          The research team collected documents online from multiple global
          sources and excluded those meeting any of the following
          criteria:&nbsp;
        </p>
        <ul>
          <li>
            Items published outside of January 1, 1995 &ndash; December 31,
            2019.
          </li>
          <li>
            Items strictly about bioterrorism and/or biosafety/biological
            accidents.
          </li>
          <li>
            Items solely focused on endemic diseases or those typically
            addressed by the global health (as opposed to global health
            security) community, e.g., HIV, TB, malaria, and noncommunicable
            diseases.
          </li>
          <li>
            Items focused on a single country (e.g., country-level Joint
            External Evaluation mission reports; reports published by a World
            Health Organization regional office).
          </li>
          <li>Fact sheets on diseases.</li>
          <li>Items not in English.</li>
        </ul>
        <p>
          Global sources were reviewed for relevant documents. The search
          strategy varied among them, for instance depending on the
          sophistication of their websites&rsquo; search functionality, or
          whether the site provided its own relevant terms for grouping. Global
          sources currently included in Health Security Net include:
        </p>
        <ol>
          <li>
            <em>
              Food and Agriculture Organization of the United Nations (FAO)
            </em>
            : FAO holds biennial conferences to discuss and review programs and
            provide guidance for Member States on health-related activities.
            Resolutions and decisions from each conference are published in the
            conference report at{' '}
            <ExtLink url="http://www.fao.org/unfao/govbodies/gsbhome/conference/conference-reports/en/">
              http://www.fao.org/unfao/govbodies/gsbhome/conference/conference-reports/en/
            </ExtLink>
            . Because resolutions and decisions are not published separately
            from the full conference report and the search function is not
            sufficiently advanced to search only for terms within the
            resolutions and decisions, the research team was unable to employ
            the comprehensive list of search terms used for other entities
            (e.g., see United States hearing section). The research team
            therefore reviewed the table of contents of each report from
            1995-2019 for the titles of the resolutions and decisions to
            determine their relevance to pandemics. If the title included the
            search terms, it was captured; if it contained terms that may
            otherwise be relevant to infectious disease in the judgement of the
            researcher, the contents were reviewed to determine inclusion or
            exclusion.&nbsp;
          </li>
          <li>
            <em>United Nations General Assembly (UNGA)</em>: The United Nations
            Digital Library (
            <ExtLink url="https://digitallibrary.un.org/?ln=en&as=1">
              https://digitallibrary.un.org/?ln=en&as=1
            </ExtLink>
            ) was searched in the primary search field for
            &ldquo;pandemic&rdquo; using <em>All of the words</em> and{' '}
            <em>any field</em>. Full text search was by default not toggled on,
            resulting in 142 hits for UNGA; despite this, the search appeared to
            capture documents with the search term in the body of the document,
            not just the title. This search methodology as applied to the
            Digital Library was not perfectly sensitive; in some cases, upon
            reading the captured resolutions, the researchers found references
            to additional resolutions about pandemics, and these were searched
            for directly and added to the database if relevant. (In some cases,
            the captured record did not have the word &ldquo;pandemic&rdquo; at
            all.) Once the dataset was ready, exclusion criteria were applied.
          </li>
          <li>
            <em>United Nations Security Council (UNSC)</em>: Based on the
            experience and judgement of Center faculty, the following UNSC
            resolutions were deemed relevant to global health security within
            the years 1995&ndash;2019: 1308, 1983, 2177, and 2439. Each of these
            was logged into the database. The text of each was also reviewed for
            mentions of other resolutions, exclusion criteria were applied, and
            any that remained were captured into the database. (All such entries
            met exclusion criteria and thus are not represented in the
            database.)
          </li>
          <li>
            <em>World Organisation for Animal Health (OIE)</em>: OIE holds
            annual conferences to discuss and review programs and provide
            guidance for Member States on health-related activities. Resolutions
            and decisions from each conference are published at{' '}
            <ExtLink url="https://www.oie.int/about-us/key-texts/resolutions-and-recommendations/resolutions-adopted-by-the-world-assembly-of-delegates-of-the-oie/">
              https://www.oie.int/about-us/key-texts/resolutions-and-recommendations/resolutions-adopted-by-the-world-assembly-of-delegates-of-the-oie/
            </ExtLink>
            . Because resolutions and decisions are not published separately
            from the full conference report and the search function is not
            sufficiently advanced to search only for terms within the
            resolutions and decisions, the research team was unable to employ
            the comprehensive list of search terms used for other entities
            (e.g., see United States hearing section). The research team
            therefore reviewed the table of contents of each report from
            1995-2019 for the titles of the resolutions and decisions to
            determine their relevance to pandemics. If the title included the
            search terms, it was captured; if it contained terms that may
            otherwise be relevant to infectious disease in the judgement of the
            researcher, the contents were reviewed to determine inclusion or
            exclusion.&nbsp;
          </li>
          <li>
            <em>World Health Assembly (WHA)</em>: WHA holds annual conferences
            to discuss and review programs and provide guidance for Member
            States on health-related activities. Resolutions and decisions from
            each conference are published at{' '}
            <ExtLink url="https://apps.who.int/gb/index.html">
              https://apps.who.int/gb/index.html
            </ExtLink>
            . Because resolutions and decisions are not published separately
            from the full conference report and the search function is not
            sufficiently advanced to search only for terms within the
            resolutions and decisions, the research team was unable to employ
            the comprehensive list of search terms used for other entities
            (e.g., see United States hearing section). The research team
            therefore reviewed the table of contents of each report from
            1995-2019 for the titles of the resolutions and decisions to
            determine their relevance to pandemics. If the title explicitly
            included the search terms, it was captured; if it contained terms
            that may otherwise be relevant to infectious disease in the
            judgement of the researcher, it was reviewed to determine inclusion
            or exclusion.
          </li>
          <li>
            <em>World Health Organization (WHO)</em>: WHO documents located in
            the Institutional Repository for Information Sharing (IRIS) database
            were searched (
            <ExtLink url="https://apps.who.int/iris/">
              https://apps.who.int/iris/
            </ExtLink>
            ). Because many of our desired search terms (see United
            State&mdash;Hearings section below) returned thousands of results,
            and IRIS can only export 500 at a time, the research team instead
            used the &ldquo;MeSH&rdquo; subject categories that IRIS uses to
            organize its topics. In the IRIS database, we manually searched the
            &ldquo;MeSH subjects&rdquo; category and chose relevant subjects
            (number of records in parentheses): Coronavirus Infections (133);
            Ebola Vaccines (24); Ebolavirus (430); Epidemics (138);
            Epidemiological Monitoring (1284)&mdash;in English, 519; Infectious
            Disease; Medicine (2); Infectious Disease Transmission,
            Patient-to-Professional (16); Infectious Disease Transmission,
            Professional-to-Patient (6); Infectious Disease Transmission,
            Vertical (280);Infectious hazards (1); infectious hazards (1);
            Infectious mononucleosis (1); Influenza (3); Influenza A virus (60);
            Influenza A Virus, H1N1 Subtype (183); Influenza A Virus, H1N2
            Subtype (6); Influenza A Virus, H3N2 Subtype (4); Influenza A Virus,
            H5N1 Subtype (5); Influenza A Virus, H5N2 Subtype (3); Influenza A
            Virus, H7N9 Subtype (5); Influenza B virus (36); Influenza Vaccines
            (455); Influenza, Human (971); Influenza, Human A virus (1);
            Influenza, Human vaccine (1); Influenza Humanvirus B (1);
            Influenzavirus A (12); Influenzavirus B (10); Medical Waste (31);
            Medical Waste Disposal (43); Middle East Respiratory Syndrome
            Coronavirus (41); Public Health Surveillance (488); and SARS Virus
            (35).
            <br />
            <br />
            The following terms from the team&rsquo;s broad list of terms (see
            United States section) appeared as MeSH terms (number of records in
            parentheses): biosurveillance&nbsp;(1); coronavirus&nbsp;(10);
            influenza&nbsp;(1); pandemics&nbsp;(760); Severe Acute Respiratory
            Syndrome&nbsp;(103). In addition to these MeSH search terms, we also
            searched for these specific situation reports: 2001 anthrax attacks
            (Amerithrax); 2003 SARS; 2005 H5N1; 2009 H1N1; 2013 MERS; 2014-2016
            Ebola (i.e., West Africa); 2016 Zika; 2018-2020 Ebola (i.e.,
            Democratic Republic of the Congo).&nbsp;We entered these terms into
            the IRIS search bar within quotations. &ldquo;All of IRIS&rdquo; was
            selected in the search bar. The following filters were added:
            Subject MeSH&mdash;Contains&mdash;&ldquo;term&rdquo;;
            Language&mdash;Equals English; Date issued&mdash;Not
            equals&mdash;2020. We repeated these steps for each MeSH term.
            <br />
            <br />
            &ldquo;Weekly Update&rdquo; reports and country-specific items were
            excluded from the captured sources; regionally-oriented WHO reports
            were included. Others that in the researchers&rsquo; expert
            judgement were irrelevant to health security were also excluded.
          </li>
        </ol>
        <h3>National</h3>
        <p>
          <em>United States</em>
        </p>
        <p>
          The research team compiled United States documentation in the form of
          congressional hearings, government reports and other documents, and
          third party reports and other documents. In most cases, a list of 25
          search terms were deployed to capture a broad array of hits relevant
          to pandemics (see details below). The team excluded documents meeting
          any of the following criteria:
        </p>
        <ul>
          <li>Items outside of January 1, 1995 &ndash; December 31, 2019.</li>
          <li>
            Items strictly about bioterrorism and/or biosafety/biological
            accidents.
          </li>
          <li>
            Items solely focused on endemic diseases or those typically
            addressed by the global health (as opposed to global health
            security) community, e.g., HIV, TB, malaria.
          </li>
          <li>Fact sheets on diseases.</li>
        </ul>
        <p>The research term sought information from the following sources:</p>
        <ol>
          <li>
            <em>Hearings: </em>The website{' '}
            <ExtLink url="https://www.congress.gov/">www.congress.gov</ExtLink>{' '}
            was used as a primary source of information on congressional
            activity by way of the Congressional Record (CR). The CR captures
            committee activity in the form of committee hearings, briefings, and
            business meetings. Records were sought using the following keyword
            searches:
            <br />
            <br />
            biodefense; biological threat; biopreparedness; biosurveillance;
            biothreat; CBRN; chemical, biological, radiological, and nuclear;
            coronavirus; Ebola; emerging infectious disease; global infectious
            disease; health security; infectious disease epidemic; influenza;
            MCM; medical countermeasure; medical preparedness; medical
            readiness; medical supply chain security; MERS; middle east
            respiratory syndrome; pandemic; public health response; SARS; severe
            acute respiratory syndrome
            <br />
            <br />
            Hits were reviewed for the two types of records that contain
            information on committee activity, the Daily Digest and Senate
            Committee Meetings. Each record was reviewed and the activity it
            represented categorized as a hearing, briefing, or business meeting.
            Hearings were the primary unit of interest, as they represent one of
            the most public forms of congressional oversight and
            information-gathering. Briefings, of which only a small minority are
            noticed in the CR, and business meetings, which almost always
            represent markups of legislation, were excluded. Exclusion criteria
            were applied after all hearings consistent with the search terms
            were identified. Some hearings used the topic of bioterrorism to
            discuss broader preparedness efforts also relevant to pandemics, and
            these were included. Some hearings identified from early in the
            timeframe parameters related to Department of Defense (DoD) budgets
            use terms like &ldquo;health security&rdquo; in a way different from
            the contemporary usage, or cover the topic of &ldquo;health
            readiness&rdquo; more broadly than this library is meant to capture;
            these were excluded. When the search occasionally resulted in an
            announcement for a hearing but no actual notice confirming that the
            hearing took place, additional research through{' '}
            <ExtLink url="https://www.congress.gov/">
              www.congress.gov
            </ExtLink>,{' '}
            <ExtLink url="https://www.gpo.gov/">www.gpo.gov</ExtLink>, or
            committee websites was undertaken to find a notice confirming that
            the hearing was held. Rarely no such notice can be found, and these
            hearings were excluded on the presumption that they were cancelled.
            On occasion when the research team was aware of relevant hearings
            not captured by any of the keywords, these were included for
            comprehensiveness. All hearing titles were copied from the relevant
            hearing report.
            {/* OMITTING THIS PARAGRAPH UNTIL WE HAVE LINK TO SUPPLEMENTAL FILE */}
            {/* <br /> */}
            {/* <br /> */}
            {/* In addition to their inclusion in the library, the list of included
            hearings has also been made available as a supplemental file
            containing additional metadata. In this document, witness names and
            affiliations for each hearing were noted from the CR and other
            sources, including official committee reports available at{' '}
            <ExtLink url="https://www.govinfo.gov/">
              www.govinfo.gov
            </ExtLink>{' '}
            and committee websites. Witness names were manually standardized to
            resolve spelling or other discrepancies. Each hearing was tagged as
            having occurred during either Democrat or Republican control of a
            given chamber.
            <Endnotes.Note>
              United States House of Representatives Office of the Historian
              website. Institution page. Party Divisions of the House of
              Representatives, 1789 to Present.
            </Endnotes.Note>
            <Endnotes.Note>
              United States Senate website. Art and History page. Party
              Division.{' '}
              <ExtLink url="https://www.senate.gov/history/partydiv.htm">
                https://www.senate.gov/history/partydiv.htm
              </ExtLink>
              . Accessed June 27, 2020.
            </Endnotes.Note>{' '}
            <span>
              Some committee names changed across the data capture period; these
              were grouped with their current names to permit proper
              committee-level analysis of activity.
            </span>
            <Endnotes.Note>
              Congress.gov website. Committees webpage. Committee Name History.{' '}
              <ExtLink url="https://www.congress.gov/help/field-values/current-committees">
                https://www.congress.gov/help/field-values/current-committees
              </ExtLink>
              . Accessed June 27, 2020.
            </Endnotes.Note>{' '}
            Two hearings were held jointly by multiple committees; for analysis
            purposes, these were treated as though they were held by separate,
            unique committees. */}
          </li>
          <li>
            <em>Government reports.</em> The research team sought reports from
            sources to which decision-makers in the Executive and/or Legislative
            branches could or should reliably be exposed. Three primary groups
            were considered: independent advisory bodies such as federal
            advisory committees; departments and agencies with significant
            operational jurisdiction over and spending on EID-relevant activity;
            <Endnotes.Note>
              Watson C, Watson M, Gastfriend D, Sell TK. Federal Funding for
              Health Security in FY2019. Health Secur. 2018;16(5):281-303. Epub
              2018/10/20. doi: 10.1089/hs.2018.0077. PubMed PMID: 30339096.
            </Endnotes.Note>
            <Endnotes.Note>
              Michaud J, Moss K, Kates J. The U.S. Government and Global Health
              Security. Kaiser Family Foundation, December 19, 2020.
            </Endnotes.Note>{' '}
            and government bodies whose specific role is to advise
            decision-makers.
            <br />
            <br />
            Rosters of federal advisory committees for the Department of Health
            and Human Services (HHS) (specifically for the Centers for Disease
            Control and Prevention, National Institutes of Health, and Office of
            the Assistant Secretary for Preparedness and Response), the
            Department of Homeland Security (DHS), and DoD were reviewed; those
            with some responsibility for biodefense were further researched for
            all published reports, and those consistent with the same parameters
            used for hearing adjudication were retained. Reports issued by the
            President&rsquo;s Council of Advisors on Science and Technology were
            included in the same manner. Because the body of work issued by each
            of these entities is relatively small and not contained in
            searchable databases, we did not apply the hearing search terms but
            rather examined the available report titles, and content where
            necessary, to judge whether reports were relevant.
            <br />
            <br />
            All Worldwide Threat Assessments issued by the Director of National
            Intelligence (and their precursors by a different name) were
            identified; those that reported an infectious disease threat or risk
            were included. Reports from Inspectors General (IG) of DHS, DoD,
            HHS, U.S. Agency for International Development (USAID), and
            Department of Veterans Affairs (VA) were sought on their respective
            websites; the search terms (same as those used for hearings) were
            input into the search bar for DHS, DoD, HHS, and VA. The HHS IG
            additionally provides a pre-populated category of &ldquo;emerging
            infectious disease preparedness and response&rdquo; reports and
            these reports were also captured.
            <Endnotes.Note>
              U.S. Department of Health and Human Services. Office of Inspector
              General. Infectious Disease Preparedness and Response. Available
              from:
              <ExtLink url="https://oig.hhs.gov/reports-and-publications/featured-topics/infectious-disease/index.asp">
                https://oig.hhs.gov/reports-and-publications/featured-topics/infectious-disease/index.asp
              </ExtLink>
              . Accessed June 16, 2020.
            </Endnotes.Note>{' '}
            USAID presents its reports by category; from the &ldquo;Global
            Health&rdquo; page we manually reviewed all entries to extract
            relevant reports. The HHS Public Health Emergency Medical
            Countermeasures Enterprise (PHEMCE) collates and makes a variety of
            reports available on its website, and from these we pulled the
            organization&rsquo;s multi-year budgets. For all of these searches,
            the standing exclusion criteria were applied; those deemed topically
            irrelevant or focused on areas like expenditure audits were also
            omitted.
            <br />
            <br />
            While these and other departments and agencies have issued many
            other EID-relevant reports throughout the timeframe of interest,
            these reports are often one-offs and are not available in any
            systematized fashion to the authors&rsquo; knowledge. The research
            team captured some of these by the methods outlined in United States
            Step 3.
            <br />
            <br />
            Two legislative branch agencies that provide analyses to Congress
            were also included: the Congressional Research Service (CRS) and the
            Government Accountability Office (GAO). The same search terms and
            date parameters used for hearings were applied. For CRS, the primary
            search bar in the public database (
            <ExtLink url="http://crsreports.congress.gov/">
              crsreports.congress.gov
            </ExtLink>
            ) was employed, and for GAO, the primary search bar on its website (
            <ExtLink url="http://www.gao.gov">www.gao.gov</ExtLink>) was used.
            CRS reports are sometimes updated and re-released at a later date;
            in these cases, we documented the most recent date and uploaded the
            most recent report.
            <br />
            <br />
            We also sought to identify relevant federal strategies and
            implementation plans. We aimed to keep these related as narrowly as
            possible to biothreats, excluding broader works like national
            defense or national security strategies. We used the following
            sources for this information: the HHS Public Health Emergency
            website,
            <Endnotes.Note>
              U.S. Department of Health and Human Services. Office of the
              Assistant Secretary for Preparedness and Response. Medical
              Countermeasures Strategies and Reports. Available from:{' '}
              <ExtLink url="https://www.phe.gov/Preparedness/mcm/Pages/strategies-reports.aspx">
                https://www.phe.gov/Preparedness/mcm/Pages/strategies-reports.aspx
              </ExtLink>
              . Accessed July 7, 2020.
            </Endnotes.Note>{' '}
            <span>
              which compiles several relevant strategies and plans, and two
              published collations of key strategies, executive orders, and
              related documents.
            </span>
            <Endnotes.Note>
              Homeland Security Digital Library. National Strategy Documents.
              Available from:{' '}
              <ExtLink url="https://www.hsdl.org/?collection&id=4#Pandemics">
                https://www.hsdl.org/?collection&id=4#Pandemics
              </ExtLink>
              . Accessed July 8, 2020.
            </Endnotes.Note>
            <Endnotes.Note>
              Blue Ribbon Study Panel on Biodefense. A National Blueprint for
              Biodefense: Leadership and Major Reform Needed to Optimize
              Efforts. Table 2 (p. 14). Washington, DC: Blue Ribbon Study Panel
              on Biodefense. Hudson Institute, October 2015.
            </Endnotes.Note>{' '}
            <br />
            <br />
            In a small number of cases, the researchers became aware of reports
            that were not captured by the search strategy, for instance, when a
            captured GAO testimony is based on a series of prior GAO reports,
            some of which may not themselves have been captured; these were then
            included for comprehensiveness.
          </li>
          <li>
            <em>Third-party reports</em>. This category includes
            non-governmental organization, academic, and private sector reports.
            Researchers consulted the University of Pennsylvania TTSCP Global
            Think Tank Index, published annually, to compile a list of all
            institutions that have appeared among the top ten in the &ldquo;Top
            Think Tanks in the United States&rdquo; category in any year from
            2008 through 2019.
            <Endnotes.Note>
              University of Pennsylvania Think Tanks and Civil Societies
              Programs. TTCSP Global Go To Think Tank Index Reports, 2008-2019.
              Available from:{' '}
              <ExtLink url="https://repository.upenn.edu/think_tanks/">
                https://repository.upenn.edu/think_tanks/
              </ExtLink>
              . Accessed September 8, 2020.
            </Endnotes.Note>{' '}
            From this list, we excluded the Pew Research Center, the National
            Bureau of Economic Research, and the Peterson Institute for
            International Economics due to their specialized research focuses on
            other topics. The final list consisted of the following
            organizations: the American Enterprise Institute, the Atlantic
            Council, the Brookings Institution, the Carnegie Endowment for
            International Peace, the Cato Institute, the Center for American
            Progress, the Council on Foreign Relations, the Center for Strategic
            and International Studies (CSIS), the Heritage Foundation, the
            Hoover Institution, the Hudson Institute, Human Rights Watch, RAND
            Corporation, the Urban Institute, and the Wilson Center. The team
            consulted the website of each think tank to view its published
            reports. In addition to the standing exclusion criteria, we excluded
            commentaries, blog posts, and other informal products (as opposed to
            formal reports). For each site, we searched for
            &ldquo;pandemic&rdquo; and manually reviewed titles of resulting
            reports, as well as texts when needed, to determine relevancy.
            <br />
            <br />
            The RAND Corporation and Council on Foreign Relations sites
            categorize reports by topic and have particularly relevant
            categories for global health security (e.g., &ldquo;Public Health
            Threats and Pandemics&rdquo;). We manually reviewed all reports in
            these relevant categories in lieu of using a site search. We also
            manually reviewed all reports in relevant categories from the CSIS
            and Hudson Institute sites, but due to concerns about the
            comprehensiveness of these sites&rsquo; categories, the search term
            &ldquo;pandemic&rdquo; was also applied to these two sites.
            <br />
            <br />
            Conducting these searches and manual reviews and applying exclusion
            criteria led to document inclusion from the following institutions:
            the American Enterprise Institute, Brookings Institution, the Center
            for American Progress, the Council on Foreign Relations, CSIS, the
            Heritage Foundation, the Hoover Institution, the Hudson Institute,
            and RAND Corporation.
            <br />
            <br />
            For the National Academies of Sciences, Engineering, and Medicine
            (NASEM), the National Academies Press reports (
            <ExtLink url="https://www.nap.edu/">www.nap.edu</ExtLink>) were
            searched within the topics &ldquo;Biology and Life Sciences&rdquo;
            and &ldquo;Heath and Medicine,&rdquo; dated from 1995-2019; the same
            search terms and date parameters used for hearings were applied. The
            researchers were aware from experience about the existence of one
            relevant NASEM report not captured by any of the keywords and
            included it for comprehensiveness. All reports from NASEM (including
            Institute of Medicine or other such sub-NASEM publishers) were
            titled as &ldquo;National Academies of Sciences, Engineering, and
            Medicine&rdquo; as the publishing organization.
            <br />
            <br />
            In some cases, the publishers of third party reports do not provide
            permission for posting the report on other websites; in these cases,
            information about the report was still provided for
            comprehensiveness, along with a hyperlink for accessing it
            elsewhere.
          </li>
          <li>
            <em>Other methods</em>. To capture additional relevant documents
            that were not already captured by other methods, documents
            referenced by GAO reports already included in the Library (see U.S.
            Step 3) were reviewed. We used document titles and, if needed,
            document contents to assess relevancy. In addition to the standing
            exclusion criteria, articles in academic journals, situation
            reports, laws (including treaties), entries in the Federal Register,
            and items that could not be located online using an internet search
            were excluded. In some cases, GAO reports included in the Library by
            the methodology specified in U.S. Step 3 referenced another GAO
            report that we deemed relevant; in these cases, we included the
            referenced GAO report, but did not in turn consider the second
            report&rsquo;s references for inclusion.
          </li>
        </ol>
        <p>
          After all documents were captured, duplicates and those that based on
          the researchers&rsquo; expert judgement were irrelevant to health
          security and/or pandemics were excluded.
        </p>
        <h3>Other</h3>
        <ol>
          <li>
            <em>Academic journal literature. </em>Journal literature was
            searched using Ovid Medline (
            <ExtLink url="https://ovidsp.ovid.com/">
              https://ovidsp.ovid.com/
            </ExtLink>
            ). The following Boolean search was performed using the Advanced
            Search tool: (exp Coronavirus Infections/ or exp Coronavirus) AND
            (exp Risk Assessment) as limited to articles in English published
            between January 1, 1995 and December 31, 2019. The research team
            reviewed each article to exclude any that met the following
            exclusion criteria (in addition to the standing exclusion criteria)
            regarding article focus: clinical management; non-human species;
            bioterrorism; or biowarfare. Articles behind paywalls were not
            posted; open access articles were posted if the research team
            received permission to do so. When the paper was unavailable or
            behind a paywall, the research team reviewed the piece and
            summarized the item to reflect the comprehensive search results. On
            occasion, journal articles were also captured through other
            means&mdash;specifically, as a result of the search of the WHO IRIS
            database (see Global Step 6), or when a journal record was an
            editorial that flagged one or more relevant papers on coronavirus
            within that issue.
          </li>
          <li>
            <em>Simulations and exercises</em>. Databases and other sources that
            might have records of simulations or exercises were initially
            identified by a Google search of the keywords
            &ldquo;infectious,&rdquo; &ldquo;disease,&rdquo;
            &ldquo;tabletop,&rdquo; &ldquo;exercise,&rdquo;
            &ldquo;report,&rdquo; and &ldquo;readout&rdquo; in various
            combinations. The research team looked for records that described a
            national or international simulation or exercise that was conducted,
            and ideally provided a report-out. Through this method, key
            databases were identified, such as the&nbsp;Homeland Security
            Digital Library (
            <ExtLink url="https://www.hsdl.org/c/">
              https://www.hsdl.org/c/
            </ExtLink>
            ) and the National Institute of Health Emergency and Disaster
            Response Training Exercises (
            <ExtLink url="https://dr2.nlm.nih.gov/training-exercises">
              https://dr2.nlm.nih.gov/training-exercises
            </ExtLink>
            ). The same keyword searches were performed in these databases and
            the hits reviewed for relevance. To review for any potentially
            missed records, the Department of Homeland Security website (
            <ExtLink url="https://www.dhs.gov/">https://www.dhs.gov/</ExtLink>)
            was examined via a parallel search in its primary search bar. The
            exercise summaries for those exercises mentioned in Maxmen and
            Tollefson 2020
            <Endnotes.Note>
              Maxmen, Amy, and Jeff Tollefson. “Two Decades of Pandemic War
              Games Failed to Account for Donald Trump.” Nature, vol. 584, no.
              7819, 4 Aug. 2020, pp. 26–29., doi:10.1038/d41586-020-02277-6.
            </Endnotes.Note>{' '}
            were also sought.
          </li>
        </ol>
        <div id="datacoding" style={{ position: 'relative', top: -100 }} />
        <h2>Data coding</h2>
        <p>
          The team developed a custom data taxonomy and data dictionary to
          define key metadata and organize the dataset. The data were populated
          into Airtable and transferred via API into a database on Amazon Web
          Services. The complete dataset including definitions and a glossary of
          terms can be downloaded{' '}
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => {
              ToExcelQuery({})
            }}
          >
            here
          </a>
          . The Glossary below provides the guidance that researchers used to
          code the data.
        </p>
        <div id="glossary" style={{ position: 'relative', top: -100 }} />
        <h2>Glossary</h2>
        <p>
          This glossary is designed to provide the user with key information to
          understand the way items were coded and the meaning ascribed to them
          by the research team. Other explanations are available throughout the
          above methodological discussion, and through the tooltips available
          throughout the website.
        </p>
        <p>
          <strong>Event</strong>
        </p>
        <p>
          <em>
            A select list of outbreak events to which an item may directly
            relate. This list is not comprehensive; it is a narrow usage that
            applies to records directly related to a specific, select outbreak.
            It does not address records that may be about the same infectious
            disease, or about other outbreaks that pathogen caused.
          </em>
        </p>
        <p>
          <strong>Funder</strong>
        </p>
        <p>
          <em>
            The entity that provided the financial support for the item. Where a
            document specifies the funder of the work (or in some cases, the
            funder of the group that produced the work), the entity or entities
            are listed. Where the document specifies that funding received was
            &ldquo;None,&rdquo; this is indicated as such. Where no funder is
            offered, this is indicated as "Funder not specified.&rdquo;
          </em>
        </p>
        <p>
          <strong>Organization has governance authority</strong>
        </p>
        <p>
          <em>
            Captures whether the Publishing Organization has governance
            authority over the topic, recommendations, or other content of the
            item in the sense of whether it can act on the information contained
            in the record. Intergovernmental organizations may have governance
            authority depending on the context and topic of the product.
          </em>
        </p>
        <p>
          <strong>Publishing organization</strong>
        </p>
        <p>
          <em>
            The group that published the work or led the effort (such as a
            tabletop exercise).
          </em>
        </p>
        <p>
          <strong>Publishing sub-organization</strong>
        </p>
        <p>
          <em>
            When applicable, a more granular level of detail for the Publishing
            Organization. This field is generally populated only when the
            sub-organization is deemed particularly relevant to understanding
            the importance of the report&mdash;for instance, the subcommittee of
            a full congressional committee, or the Inspector General of a
            federal department. The indication can be found beneath the
            Publishing Organization on the View Details page of the record.
          </em>
        </p>
        <p>
          <strong>Publishing organization type</strong>
        </p>
        <p>
          <em>
            Reflects the category of publishing organization that issued the
            work:
          </em>
        </p>
        <ul>
          <li>
            <em>Academic</em>: An institution of higher learning.
          </li>
          <li>
            <em>Academic journal</em>: A scientific journal or other scholarly
            publication.
          </li>
          <li>
            <em>Intergovernmental organization</em>: An entity typically created
            by treaty, involving two or more nations, to work on issues of
            common interest.
          </li>
          <li>
            <em>National/federal government</em>: A governing body within a
            country, operating at the national or federal level.
          </li>
          <li>
            <em>Local government</em>: A subnational governing body within a
            country.
          </li>
          <li>
            <em>Non-governmental organization (NGO)</em>: An organization
            independent of government and distinct from industry or academia;
            NGOs are usually non-profit or not-for-profit entities.
          </li>
          <li>
            <em>Private</em>: A private sector company, usually for-profit.
          </li>
        </ul>
        <p>
          <strong>Title</strong>
        </p>
        <p>
          <em>
            The title of the work as listed on the document. In a small number
            of cases, the title reflects that in the database from which the
            work came, not the title on the document itself. In a small number
            of cases, a document has no title, for instance, a report provided
            in the form of a letter. In these cases the researchers used titles
            as listed elsewhere (e.g., the National Biodefense Science Board
            letters are given "titles" by the Department of Health and Human
            Services on its website).
          </em>
        </p>
        <p>
          <strong>Type of record</strong>
        </p>
        <p>
          <em>
            Reflects a high-level categorization of the form of the record;
            viewed above the report title in the detailed view of a record:
          </em>
        </p>
        <ul>
          <li>
            <em>Report</em>: An item presented as a reporting of findings; may
            include written documentation of studies, meetings, investigations,
            etc. Guidance and technical guidelines are also included in this
            category.
          </li>
          <li>
            <em>Government action</em>: An item that reflects a decisive
            oversight, strategic, or other action taken on the part of a
            national government or an intergovernmental body; may include
            hearings, strategies, plans, resolutions, decisions, etc.
          </li>
          <li>
            <em>Simulation or Exercise</em>: An item about simulations or
            exercises held, where simulations and exercises can be table-top or
            operationalized training activities.
          </li>
          <li>
            <em>Journal paper</em>: An item published in a professional journal;
            may reflect original research, literature reviews, commentaries,
            editorials, letters, and news items; may or may not be
            peer-reviewed.
          </li>
        </ul>
        <p>
          <strong>Topic area</strong>
        </p>
        <p>
          <em>
            Reflects the major topic the report addresses, chosen from a set of
            six selected by the research team; some reports may cover multiple
            topical areas, but only one topic is chosen:
          </em>
        </p>
        <ul>
          <li>
            <em>Threat/risk awareness</em>: An item primarily about
            intelligence, identification of threats, identification of risks,
            threat and/or risk assessments (where risk includes threats,
            vulnerabilities, and/or consequences), etc.
          </li>
          <li>
            <em>Surveillance/detection</em>: An item primarily describing the
            detection and identification of infectious diseases (and relevant
            systems, technologies, challenges, etc.).
          </li>
          <li>
            <em>Medical preparedness/emergency response</em>: An item primarily
            addressing medical readiness, which is wide-ranging and may include:
            medical countermeasures, non-pharmaceutical interventions, medical
            training and workforce, state or local infectious disease
            preparedness, hospital preparedness, clinical responses, etc.; or
            items concerning the response to a public health emergency
            (emergency services capacity, biohazard training, hospital surge
            capacity, etc.). Response to agricultural disease outbreaks is
            generally not included in this category.
          </li>
          <li>
            <em>International aid/collaboration</em>: An item primarily about
            bilateral or multilateral international aid (fiscal, personnel,
            etc.) or about bilateral or multilateral collaborations (information
            sharing, sample sharing, capacity building, etc).
          </li>
          <li>
            <em>Strategic planning</em>: A strategic plan or an implementation
            plan; also, items primarily about planning, the need for plans,
            recommendations for exercises, recommendations for strategic
            frameworks, etc. May include items addressing need for policy
            reforms.
          </li>
          <li>
            <em>Other</em>: Any topic that does not fall into the defined key
            topics; may include reports on a variety of important topics, such
            as laboratory research, research and development, critical
            infrastructure protection, or economic impacts of pandemics. Such
            reports may address key topics, but in a minor or tangential way.
          </li>
        </ul>
        <Endnotes.Endnotes />
      </div>
    </Endnotes.Provider>
  )
}

export default Documentation

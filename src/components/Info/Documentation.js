// 3rd party components
import React, { useState, useEffect } from 'react'

// local components
import { PrimaryButton } from '../common'

// styles and assets
import styles from './info.module.scss'

import ToExcelQuery from '../misc/ToExcelQuery'

import * as Endnotes from '../Endnotes/Endnotes'

const Documentation = ({}) => {
  // STATE  // --------------------------------------------------------------//

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//

  // JSX
  // external link convenience component
  const ExtLink = ({ url, children = url }) => (
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
          <ExtLink url={'https://ghssidea.org/'}>
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
          The library includes documents from global, regional, and
          national-level sources dated from 1972-present. National sources are
          mostly drawn from the United States, with additional sources
          reflecting national pandemic influenza planning from other countries.
          Academic journal literature as it relates to coronaviruses as a global
          infectious disease threat is also represented. This is an ongoing
          research project and the library may be updated to further reflect
          pre-1995 sources, additional countries, and other elements.
        </p>
        <p>The site includes:</p>
        <ol>
          <li>
            A searchable, filterable database of all documents in the dataset.
            The complete dataset can be downloaded in an Excel file format
            directly from the site.
          </li>
          <li>
            A{' '}
            <ExtLink url="/Health_Security_Net_Report.pdf">
              written analysis
            </ExtLink>{' '}
            from the Georgetown University Center for Global Health Science and
            Security reflecting key observations about the dataset.
          </li>
        </ol>
        <p>
          This work and underlying dataset is available for use under the
          Creative Commons Attribution 4.0 International Public License (
          <ExtLink url={'https://creativecommons.org/licenses/by/4.0/'}>
            https://creativecommons.org/licenses/by/4.0/
          </ExtLink>
          ), with appropriate reference and acknowledgement of the original
          research teams, as listed <ExtLink url="/info/">on this site</ExtLink>
          .
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
          documents where they were relevant to global health security and
          pandemic preparedness. All-hazards items captured by the search were
          included only if they also directly addressed the nexus between
          all-hazards preparedness and infectious disease. The library includes
          items published from 1972 &ndash; present.
        </p>
        <h3>Global</h3>
        <p>
          The research team collected documents online from multiple global
          sources and excluded those meeting any of the following
          criteria:&nbsp;
        </p>
        <ul>
          <li>
            Items published prior to January 1, 1995, except where expert review
            judged the item foundational to the development and understanding of
            global health security efforts.
          </li>
          <li>
            Items solely focused on endemic diseases or those typically
            addressed by the global health (as opposed to global health
            security) community, e.g., HIV, TB, malaria, and noncommunicable
            diseases.
          </li>
          <li>Fact sheets on diseases.</li>
          <li>
            Items strictly about bioterrorism and/or biosafety/biological
            accidents, except where noted in this Documentation.
          </li>
        </ul>
        <p>
          Global sources were reviewed for relevant documents. The search
          strategy varied among them, for instance depending on the
          sophistication of their websites&rsquo; search functionality, or
          whether the site provided its own relevant terms for grouping. Global
          sources currently included in Health Security Net include:
        </p>
        <ol className={styles.spacedOutList}>
          <li>
            <strong>
              Food and Agriculture Organization of the United Nations (FAO)
            </strong>
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
            <strong>United Nations General Assembly (UNGA)</strong>: The United
            Nations Digital Library (
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
            <strong>United Nations Security Council (UNSC)</strong>: Based on
            the experience and judgement of Center faculty, the following UNSC
            resolutions were deemed relevant to global health security: 620,
            1308, 1540, 1673, 1810, 1977, 2176, 2177, and 2439. Each of these
            was logged into the database. The text of each was also reviewed for
            mentions of other resolutions, exclusion criteria were applied, and
            any that remained were captured into the database. (All such entries
            met exclusion criteria and thus are not represented in the
            database.)
          </li>
          <li>
            <strong>World Organisation for Animal Health (OIE)</strong>: OIE
            holds annual conferences to discuss and review programs and provide
            guidance for Member States on health-related activities. At the time
            of research, OIE published a dedicated website with resolutions and
            decisions from each conference, which the research team used to
            access these records. This site is no longer available, but the
            documents can still be accessed at{' '}
            <ExtLink url="https://www.oie.int/en/who-we-are/structure/framework/#ui-id-4">
              https://www.oie.int/en/who-we-are/structure/framework/#ui-id-4
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
            <strong>World Health Assembly (WHA)</strong>: WHA holds annual
            conferences to discuss and review programs and provide guidance for
            Member States on health-related activities. Resolutions and
            decisions from each conference are published at{' '}
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
            <p>
              <strong>World Health Organization (WHO)</strong>: WHO documents
              located in the Institutional Repository for Information Sharing
              (IRIS) database were searched (
              <ExtLink url="https://apps.who.int/iris/">
                https://apps.who.int/iris/
              </ExtLink>
              ). Because many of our desired search terms (see United
              States&mdash;Hearings section below) returned thousands of
              results, and IRIS can only export 500 at a time, the research team
              instead used the &ldquo;MeSH&rdquo; subject categories that IRIS
              uses to organize its topics. In the IRIS database, we manually
              searched the &ldquo;MeSH subjects&rdquo; category and chose
              relevant subjects to review.
            </p>
            <p>
              &ldquo;Weekly Update&rdquo; reports and country-specific items
              were excluded from the captured sources; regionally-oriented WHO
              reports were excluded in the first round of data collection.
              Others that in the researchers&rsquo; expert judgement were
              irrelevant to health security were also excluded. During our data
              collection starting February 2021, we gathered WHO regional
              organization documents using the same methodology. We used all of
              the same MeSH terms and filters.
            </p>
          </li>
        </ol>
        <h3>National (United States)</h3>
        <p>
          The research team compiled United States documentation in the form of
          congressional hearings, government reports and other documents, and
          third-party reports and other documents. In most cases, a list of 25
          search terms were deployed to capture a broad array of hits relevant
          to health emergency preparedness (see details below). The team
          excluded documents meeting any of the following criteria:
        </p>
        <ul>
          <li>
            Items prior to January 1, 1995, except where expert review judged
            the item foundational to the development and understanding of global
            health security efforts.
          </li>
          <li>
            Items solely focused on endemic diseases or those typically
            addressed by the global health (as opposed to global health
            security) community, e.g., HIV, TB, malaria.
          </li>
          <li>Fact sheets on diseases.</li>
          <li>
            Items strictly about bioterrorism and/or biosafety/biological
            accidents were excluded except where noted in this Documentation.
          </li>
        </ul>
        <p>The research team sought information from the following sources:</p>
        <ol className={styles.spacedOutList}>
          <li>
            <p>
              <strong>Hearings: </strong>The website{' '}
              <ExtLink url="https://www.congress.gov/">
                www.congress.gov
              </ExtLink>{' '}
              was used as a primary source of information on congressional
              activity by way of the Congressional Record (CR). The CR captures
              committee activity in the form of committee hearings, briefings,
              and business meetings. Records were sought using the following
              keyword searches:
            </p>
            <p>
              <em>
                biodefense; biological threat; biopreparedness; biosurveillance;
                biothreat; CBRN; chemical, biological, radiological, and
                nuclear; coronavirus; Ebola; emerging infectious disease; global
                infectious disease; health security; infectious disease
                epidemic; influenza; MCM; medical countermeasure; medical
                preparedness; medical readiness; medical supply chain security;
                MERS; middle east respiratory syndrome; pandemic; public health
                response; SARS; severe acute respiratory syndrome; zika
              </em>
            </p>
            <p>
              Hits were reviewed for the two types of records that contain
              information on committee activity, the Daily Digest and Senate
              Committee Meetings. Each record was reviewed and the activity it
              represented categorized as a hearing, briefing, or business
              meeting. Hearings were the primary unit of interest, as they
              represent one of the most public forms of congressional oversight
              and information-gathering. Briefings, of which only a small
              minority are noticed in the CR, and business meetings, which
              almost always represent markups of legislation, were excluded.
              Exclusion criteria were applied after all hearings consistent with
              the search terms were identified. Some hearings used the topic of
              bioterrorism to discuss broader preparedness efforts also relevant
              to pandemics, and these were included. Some hearings identified
              from early in the timeframe parameters related to Department of
              Defense (DoD) budgets use terms like &ldquo;health security&rdquo;
              in a way different from the contemporary usage, or cover the topic
              of &ldquo;health readiness&rdquo; more broadly than this library
              is meant to capture; these were excluded. When the search
              occasionally resulted in an announcement for a hearing but no
              actual notice confirming that the hearing took place, additional
              research through{' '}
              <ExtLink url="https://www.congress.gov/">
                www.congress.gov
              </ExtLink>
              , <ExtLink url="https://www.gpo.gov/">www.gpo.gov</ExtLink>, or
              committee websites was undertaken to find a notice confirming that
              the hearing was held. Rarely no such notice can be found, and
              these hearings were excluded on the presumption that they were
              cancelled. On occasion when the research team was aware of
              relevant hearings not captured by any of the keywords, these were
              included for comprehensiveness. All hearing titles were copied
              from the relevant hearing report.
            </p>
            <p>
              In addition to their inclusion in the library, the list of
              included hearings has also been made available as a{' '}
              <ExtLink url="/HealthSecurityNetCongressionalHearingsSupplement.csv">
                supplemental file containing additional metadata
              </ExtLink>
              . In this document, witness names and affiliations for each
              hearing were noted from the CR and other sources, including
              official committee reports available at{' '}
              <ExtLink url="https://www.govinfo.gov/">www.govinfo.gov</ExtLink>{' '}
              and committee websites. Witness names were manually standardized
              to resolve spelling or other discrepancies. Each hearing was
              tagged as having occurred during either Democrat or Republican
              control of a given chamber.
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
                Some committee names changed across the data capture period;
                these were grouped with their current names to permit proper
                committee-level analysis of activity.
              </span>
              <Endnotes.Note>
                Congress.gov website. Committees webpage. Committee Name
                History.{' '}
                <ExtLink url="https://www.congress.gov/help/field-values/current-committees">
                  https://www.congress.gov/help/field-values/current-committees
                </ExtLink>
                . Accessed June 27, 2020.
              </Endnotes.Note>{' '}
              Two hearings were held jointly by multiple committees; for
              analysis purposes, these were treated as though they were held by
              separate, unique committees.
            </p>
          </li>
          <li>
            <p>
              <strong>Government reports.</strong> The research team sought
              reports from sources to which decision-makers in the Executive
              and/or Legislative branches could or should reliably be exposed.
              Three primary groups were considered: independent advisory bodies
              such as federal advisory committees; departments and agencies with
              significant operational jurisdiction over and spending on
              EID-relevant activity;
              <Endnotes.Note>
                Watson C, Watson M, Gastfriend D, Sell TK. Federal Funding for
                Health Security in FY2019. Health Secur. 2018;16(5):281-303.
                Epub 2018/10/20.{' '}
                <ExtLink url={'https://doi.org/10.1089/hs.2018.0077'}>
                  doi: 10.1089/hs.2018.0077
                </ExtLink>
                . PubMed PMID: 30339096.
              </Endnotes.Note>
              <Endnotes.Note>
                Michaud J, Moss K, Kates J. The U.S. Government and Global
                Health Security. Kaiser Family Foundation, December 19, 2020.
              </Endnotes.Note>{' '}
              and government bodies whose specific role is to advise
              decision-makers.
            </p>
            <p>
              Rosters of federal advisory committees for the Department of
              Health and Human Services (HHS) (specifically for the Centers for
              Disease Control and Prevention, National Institutes of Health, and
              Office of the Assistant Secretary for Preparedness and Response),
              the Department of Homeland Security (DHS), and DoD were reviewed;
              those with some responsibility for biodefense were further
              researched for all published reports, and those consistent with
              the same parameters used for hearing adjudication were retained.
              Reports issued by the President&rsquo;s Council of Advisors on
              Science and Technology were included in the same manner. Because
              the body of work issued by each of these entities is relatively
              small and not contained in searchable databases, we did not apply
              the hearing search terms but rather examined the available report
              titles, and content where necessary, to judge whether reports were
              relevant.
            </p>
            <p>
              All Worldwide Threat Assessments issued by the Director of
              National Intelligence (and their precursors by a different name)
              were identified; those that reported an infectious disease threat
              or risk were included. Reports from Inspectors General (IG) of
              DHS, DoD, HHS, U.S. Agency for International Development (USAID),
              and Department of Veterans Affairs (VA) were sought on their
              respective websites; the search terms (same as those used for
              hearings) were input into the search bar for DHS, DoD, HHS, and
              VA. The HHS IG additionally provides a pre-populated category of
              &ldquo;emerging infectious disease preparedness and
              response&rdquo; reports and these reports were also captured.
              <Endnotes.Note>
                U.S. Department of Health and Human Services. Office of
                Inspector General. Infectious Disease Preparedness and Response.
                Available from:{' '}
                <ExtLink url="https://oig.hhs.gov/reports-and-publications/featured-topics/infectious-disease/index.asp" />
                . Accessed June 16, 2020.
              </Endnotes.Note>{' '}
              USAID presents its reports by category; from the &ldquo;Global
              Health&rdquo; page we manually reviewed all entries to extract
              relevant reports. The HHS Public Health Emergency Medical
              Countermeasures Enterprise (PHEMCE) collates and makes a variety
              of reports available on its website, and from these we pulled the
              organization&rsquo;s multi-year budgets. For all of these
              searches, the standing exclusion criteria were applied; those
              deemed topically irrelevant or focused on areas like expenditure
              audits were also omitted.
            </p>
            <p>
              While these and other departments and agencies have issued many
              other EID-relevant reports throughout the timeframe of interest,
              these reports are often one-offs and are not available in any
              systematized fashion to the authors&rsquo; knowledge. The research
              team captured some of these by the methods outlined in United
              States Step 5.
            </p>
            <p>
              Two legislative branch agencies that provide analyses to Congress
              were also included: the Congressional Research Service (CRS) and
              the Government Accountability Office (GAO). The same search terms
              and date parameters used for hearings were applied. For CRS, the
              primary search bar in the public database (
              <ExtLink url="http://crsreports.congress.gov/">
                crsreports.congress.gov
              </ExtLink>
              ) was employed, and for GAO, the primary search bar on its website
              (<ExtLink url="http://www.gao.gov">www.gao.gov</ExtLink>) was
              used. CRS reports are sometimes updated and re-released at a later
              date; in these cases, we documented the most recent date and
              uploaded the most recent report.
            </p>
            <p>
              We also sought to identify federal strategies and implementation
              plans relevant to possible biothreats. We used the following
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
                Efforts. Table 2 (p. 14). Washington, DC: Blue Ribbon Study
                Panel on Biodefense. Hudson Institute, October 2015.
              </Endnotes.Note>{' '}
            </p>
            <p>
              In a small number of cases, the researchers became aware of
              reports that were not captured by the search strategy, for
              instance, when a captured GAO testimony is based on a series of
              prior GAO reports, some of which may not themselves have been
              captured; these were then included for comprehensiveness.
            </p>
          </li>
          <li>
            <strong>Third-party reports</strong>. This category includes
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
            To capture additional influential reports from non-governmental
            organizations, researchers compiled a list of non-governmental
            organizations who had published at least one document already
            included in the database, but whose sites had not yet been fully
            searched. (These organizations’ documents had been included through
            the methods described in <strong>5: Other methods</strong> and{' '}
            <strong>2: Simulations and exercises</strong> below.). The resulting
            list consisted of the following organizations: the American Hospital
            Association, the Association of Public Health Laboratories, the
            Association of State and Territorial Health Officials, the Bill and
            Melinda Gates Foundation, the Center for Transatlantic Relations at
            Johns Hopkins University, the Council of State and Territorial
            Epidemiologists, the Institute for Defense Analyses, the Johns
            Hopkins Center for Civilian Biodefense Studies, the Johns Hopkins
            University Center for Health Security, the Memorial Institute for
            the Prevention of Terrorism, the National Association of County and
            City Health Officials, the National Governors Association, The Lewin
            Group, the Transatlantic Biosecurity Network, Trust for America's
            Health, and the World Economic Forum. The team consulted the website
            of each listed organization to view its published reports, if any
            were publicly available.
            <br />
            <br />
            For the majority of sites that featured publicly available reports,
            we manually reviewed all reports in relevant topic categories
            provided by the website. For the Johns Hopkins University Center for
            Health Security, we manually reviewed all reports. For the Institute
            for Defense Analyses, we searched “pandemic” and “infectious
            disease” and reviewed the search results. For the Association of
            State and Territorial Health Officials, we reviewed all reports in
            the category of “infectious disease,” and also searched for
            “pandemic” and reviewed the search results. For the World Economic
            Forum, we reviewed all reports in the category of “Shaping the
            Future of Health and Healthcare,” and also searched for “pandemic”
            and “infectious disease” and reviewed the search results. In all
            cases when reviewing reports, we first reviewed report titles, and
            then full texts where needed to determine relevancy. In addition to
            the standing exclusion criteria, we excluded commentaries, blog
            posts, and other informal products (as opposed to formal reports).
            We also excluded links to works published elsewhere (for example,
            links to academic journal articles), and also excluded congressional
            testimonies, in order to avoid duplication of existing information
            on congressional hearings (see <strong>1: Hearings</strong> above).
            <br />
            <br />
            Conducting these searches and manual reviews and applying exclusion
            criteria led to document inclusion from the following institutions:
            the Association of Public Health Laboratories, the Association of
            State and Territorial Health Officials, the Institute for Defense
            Analyses, the Johns Hopkins University Center for Health Security,
            the National Governors Association, Trust for America’s Health, and
            the World Economic Forum.
            <br />
            <br />
            In some cases, the publishers of third-party reports do not provide
            permission for posting the report on other websites; in these cases,
            information about the report was still provided for
            comprehensiveness, along with a hyperlink for accessing it
            elsewhere.
          </li>
          <li>
            <strong>Executive Orders and Presidential Directives</strong>. This
            category includes presidential review directives, presidential
            decision directives, and executive orders issued by the president of
            the United States. For this category of documents alone, we expanded
            our inclusion criteria to also include documents that (1) only
            directly discussed biological events of intentional and/or
            accidental origin, but (2) nevertheless provided insight to the
            priorities and frameworks guiding American health security policy at
            the time.
            <br />
            <br />
            To gather executive orders, we consulted the Federal Register, which
            provides an online archive of all executive orders issued since
            1994.
            <Endnotes.Note>
              Federal Register. Executive Orders. Available from:{' '}
              <ExtLink url="https://www.federalregister.gov/presidential-documents/executive-orders">
                https://www.federalregister.gov/presidential-documents/executive-orders
              </ExtLink>
              . Accessed April 4, 2021.
            </Endnotes.Note>{' '}
            We examined the titles and, where necessary, the full texts of all
            executive orders issued from 1995-2021 to determine relevancy.
            <br />
            <br />
            To gather presidential directives, we consulted the online
            collection of unclassified and declassified presidential directives
            maintained by the Federation of American Scientists (FAS).
            <Endnotes.Note>
              Federation of American Scientists. Presidential Directives and
              Executive Orders. Available from:{' '}
              <ExtLink url="https://fas.org/irp/offdocs/direct.htm">
                https://fas.org/irp/offdocs/direct.htm
              </ExtLink>
              . Accessed March 22, 2021.
            </Endnotes.Note>{' '}
            For each review directive and decision directive issued from
            1995-2021 for which the FAS had obtained a declassified or
            unclassified copy, we reviewed the title and, where necessary, the
            full text to determine relevancy.
          </li>
          <li>
            <strong>Other methods</strong>. To capture additional relevant
            documents that were not already captured by other methods, documents
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
        <ol className={styles.spacedOutList}>
          <li>
            <strong>Academic journal literature</strong>. Journal literature was
            searched using Ovid Medline (
            <ExtLink url="https://ovidsp.ovid.com/">
              https://ovidsp.ovid.com/
            </ExtLink>
            ). The following Boolean search was performed using the Advanced
            Search tool: (exp Coronavirus Infections/ or exp Coronavirus) AND
            (exp Risk Assessment) as limited to articles in English published
            prior to January 1, 1995. The research team reviewed each article to
            exclude any that met the following exclusion criteria (in addition
            to the standing exclusion criteria) regarding article focus:
            clinical management; non-human species; bioterrorism; or biowarfare.
            Articles behind paywalls were not posted; open access articles were
            posted if the research team received permission to do so. When the
            paper was unavailable or behind a paywall, the research team
            reviewed the piece and summarized the item to reflect the
            comprehensive search results. On occasion, journal articles were
            also captured through other means&mdash;specifically, as a result of
            the search of the WHO IRIS database (see Global Step 6), CDC
            Morbidity and Mortality Weekly Report, or when a journal record was
            an editorial that flagged one or more relevant papers on coronavirus
            within that issue.
          </li>
          <li>
            <strong>Simulations and exercises</strong>. Databases and other
            sources that might have records of simulations or exercises were
            initially identified by a Google search of the keywords
            &ldquo;infectious,&rdquo; &ldquo;disease,&rdquo;
            &ldquo;tabletop,&rdquo; &ldquo;exercise,&rdquo;
            &ldquo;report,&rdquo; &ldquo;readout,&rdquo; and
            &ldquo;simulation&rdquo; in various combinations. The research team
            looked for records that described a national or international
            simulation or exercise that was conducted, and ideally provided a
            read-out. Exercises were dated according to the date the exercise
            itself was conducted, rather than according to the date the read-out
            was released. The team additionally collected infectious disease
            tabletop exercise toolkits or templates. These toolkits were coded
            as “Report.”
            <br />
            <br />
            Through this method, key databases were identified, such as
            the&nbsp;Homeland Security Digital Library (
            <ExtLink url="https://www.hsdl.org/c/">
              https://www.hsdl.org/c/
            </ExtLink>
            ), the National Institute of Health Emergency and Disaster Response
            Training Exercises (
            <ExtLink url="https://dr2.nlm.nih.gov/training-exercises">
              https://dr2.nlm.nih.gov/training-exercises
            </ExtLink>
            ), the Health and Human Services TRACIE website (
            <ExtLink url="https://asprtracie.hhs.gov/technical-resources/7/exercise-program/1#after-action-reports">
              https://asprtracie.hhs.gov/technical-resources/7/exercise-program/1#after-action-reports
            </ExtLink>
            ) and the United Nations Office for Disarmament Affairs’ list of
            current activities involving the Implementation Support Unit (
            <ExtLink url="https://www.un.org/disarmament/biological-weapons/implementation-support-unit/relevant-activities-overseen-by-the-isu">
              https://www.un.org/disarmament/biological-weapons/implementation-support-unit/relevant-activities-overseen-by-the-isu
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
              7819, 4 Aug. 2020, pp. 26–29.,{' '}
              <ExtLink url={'http://doi.org/10.1038/d41586-020-02277-6'}>
                doi:10.1038/d41586-020-02277-6
              </ExtLink>
              .
            </Endnotes.Note>{' '}
            were also sought.
            <br />
            <br />
            Subject matter experts within the Center for Global Health Science
            and Security provided suggestions for additional websites and
            exercises to review. This included the UN Geneva website (
            <ExtLink url="https://www.ungeneva.org/en">
              https://www.ungeneva.org/en
            </ExtLink>
            ), within which the team performed a search for any mention of
            “simulation” or “tabletop exercise” and identified relevant
            exercises that conformed with Health Security Net’s criteria. The
            research team additionally performed explicit searches to find
            specific exercises it had learned about from the experts or through
            online reading.
          </li>
          <li>
            <strong>National pandemic influenza plans</strong>. National and
            regional pandemic plans were sought using the following sources and
            methods:
            <ul>
              <li>
                Plans were identified in the research paper “Inclusion of
                Veterinary Services in national emergency management plans,"
                <Endnotes.Note>
                  Nasim, A et al. “Inclusion of Veterinary Services in national
                  emergency management plans.” Rev Sci Tech 39 (2) (2020):
                  359-371.{' '}
                  <ExtLink url={'https://doi.org/10.20506/rst.39.2.3087'}>
                    doi:10.20506/rst.39.2.3087
                  </ExtLink>
                </Endnotes.Note>{' '}
                which contained a compiled list of all national emergency plans
                from OIE member countries.
              </li>
              <li>
                An archived WHO influenza plan repository
                <Endnotes.Note>
                  National Plans for Pandemic Preparedness and Risk Management.
                  World Health Organization, 2020,{' '}
                  <ExtLink
                    url={
                      'https://web.archive.org/web/20201126121154/https://extranet.who.int/sph/influenza-plan'
                    }
                  />
                  . Accessed June 2021 via Wayback Machine.
                </Endnotes.Note>{' '}
                was used to search for additional plans and countries that may
                not have been included in that resource; previously unidentified
                plans were then manually searched for via Google. The public
                availability of these plans was determined by searching “Country
                X pandemic influenza plan” into the Google search bar to see if
                it yielded an appropriate link within the first three search
                result pages.
              </li>
              <li>
                WHO regional offices (Africa, Americas, South-East Asia, Europe,
                Eastern Mediterranean, and Western Pacific) were each reviewed
                for a list or repository of publicly available pandemic
                influenza plans of their Member Countries. For offices that
                listed plans but did not have proper links to them, the records
                were sought online via the same methodology described above.
              </li>
              <li>
                Additional plans were gathered from pandemic and avian influenza
                plan repositories provided by the European Centre for Disease
                Prevention and Control
                <Endnotes.Note>
                  Influenza Pandemic Preparedness Plans.{' '}
                  <em>European Centre for Disease Prevention and Control</em>,
                  European Centre for Disease Prevention and Control, 2 Feb.
                  2021,{' '}
                  <ExtLink
                    url={
                      'https://www.ecdc.europa.eu/en/seasonal-influenza/preparedness/influenza-pandemic-preparedness-plans'
                    }
                  />
                  .
                </Endnotes.Note>{' '}
                <span>
                  and the Asia-Pacific Alliance for the Control of Influenza.
                </span>
                <Endnotes.Note>
                  Pandemic Preparedness Plans for the Asia-Pacific Region.{' '}
                  <em>APACI</em>, APACI, 2014,{' '}
                  <ExtLink
                    url={
                      'https://www.apaci.asia/influenza/pandemic-preparedness/pandemic-preparedness-plans-for-the-asia-pacific-region'
                    }
                  />
                </Endnotes.Note>
              </li>
              <li>
                Academic literature analyzing national influenza plans
                <Endnotes.Note>
                  Coker, R., Mounier-Jack, S. “Pandemic influenza preparedness
                  in the Asia-Pacific region.” <em>Lancet (London, England)</em>
                  368(9538) (2006): 886-9.{' '}
                  <ExtLink
                    url={'https://doi.org/10.1016/S0140-6736(06)69209-X'}
                  >
                    doi:10.1016/S0140-6736(06)69209-X
                  </ExtLink>
                </Endnotes.Note>
                <Endnotes.Note>
                  Droogers, M et al. (2019). “European Pandemic Influenza
                  Preparedness Planning: A Review of National Plans.”{' '}
                  <em>Disaster Medicine and Public Health Preparedness</em>,
                  13(3), July 2016, pp.582-592.{' '}
                  <ExtLink url={'https://doi.org/10.1017/dmp.2018.60'}>
                    doi:10.1017/dmp.2018.60
                  </ExtLink>
                </Endnotes.Note>
                <Endnotes.Note>
                  Ortu, G., Mounier-Jack, S., Coker, R. “Pandemic influenza
                  preparedness in Africa is a profound challenge for an already
                  distressed region: analysis of national preparedness plans,”{' '}
                  <em>Health Policy and Planning</em>, 23(3), May 2008, pp.
                  161–169
                </Endnotes.Note>
                <Endnotes.Note>
                  Nicoll, A., Kaiser, R. “Limitations of recently published
                  review of national influenza pandemic plans in Europe.” Euro
                  Surveill. 11(17) (2006)
                </Endnotes.Note>
                <Endnotes.Note>
                  Sambala, E et al. “Pandemic influenza preparedness in the WHO
                  African region: are we ready yet?”{' '}
                  <em>BMC infectious diseases</em>. 18(1), 14 Nov. 2018, pp. 567{' '}
                  <ExtLink url={'https://doi.org/10.1186/s12879-018-3466-1'} />
                </Endnotes.Note>
                <Endnotes.Note>
                  Uscher-Pines L, Omer, S., Barnett, D., Burke, T., Balicer, R.
                  (2006) “Priority Setting for Pandemic Influenza: An Analysis
                  of National Preparedness Plans.” PLoS Med, 3(10) (2006)
                </Endnotes.Note>{' '}
                was reviewed to capture the titles of additional plans, which
                were sought online via the previously described methodology.
              </li>
            </ul>
            <p>
              In cases when a country produced an updated plan some time after
              an original plan had been published, the most recent plan was used
              to create the record; these cases are noted in the record’s
              description. If a plan addressed influenza plus other infectious
              diseases, it was included. Only documents written in English were
              selected, but additional reports in other languages may be added
              at a later date. If the plan stated that it was developed in
              direct response to 2005 H5N1 or 2009 H1N1, it was coded as being
              tied to these outbreak events. Pandemic planning documents for the
              United States were captured via search strategies delineated in
              the “Domestic” section of this methodology.
            </p>
          </li>
          <li>
            <strong>Non-WHO Regional Organizations</strong>. This category
            includes records from regional organizations that collaborate
            through multilateral action. The organizations searched encompassed
            Council of Ministers of Health of Central America and the Dominican
            Republic (COMISCA), the Caribbean Public Health Agency (CARPHA),
            Southern Common Market (MERCOSUR), Central American Integration
            System (SICA), Caribbean Community (CARICOM), African Union,
            European Union, Council of Europe, Association of Southeast Asian
            Nations (ASEAN), Community of Latina American and Caribbean States
            (CELAC), Pacific Alliance, Arab League, Pacific Islanders Forum
            (PIF), Organization of American States (OAS), and Economic Community
            of West African States (ECOWAS). Documents matching search criteria
            were only found on COMISCA’s and ASEAN’s websites. Each
            organization’s website was manually searched using the same search
            terms described above to identify documents, each of which was
            manually scanned to ensure that the terms were not only brief
            mentions but reflected records relevant to the library; those that
            met exclusion criteria were omitted from further analysis.
          </li>
          <li>
            <strong>Emergency declarations for COVID-19</strong>. National
            emergency declarations from the United States and member states of
            the European Union and state-level emergency declarations from the
            United States with regard to the COVID-19 pandemic were captured
            using the following sources and methods:
            <ul>
              <li>
                Initial state and federal declarations were identified via
                COVID-AMP, using the policy category filter with "Emergency
                declarations" selected. Extensions of the original policies,
                amendments, and termination documents were also collected where
                applicable.
              </li>
              <li>
                For states and countries whose emergency declarations were not
                accessible on COVID-AMP, the relevant governmnet's official
                website and online legal archives were reviewed for the
                document.
              </li>
              <li>
                Where possible, both English and official language copies were
                captured. If an English version was not available, the
                researcher attempted to find an English-language press release
                announcing the emergency declaration.
              </li>
            </ul>
          </li>
          <li>
            <strong>Risk and policy communication for COVID-19 response</strong>
            . Several response initiatives specific to COVID-19 in the United
            States were captured in an effort to document what information was
            made public and which actions were taken, in the context of what
            scientific evidence was available at the time. The categories of
            documents for inclusion were brainstormed by the research team.
            Items were captured via manual review of U.S. governmental and
            third-party websites, including statements from public officials in
            cities with initial outbreaks; evolving guidance from the CDC about
            disease transmission and protective measures for the public; travel
            restrictions and repatriation efforts; Strategic National Stockpile
            mobilization; Centers for Medicare and Medicaid Services Emergency
            Rules and policies related to coverage of costs of testing and
            medical care; press releases and guidance from the American Hospital
            Association and American Academy of Pediatrics; industry guidance
            from the International Air Transport Association, International
            Civil Aviation Organization, and American Society of Heating,
            Refrigerating, and Air-Condition Engineers; handbooks from the
            Department of Education on school re-openings; National Governor’s
            Association public health guidance; CDC Advisory Committee on
            Immunization Practices guidance and FDA Emergency Use
            Authorizations; U.S. state vaccination incentive programs; and
            employer rules and regulations related to masking, testing, and
            vaccination.
          </li>
          <li>
            <strong>Investigative journalism on COVID-19</strong>. High-impact
            investigative journalism on key topics throughout the pandemic were
            captured to fill gaps in how the outbreak unfolded. Investigative
            journalism was defined by the research team as pieces that primarily
            reported on information that was not easily accessible or publicly
            available, or that attempted to expose flaws in preparedness or
            response to the pandemic based on what was previously available.
            <br />
            <br />
            Investigative journalism pieces were identified by manually
            reviewing websites with thorough coverage of the COVID-19 pandemic
            dating back to January 2020, including the New York Times, the
            Atlantic, STAT News, the New Yorker, and the Washington Post.
            Articles from AP, Politico, and other sites were included as well if
            they were the first to release an exclusive investigation. While
            capturing investigative reports was highly subjective and there are
            thousands of impactful pieces available, key topics that were
            searched for included supply chain shortages, healthcare system
            preparedness, health disparities and disproportionate impacts on
            vulnerable groups, masking and testing guidance, and intelligence
            failures. The pieces selected may critique government figures, but
            on the basis of their response to the pandemic or actions that
            impacted its trajectory, rather than partisan objections.
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
        <div className={styles.glossary}>
          <p>
            This glossary is designed to provide the user with key information
            to understand the way items were coded and the meaning ascribed to
            them by the research team. Other explanations are available
            throughout the above methodological discussion, and through the
            tooltips available throughout the website.
          </p>
          <p>
            <strong>Event</strong>
          </p>
          <div>
            <em>
              A select list of outbreak events to which an item may directly
              relate. This list is not comprehensive; it is a narrow usage that
              applies to records directly related to a specific, select
              outbreak. It does not address records that may be about the same
              infectious disease, or about other outbreaks that pathogen caused.
            </em>
          </div>
          <p>
            <strong>Funder</strong>
          </p>
          <div>
            <em>
              The entity that provided the financial support for the item. Where
              a document specifies the funder of the work (or in some cases, the
              funder of the group that produced the work), the entity or
              entities are listed. Where the document specifies that funding
              received was &ldquo;None,&rdquo; this is indicated as such. Where
              no funder is offered, this is indicated as "Funder not
              specified.&rdquo;
            </em>
          </div>
          <p>
            <strong>Organization has governance authority</strong>
          </p>
          <div>
            <em>
              Captures whether the Publishing Organization has governance
              authority over the topic, recommendations, or other content of the
              item in the sense of whether it can act on the information
              contained in the record. Intergovernmental organizations may have
              governance authority depending on the context and topic of the
              product.
            </em>
          </div>
          <p>
            <strong>Publishing organization</strong>
          </p>
          <div>
            <em>
              The group that published the work or led the effort (such as a
              tabletop exercise).
            </em>
          </div>
          <p>
            <strong>Publishing sub-organization</strong>
          </p>
          <div>
            <em>
              When applicable, a more granular level of detail for the
              Publishing Organization. This field is generally populated only
              when the sub-organization is deemed particularly relevant to
              understanding the importance of the report&mdash;for instance, the
              subcommittee of a full congressional committee, or the Inspector
              General of a federal department. The indication can be found
              beneath the Publishing Organization on the View Details page of
              the record.
            </em>
          </div>
          <p>
            <strong>Publishing organization type</strong>
          </p>
          <div>
            <em>
              Reflects the category of publishing organization that issued the
              work:
            </em>
          </div>
          <ul>
            <li>
              <span className={styles.medBold}>Academic</span>:{' '}
              <em>An institution of higher learning.</em>
            </li>
            <li>
              <span className={styles.medBold}>Academic journal</span>:{' '}
              <em>A scientific journal or other scholarly publication.</em>
            </li>
            <li>
              <span className={styles.medBold}>
                Intergovernmental organization
              </span>
              :{' '}
              <em>
                An entity typically created by treaty, involving two or more
                nations, to work on issues of common interest.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                National/federal government
              </span>
              :{' '}
              <em>
                A governing body within a country, operating at the national or
                federal level.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Local government</span>:{' '}
              <em>A subnational governing body within a country.</em>
            </li>
            <li>
              <span className={styles.medBold}>
                Non-governmental organization (NGO)
              </span>
              :{' '}
              <em>
                An organization independent of government and distinct from
                industry or academia; NGOs are usually non-profit or
                not-for-profit entities.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Private</span>:{' '}
              <em>A private sector company, usually for-profit.</em>
            </li>
            <li>
              <span className={styles.medBold}>Other</span>:{' '}
              <em>
                An organization that does not fit neatly into one of the other
                categories.
              </em>
            </li>
          </ul>
          <p>
            <strong>Title</strong>
          </p>
          <div>
            <em>
              The title of the work as listed on the document. In a small number
              of cases, the title reflects that in the database from which the
              work came, not the title on the document itself. In a small number
              of cases, a document has no title, for instance, a report provided
              in the form of a letter. In these cases the researchers used
              titles as listed elsewhere (e.g., the National Biodefense Science
              Board letters are given "titles" by the Department of Health and
              Human Services on its website).
            </em>
          </div>
          <p>
            <strong>Type of record</strong>
          </p>
          <div>
            <em>
              Reflects a high-level categorization of the form of the record;
              viewed above the report title in the detailed view of a record:
            </em>
          </div>
          <ul>
            <li>
              <span className={styles.medBold}>Executive order</span>:{' '}
              <em>
                A published directive from the President of the United States to
                direct the activity of one or more entities of the federal
                government. Includes presidential review directives,
                presidential decision directives, and executive orders.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Government action</span>:{' '}
              <em>
                An item that reflects a decisive oversight, strategic, or other
                action taken on the part of a national government or an
                intergovernmental body; may include hearings, strategies, plans,
                resolutions, decisions, etc.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Journal paper</span>:{' '}
              <em>
                An item published in a professional journal; may reflect
                original research, literature reviews, commentaries, editorials,
                letters, textbooks, and news items; may or may not be
                peer-reviewed.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Report</span>:{' '}
              <em>
                An item presented as a reporting of findings; may include
                written documentation of studies, meetings, investigations, etc.
                Guidance and technical guidelines are also included in this
                category.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Simulation or Exercise</span>:{' '}
              <em>
                An item about simulations or exercises held, where simulations
                and exercises can be table-top or operationalized training
                activities.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Situation report</span>:{' '}
              <em>
                A report from the World Health Organization that reflects recent
                development about an outbreak or other health situation, usually
                on a daily or weekly basis.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Strategy/Implementation Plan
              </span>
              :{' '}
              <em>
                A record in the database that has been titled by the Publishing
                Organization as either a strategy and/or an implementation plan.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Technical guidance/Tool</span>:{' '}
              <em>
                An item published by an authoritative body that provides advice,
                assistance, or training pertaining to initiation, operation, or
                maintenance of specialized skills, equipment, or plans.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>UN process document</span>:{' '}
              <em>
                A record in the database from an organ of the United Nations;
                may be a letter, note, resolution, report, agenda item, or other
                kind of U.N. document.
              </em>
            </li>
          </ul>
          <p>
            <strong>Topic area</strong>
          </p>
          <div>
            <em>
              Reflects the major topic the report addresses, chosen from a set
              of six selected by the research team; some reports may cover
              multiple topical areas, but only one topic is chosen:
            </em>
          </div>
          <ul>
            <li>
              <span className={styles.medBold}>Threat/risk awareness</span>:{' '}
              <em>
                An item primarily about intelligence, identification of threats,
                identification of risks, threat and/or risk assessments (where
                risk includes threats, vulnerabilities, and/or consequences),
                etc.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Disease surveillance/detection
              </span>
              :{' '}
              <em>
                An item primarily describing the detection and identification of
                infectious diseases (and relevant systems, technologies,
                challenges, etc.).
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Medical preparedness/emergency response
              </span>
              :{' '}
              <em>
                An item primarily addressing medical readiness, which is
                wide-ranging and may include: medical countermeasures,
                non-pharmaceutical interventions, medical training and
                workforce, state or local infectious disease preparedness,
                hospital preparedness, clinical responses, etc.; or items
                concerning the response to a public health emergency (emergency
                services capacity, biohazard training, hospital surge capacity,
                etc.). Response to agricultural disease outbreaks is generally
                not included in this category.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                International aid/collaboration
              </span>
              :{' '}
              <em>
                An item primarily about bilateral or multilateral international
                aid (fiscal, personnel, etc.) or about bilateral or multilateral
                collaborations (information sharing, sample sharing, capacity
                building, etc.).
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Strategic planning</span>:{' '}
              <em>
                A strategic plan or an implementation plan; also, items
                primarily about planning, the need for plans, recommendations
                for exercises, recommendations for strategic frameworks, etc.
                May include items addressing need for policy reforms.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Other</span>:{' '}
              <em>
                Any topic that does not fall into the defined key topics; may
                include reports on a variety of important topics, such as
                laboratory research, research and development, critical
                infrastructure protection, or economic impacts of pandemics.
                Such reports may address key topics, but in a minor or
                tangential way.
              </em>
            </li>
          </ul>
          <p>
            <strong>Tags</strong>
          </p>
          <div>
            <em>
              A select list of more granular topic areas which an item may
              address, designed to support filtering for documents that share a
              specific health security topic, policy type, impacted population,
              etc. Multiple tags may be selected to best reflect hte content
              covered in the item.
            </em>
          </div>
          <ul>
            <li>
              <span className={styles.medBold}>
                Antimicrobial resistance (AMR)
              </span>
              :{' '}
              <em>
                Resources about the emergence of pathogens that are resistant to
                medication and treatment, or the impact of resistant organism
                and genes on populations and health systems. Documents may also
                address antibiotic resistance (ABR).
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Coverage of healthcare costs
              </span>
              :{' '}
              <em>
                Items about payment and/or reimbursement of medical costs
                through insurance, governmental support, or other mechanisms.
                Relevant medical costs include testing, treatment, or vaccine
                administration.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Crisis standards of care</span>:{' '}
              <em>
                Items describing a substantial change in healthcare operations
                due to the influx of patients in excess of a system or
                facility’s baseline capacity. These may include formal
                declarations of crisis standards of care, changes to resource
                allocation, guidance for triage of life-sustaining
                interventions, establishment of alternate care sites, or
                provision of medical liability waivers.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Direct financial relief</span>:{' '}
              <em>
                Items about extending access to direct financing, funding, or
                expense relief to individuals during a public health emergency.
                These may include items such as stimulus payments to citizens,
                individual tax credits, rental assistance, utility assistance,
                and eviction or foreclosure delays.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Disease characteristics and outcomes
              </span>
              :{' '}
              <em>
                Items discussing the distribution and/or severity of disease,
                including transmission, incidence, prevalence, health outcomes,
                or other associated medical impacts. These may be reports or
                academic studies.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Economic impacts and support
              </span>
              :{' '}
              <em>
                Items related to economic impact assessments or measures taken
                to support the economy and businesses at a large-scale during a
                public health emergency. These may include items such as
                disaster assistance funding, anti-price gouging measures, or PPP
                loans.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Employment regulations</span>:{' '}
              <em>
                Items describing changes to workers compensation and hazard pay,
                emergency personnel designations, occupational safety
                requirements and protections for workers, family and medical
                leave, or unemployment eligibility and benefits during a public
                health emergency.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                EUAs and medical authorizations
              </span>
              :{' '}
              <em>
                Items about expanding access to drugs, devices, PPE, medical or
                facility licensing, telehealth permissions, and other necessary
                provisions for emergency use during COVID-19 via emergency use
                authorizations, additional marketing authorizations, or other
                regulatory pathways designed to increase access.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Health disparities and disproportionate impacts
              </span>
              :{' '}
              <em>
                Items about the differential impacts of disease on certain
                geographies, populations, industries, or groups. These may be
                related to medical or non-medical/social aspects of health.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Health system surge capacity
              </span>
              :{' '}
              <em>
                Resources describing, including but not limited to, preparedness
                and/or rapid-response surge planning; institutional roles and
                responsibilities at various levels and in diverse sectors;
                procurement and supply chain; diagnostics and surveillance;
                community mobilization; and whole community surge approaches.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Healthcare capacity</span>:{' '}
              <em>
                Items describing the baseline status of health infrastructure,
                skilled workforce development, or institutional resilience, and
                how those capacities map to preparedness and response for a
                public health emergency. These documents typically describe
                healthcare systems broadly and may include capacity-building
                measures, risk assessments, strategic plans, or response efforts
                during a surge.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Health system surge capacity
              </span>
              :{' '}
              <em>
                Resources describing, including but not limited to, preparedness
                and/or rapid-response surge planning; institutional roles and
                responsibilities at various levels and in diverse sectors;
                procurement and supply chain; diagnostics and surveillance;
                community mobilization; and whole community surge approaches.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Healthcare worker impacts and support
              </span>
              :{' '}
              <em>
                Items about the short- and long-term implications of a public
                health emergency on healthcare personnel, including risk of
                workplace exposure, staffing shortages, shifting roles and
                responsibilities, the need for emergency response training, and
                mental health impacts.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Hospital-acquired infections
              </span>
              :{' '}
              <em>
                Items about infections that occur from within a healthcare
                setting that are not present at time of admission to the
                facility. Documents with this tag may also include infection
                prevention control (IPC) guidance for hospital settings.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Intentional biological attacks
              </span>
              :{' '}
              <em>
                Items about the deliberate release of a pathogen or biotoxin
                against humans, crops, or livestock. These documents may address
                attacks by state or non-state actors, including bioterrorism,
                biowarfare, and biodefense.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Intergovernmental policy and international governance
              </span>
              :{' '}
              <em>
                Items related to bilateral or multilateral policy and
                guidelines, or measures taken by an intergovernmental entity or
                international non-governmental organization with a focus on
                governance efforts.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>International financing</span>:{' '}
              <em>
                Resources about bilateral or multilateral funding efforts for
                sustained preparedness or emergency response, as related to
                global health security.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Key public health emergency response plans
              </span>
              :{' '}
              <em>
                Items that outline best practices for dealing with public health
                emergencies, typically at a national level. While not
                legally-binding, these guidelines provide specific responses to
                dealing with emergency scenarios and promote coordination across
                agencies.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Laboratory biosafety and biosecurity
              </span>
              :{' '}
              <em>
                Items about the containment principles, technologies, and
                practices to prevent unintentional exposure to pathogens or
                their accidental release within a laboratory setting.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Laboratory capacity</span>:{' '}
              <em>
                Items describing the baseline status of laboratory
                infrastructure and how those capacities map to preparedness and
                response for a public health emergency. These documents may
                include specific recommendations about capacity-building
                measures such as disease detection and surveillance, information
                sharing, and rapid scale-up of diagnostic testing.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Legal frameworks for public health
              </span>
              :{' '}
              <em>
                Items that lay the rules of governance or otherwise regulate
                decision-making at an intergovernmental, national, state, or
                local level during public health emergencies. These frameworks
                contain legally-binding requirements for response during the
                period for which a public health emergency is declared.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Long term care facilities and nursing homes
              </span>
              :{' '}
              <em>
                Items about the operation of or impact to nursing homes and
                other institutions providing living accommodations with
                healthcare for elderly people during a public health emergency.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Medical countermeasures</span>:{' '}
              <em>
                Items about the products, drugs, devices, and other tools used
                to diagnose, prevent, protect from, or treat individuals in the
                event of a public health emergency. This may include research,
                reports, or guidance about vaccines, antibodies, antibiotics,
                therapeutics, or treatments.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Medical surge capacity</span>:{' '}
              <em>
                Resources describing, including but not limited to, rapid
                training of new health personnel; emergency task-sharing;
                standard operating procedures (SOPs) for identifying medical
                needs and moving clinical resources appropriately; and ensuring
                the continuity of service delivery during surge approaches.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Non-COVID health impacts</span>:{' '}
              <em>
                Items discussing the social, behavioral, financial, and other
                non-medical health impacts due to a public health emergency.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Nonpharmaceutical interventions
              </span>
              :{' '}
              <em>
                Items describing or analyzing individual- or community-level
                actions taken to slow the spread of disease, not including
                vaccinations, diagnostic testing, or other medical
                countermeasures.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Origin of SARS-CoV-2</span>:{' '}
              <em>
                Items with plans to investigate or evidence about origin
                theories, documentation of initial human cases of a disease, or
                attribution assessments for SARS-CoV-2.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Pandemic preparedness and history
              </span>
              :{' '}
              <em>
                Items analyzing or describing the evolution of pandemic response
                and preparedness efforts, especially in the context of national
                policy and governance. These may include lessons learned from
                dealing with disease outbreaks, case studies on past outbreaks,
                intelligence on emerging pathogens, and preparatory roundtable
                exercises, evaluations, or training activities.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Prisons, correctional facilities, and jails
              </span>
              :{' '}
              <em>
                Items describing the operation of or impact to facilities in the
                criminal justice system which hold incarcerated persons during a
                public health emergency.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Public health data requirements and systems
              </span>
              :{' '}
              <em>
                Items related to efforts to collect data during a public health
                crisis and the challenges associated with utilizing those
                systems. Documents may include strategic plans for data
                collection, legal or regulatory requirements invoked for
                information-sharing or reporting, standards for data collection,
                or publicly available and widely-used sources of data.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Response frameworks</span>:{' '}
              <em>
                Items describing how to respond to a crisis situation,
                emergency, or disaster with specific details about activating
                emergency processes and the roles and responsibilities of
                individuals and organizations involved in emergency management.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Risk and policy communication
              </span>
              :{' '}
              <em>
                Items about public health messaging and other forms of risk
                communication to relay outbreak information to the public during
                an emergency. These may include public statements about disease
                risk, announcements of formal/informal guidance from officials
                or industry leaders, or review processes for those deciding what
                to communicate and when.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                School closures and reopening
              </span>
              :{' '}
              <em>
                Items related to the closure, reopening, or general operation of
                schools during a public health emergency. These may be about
                childcare, K-12, or higher education.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Sub-national or local public health policies
              </span>
              :{' '}
              <em>
                Items about equipping sub-national, state, or local public
                health systems and leaders to deal with a public health
                emergency. These measures may be legislation, executive orders,
                strategic planning documents, or publications reporting on
                health preparedness initiatives.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Supply chain shortages and supply chain impacts
              </span>
              :{' '}
              <em>
                Items related to short- and long-term supply-chain disruptions.
                These documents may discuss how manufacturers managed their
                supply chains, analyze how different industries were affected,
                evaluate alternative supply scenarios, quantify the impact on
                emergency response, or assess risk on critical economic
                functions.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Surge resilience and recovery
              </span>
              :{' '}
              <em>
                Resources describing how to develop surge resiliency, recovery
                strategies, and guidance for communities and systems to
                transition back to normalcy following a surge.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Surge supply management</span>:{' '}
              <em>
                Resources describing emergency response financing; health
                financing and multi-sectoral approaches; resource sharing
                strategies; and financing the continuity of services.
                Additionally, resources describing procurement and management of
                essential supplies and materials during a surge.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>
                Testing and contact tracing
              </span>
              :{' '}
              <em>
                Items about the distribution, financing, or logistics of
                providing and obtaining diagnostic tests or organizing contact
                tracing efforts.
              </em>
            </li>
            <li>
              <span className={styles.medBold}>Travel and repatriation</span>:{' '}
              <em>
                Items describing efforts to respond to a public health emergency
                using travel restrictions, visa and immigration policy changes,
                and repatriation programs.
              </em>
            </li>
          </ul>
        </div>
        <Endnotes.Endnotes />
      </div>
    </Endnotes.Provider>
  )
}

export default Documentation

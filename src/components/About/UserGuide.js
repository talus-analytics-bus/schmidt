import { style } from 'd3'
// 3rd party components
import React, { useState, useEffect } from 'react'

// local components
import { PrimaryButton } from '../common'

// styles and assets
import styles from './about.module.scss'
import clear from '../../assets/images/clear.png'
import sort from '../../assets/images/sort.png'
import download from '../../assets/images/download.png'
import viewdetails from '../../assets/images/viewdetails.png'
import open from '../../assets/images/open.png'
import empty from '../../assets/images/empty.png'
import filled from '../../assets/images/filled.png'
import bookmarks from '../../assets/images/bookmarks.png'
import opendownload from '../../assets/images/opendownload.png'
import dnld from '../../assets/images/dnld.png'
import print from '../../assets/images/print.png'
import preview from '../../assets/images/preview.png'

const UserGuide = ({}) => {
  // STATE  // --------------------------------------------------------------//

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//

  // JSX
  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <h1>Using the site</h1>
        <PrimaryButton
          {...{
            label: 'Download this user guide',
            isSecondary: true,
            isSmall: true,
            iconName: 'get_app',
          }}
        />
      </div>
      <p>
        Welcome to the Global Health Security Library, a publicly accessible,
        centralized library housing decades of documents, published prior to
        2020, related to threat and risk awareness for pandemic-prone diseases.
      </p>
      <p>
        Learn what guidance decision makers used, prior to the 2020 COVID-19
        pandemic, to prepare for, respond to, and recover from pandemics.
      </p>
      <p>
        Documents on this site include:
        <ul>
          <li>Research</li>
          <li>Government reviews</li>
          <li>Expert analyses</li>
          <li>Hearings</li>
        </ul>
      </p>
      <p>
        Search for specific documents using keywords and filters, or browse by
        topic, specific event, publishing organization, and more.
      </p>
      <p>
        Documents can be bookmarked to view later or downloaded directly (where
        available).
      </p>
      <p className={styles.placeholder}>INSERT IMAGE HERE</p>
      <h1>Learn to use the Global Health Security Library</h1>
      <p>
        <ol>
          <li>
            <a
              href="#searchSection"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`searchSection`).scrollIntoView()
              }}
            >
              Search by specific filters
            </a>
          </li>
          <li>
            <a
              href="#browseSection"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`browseSection`).scrollIntoView()
              }}
            >
              Browse documents
            </a>
          </li>
          <li>
            <a
              href="#downloadSection"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`downloadSection`).scrollIntoView()
              }}
            >
              Download metadata on results by topic
            </a>
          </li>
          <li>
            <a
              href="#viewSection"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`viewSection`).scrollIntoView()
              }}
            >
              View document details and similar documents
            </a>
          </li>
          <li>
            <a
              href="#bookmarkSection"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`bookmarkSection`).scrollIntoView()
              }}
            >
              Bookmark a document
            </a>
          </li>
          <li>
            <a
              href="#previewSection"
              onClick={e => {
                e.preventDefault()
                document.getElementById(`previewSection`).scrollIntoView()
              }}
            >
              Preview and download document (if available)
            </a>
          </li>
        </ol>
      </p>
      <div className={styles.userGuideSection}>
        <div id="searchSection" className={styles.anchor} />
        <h2>Search by specific filters on the Search page</h2>
        <p>
          If you have a specific search query in mind, navigate to the ​
          <strong>Search</strong>​ page in order to narrow your results by the
          available filters.
        </p>
        <p>
          Apply filters by clicking on a category to expand the dropdown list,
          and checking one or more available options. Continue to add filters
          until you are satisfied with the scope of your results.
        </p>
        <p>
          To clear your filters, click the{' '}
          <img className={styles.screenCap} src={clear} alt={'Clear all'} />{' '}
          button.
        </p>
        <p>
          Available filters:
          <ul>
            <li>
              <strong>Year:</strong> year the publication was published
            </li>
            <li>
              <strong>Topic area:</strong>​ key topic addressed by the work
            </li>
            <li>
              <strong>Publishing org type:</strong>​ type of organization
              responsible for publishing
            </li>
            <li>
              <strong>Publishing organization:</strong> organization that
              published the work or led the effort
            </li>
            <li>
              <strong>Event:</strong> specific outbreak event covered by the
              record
            </li>
            <li>
              <strong>Funder:</strong> organization that provides funding for
              the research effort or publication
            </li>
            <li>
              <strong>Document type:</strong> ​the type of document containing
              the research
            </li>
          </ul>
        </p>
        <p className={styles.placeholder}>INSERT IMAGE HERE</p>
      </div>
      <div className={styles.userGuideSection}>
        <div id="browseSection" className={styles.anchor} />
        <h2>Browse documents on the Explore page</h2>
        <p>
          If you don’t have a specific search query in mind, navigate to the{' '}
          <strong>​Explore</strong>​ page to browse the documents by category
          (the categories are the same as the Search page).
        </p>
        <p>
          Results are default sorted by number of results in each category, from
          most to least.
        </p>
        <p>
          Sorting can be adjusted by clicking here:{' '}
          <img
            className={styles.screenCap}
            src={sort}
            alt={'Sorting controls'}
          />
        </p>
        <p className={styles.placeholder}>INSERT IMAGE HERE</p>
      </div>
      <div className={styles.userGuideSection}>
        <div id="downloadSection" className={styles.anchor} />
        <h2>Download metadata on results by topic</h2>
        <p>
          If you want to understand the full scope of all available documents
          for any given search query, download an excel sheet of metadata for
          your results.
        </p>
        <p>
          Click the{' '}
          <img
            className={styles.screenCap}
            src={download}
            alt={'Download results'}
          />{' '}
          button in the upper lefthand corner of your list of results.
        </p>
        <p>
          An excel sheet will download to your computer containing all of the
          available metadata for the filtered documents.
        </p>
        <p className={styles.placeholder}>INSERT IMAGE HERE</p>
      </div>
      <div className={styles.userGuideSection}>
        <div id="viewSection" className={styles.anchor} />
        <h2>View document details and similar documents</h2>
        <p>
          To view more information of a document resulting from your search
          query, click one of two buttons to expand the document detail.
        </p>
        <p>
          Clicking the{' '}
          <img
            className={styles.screenCap}
            src={viewdetails}
            alt={'View details'}
          />{' '}
          button will expand the document details in a popup on your current
          page.
        </p>
        <p>
          Clicking the{' '}
          <img
            className={styles.screenCap}
            src={open}
            alt={'Open in new tab'}
          />{' '}
          button will expand an identical document details page in a new tab.
        </p>
        <p>
          Scrolling down the document details popup or page will reveal
          suggestions for similar items that might be of interest.
        </p>
        <p className={styles.placeholder}>INSERT IMAGE HERE</p>
      </div>
      <div className={styles.userGuideSection}>
        <div id="bookmarkSection" className={styles.anchor} />
        <h2>Bookmark a document</h2>
        <p>
          If you want to save documents to the site to access later, bookmark an
          item to access it later on the ​<strong>Bookmarks</strong> ​page.
        </p>
        <p>
          To bookmark an item, click the{' '}
          <img
            className={styles.screenCap}
            src={empty}
            alt={'Empty bookmark'}
          />{' '}
          icon. Bookmarked items will display a{' '}
          <img
            className={styles.screenCap}
            src={filled}
            alt={'Filled bookmark'}
          />{' '}
          icon.
        </p>
        <p>
          This icon will be available in either the document preview card (in
          your list of results) or on the document detail page.
        </p>
        <p>
          The ​Bookmarks​ tab will display the number of documents that you have
          bookmarked:
        </p>
        <img
          className={styles.screenCap}
          src={bookmarks}
          alt={'Bookmarks tab view, showing 3 bookmarks'}
        />
        <p>
          To unbookmark an item, click the{' '}
          <img
            className={styles.screenCap}
            src={filled}
            alt={'Filled bookmark'}
          />{' '}
          icon again.
        </p>
        <p className={styles.placeholder}>INSERT IMAGE HERE</p>
      </div>
      <div className={styles.userGuideSection}>
        <div id="previewSection" className={styles.anchor} />
        <h2>Preview and download document (if available)</h2>
        <p>
          To view a document, you may either preview the document within your
          browser, or download the document to your files.
        </p>
        <p>
          Clicking the{' '}
          <img className={styles.screenCap} src={preview} alt={'Preview'} />{' '}
          button will open a popup view of the document
        </p>
        <p>
          Clicking the{' '}
          <img
            className={styles.screenCap}
            src={opendownload}
            alt={'Open and download'}
          />{' '}
          button will open the document in a new tab.
        </p>
        <p>
          From either the popup or the new tab, you can click the{' '}
          <img className={styles.screenCap} src={print} alt={'Print'} /> button
          or the{' '}
          <img className={styles.screenCap} src={dnld} alt={'Download'} />{' '}
          button in the upper righthand corner to print or download the
          document, respectively.
        </p>
        <p>Note: Some documents are not available for preview or download.</p>
        <p className={styles.placeholder}>INSERT IMAGE HERE</p>
      </div>
    </div>
  )
}

export default UserGuide

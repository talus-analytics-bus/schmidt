import { style } from 'd3'
// 3rd party components
import React, { useState, useEffect } from 'react'

// local components
import { PrimaryButton } from '../common'

// styles and assets
import styles from './info.module.scss'
import talus from '../../assets/images/talus.png'
import georgetown from '../../assets/images/georgetown.png'
import schmidt from '../../assets/images/schmidt.png'
import usaidLogo from '../../assets/images/usaid.png'

// JSX
// external link convenience component
const ExtLink = ({ url, children = url }) => (
  <a href={url} rel="noreferrer" target="_blank">
    {children}
  </a>
)

const Overview = ({}) => {
  // STATE  // --------------------------------------------------------------//

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//

  // JSX
  return (
    <div className={styles.over}>
      <h1>Overview</h1>
      <p>
        Health Security Net is a publicly accessible, centralized database of
        warnings, evaluations, oversight efforts, strategies, and other
        documents that relate to pandemics prior to 2020. It provides a readily
        available source of information for policymakers, researchers,
        journalists, the general public, and other interested parties to access
        documents written about pandemic risk in the past; unearth patterns that
        reveal why response may be insufficient to date; and develop improved
        policies for the future. The library is a work in progress and continues
        to be updated as additional resources are identified. Please contact us
        with any questions or additions at{' '}
        <a
          target="_blank"
          href="mailto:healthsecuritynet@georgetown.edu"
          rel="noreferrer"
        >
          healthsecuritynet@georgetown.edu.
        </a>
      </p>
      <p>
        The library reflects both global and national sources of information. It
        includes resources published by governments, intergovernmental
        organizations, and the private and non-profit sectors. Global sources
        are the Food and Agriculture Organization, United Nations General
        Assembly, United Nations Security Council, World Organisation for Animal
        Health, and World Health Organization (including the World Health
        Assembly). National sources to date include the United States. The
        academic journal literature as it relates to the global risk of
        coronaviruses is also represented. A paper describing this project is
        available
        <ExtLink url="https://doi.org/10.1089/hs.2021.0141"> here</ExtLink>.
      </p>
      <div className={styles.contributors}>
        <h3>Contributors</h3>
        <div className={styles.contributor}>
          <a
            href={'https://ghss.georgetown.edu/'}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={styles.georgetown}
              src={georgetown}
              alt="Georgetown University Center for Global Health Science and Security logo"
            ></img>
          </a>
          <a
            href={'https://talusanalytics.com/'}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={styles.talus}
              src={talus}
              alt="Talus Analytics logo"
            ></img>
          </a>
        </div>
        <p>
          The Georgetown University Center for Global Health Science and
          Security (GHSS) led the policy research effort, including development
          of methodology, data collection, curation, and coding. Talus Analytics
          developed the taxonomy and ontologies for the documentation,
          integration with the epidemiological data and analysis, and designed,
          built, and maintains the interactive Library site.
        </p>
      </div>
      <div className={styles.contributors}>
        <h3>Funders</h3>
        <div className={styles.funder}>
          <a
            href={'https://schmidtfutures.com/'}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={styles.schmidt}
              src={schmidt}
              alt="Schmidt Futures logo"
            ></img>
          </a>
          <p>
            {' '}
            Schmidt Futures funded the original research effort and the design
            and build for this site.{' '}
          </p>
        </div>
        <div className={styles.funder}>
          <a href={'https://usaid.gov/'} target="_blank" rel="noreferrer">
            <img
              className={styles.usaid}
              src={usaidLogo}
              alt="USAID logo"
            ></img>
          </a>
          <p>
            The Local Health System Sustainability Project (LHSS) in partnership
            with the Georgetown Center for Global Health Science & Security
            collected and compiled surge capacity tools and actionable
            frameworks. This work was made possible by the support of the
            American people through the United States Agency for International
            Development (USAID). The contents are the sole responsibility of the
            authors and do not necessarily reflect the views of USAID or the
            United States government.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Overview

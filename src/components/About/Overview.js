import { style } from 'd3'
// 3rd party components
import React, { useState, useEffect } from 'react'

// local components
import { PrimaryButton } from '../common'

// styles and assets
import styles from './about.module.scss'
import talus from '../../assets/images/talus.png'
import georgetown from '../../assets/images/georgetown.png'
import schmidt from '../../assets/images/schmidt.svg'

const Overview = ({}) => {
  // STATE  // --------------------------------------------------------------//

  // EFFECT HOOKS // -------—-------—-------—-------—-------—-------—-------—//

  // JSX
  return (
    <div className={styles.over}>
      <p>
        The Global Health Security Library is a publicly accessible, centralized
        database of warnings, evaluations, oversight efforts, strategies, and
        other documents that relate to pandemics prior to 2020. It provides a
        readily available source of information for policymakers, researchers,
        journalists, the general public, and other interested parties to access
        documents written about pandemic risk in the past; unearth patterns that
        reveal why response may be insufficient to date; and develop improved
        policies for the future.
      </p>
      <p>
        The data library reflects both global and national sources of
        information. The library includes resources published by governments,
        intergovernmental organizations, and the private sector. Global sources
        are the Food and Agriculture Organization, United Nations General
        Assembly, United Nations Security Council, World Organisation for Animal
        Health, and World Health Organization. National sources include the
        United States and five African countries—Egypt, Ethiopia, Kenya,
        Nigeria, and South Africa; some additional entries point to other
        nations, but they were not explicitly researched. The peer-reviewed
        literature as it relates to coronaviruses as a global infectious disease
        threat is also represented.
      </p>
      <div className={styles.contributors}>
        <h3>Contributors</h3>
        <div className={styles.contributor}>
          <a href={'https://ghss.georgetown.edu/'} target="_blank">
            <img
              className={styles.georgetown}
              src={georgetown}
              alt="Georgetown University Center for Global Health Science and Security logo"
            ></img>
          </a>
          <div className={styles.team}>
            <div className={styles.header}>Team</div>
            <div className={styles.members}>
              <ul>
                <li>Ellen P. Carlin (Principal Investigator)</li>
                <li>Madison Alvarez</li>
                <li>Maydha Dhanuka</li>
                <li>Jessica Highland</li>
                <li>Rebecca Katz</li>
                <li>Andrew Meshnick</li>
                <li>Allie Reichert</li>
                <li>Ryan Remmel</li>
                <li>Siobahn Robinson-Marshall</li>
                <li>Claire Standley</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.contributor}>
          <a href={'https://talusanalytics.com/'} target="_blank">
            <img
              className={styles.talus}
              src={talus}
              alt="Talus Analytics logo"
            ></img>
          </a>
          <div className={styles.team}>
            <div className={styles.header}>Team</div>
            <div className={styles.members}>
              <ul>
                <li>Ellie Graeden (Principal Investigator)</li>
                <li>Nate Bennett</li>
                <li>Alaina Case</li>
                <li>Michael Van Maele</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contributors}>
        <h3>Funder</h3>
        <div className={styles.contributor}>
          <a href={'https://schmidtfutures.com/'} target="_blank">
            <img
              className={styles.schmidt}
              src={schmidt}
              alt="Schmidt Futures logo"
            ></img>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Overview

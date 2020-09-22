// 3rd party packages
import React, { useState } from 'react'
import classNames from 'classnames'

// assets and styles
import styles from './card.module.scss'

// local components
import { PrimaryButton } from '../'

// local utility functions
import { formatDate } from '../../misc/Util'

// constants
const API_URL = process.env.GATSBY_API_URL

/**
 * @method Card
 */
export const Card = ({
  resultNumber,
  id,
  type_of_record,
  title,
  date,
  authors,
  key_topics,
  files,
  ...props
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.col}>
        <div className={styles.resultNumber}>{resultNumber}</div>
      </div>
      <div className={styles.col}>
        {files.length > 0 && (
          <div className={styles.thumbnail}>
            <img src={`${API_URL}/get/file?id=${files[0].id}&get_thumb=true`} />
          </div>
        )}
        {files.length === 0 && (
          <div className={classNames(styles.thumbnail, styles.placeholder)}>
            Preview unavailable
          </div>
        )}
      </div>
      <div className={styles.col}>
        <div className={styles.main}>
          <div className={styles.type}>{type_of_record}</div>
          <div className={styles.title}>
            {title !== '' ? title : 'Untitled'}
          </div>
        </div>

        <div className={styles.detailsAndActions}>
          <div className={styles.details}>
            <div className={styles.authOrg}>
              <i className={'material-icons'}>person</i>
              <div>
                {authors.length > 0 &&
                  authors.map(d => <div>{d.authoring_organization}</div>)}
                {authors.length === 0 && (
                  <div>Authoring organization unavailable</div>
                )}
              </div>
            </div>
            <div className={styles.date}>
              <i className={'material-icons'}>event</i>
              {date !== null && <span>{formatDate(date)}</span>}
              {date === null && <span>Date unavailable</span>}
            </div>
          </div>
          <div className={styles.actions}>
            <PrimaryButton
              {...{ label: 'Preview', iconName: 'preview', isSecondary: true }}
            />
            <PrimaryButton
              {...{ label: 'View details', iconName: 'read_more' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

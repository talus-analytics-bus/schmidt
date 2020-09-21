// 3rd party packages
import React, { useState } from 'react'

// assets and styles
import styles from './card.module.scss'

// local utility functions
import { formatDate } from '../../misc/Util'

// constants
const API_URL = process.env.GATSBY_METRICS_API_URL

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
      </div>
      <div className={styles.col}>
        <div className={styles.main}>
          <div className={styles.type}>{type_of_record}</div>
          <div className={styles.title}>{title}</div>
        </div>

        <div className={styles.detailsAndActions}>
          <div>
            {authors.map(d => (
              <div>{d.authoring_organization}</div>
            ))}
          </div>
          <div>{date !== null && formatDate(date)}</div>
        </div>
      </div>
    </div>
  )
}

export default Card

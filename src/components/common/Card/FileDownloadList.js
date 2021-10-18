import React from 'react'
import { bytesToMegabytes } from '../../misc/Util'
import styles from './FileDownloadList.module.scss'

/**
 * Display a list of files that can be downloaded on click (opened in new tab)
 * @param files The list of files
 * @param baseURL The base download URL to which file's ID param will be added
 */
export const FileDownloadList = ({ label = null, files, baseURL }) => {
  if (files.length === 0) return null
  else
    return (
      <section className={styles.FileDownloadList}>
        {label !== null && <span className={styles.label}>{label}</span>}
        <ul className={styles.fileList}>
          {files.map(f => {
            const label = `${f.filename} (${bytesToMegabytes(f.num_bytes)})`
            const href = `${baseURL}?id=${f.id}`
            return (
              <li>
                <a
                  target={'_blank'}
                  {...{
                    href,
                  }}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    )
}

export default FileDownloadList

import React, { FC, ReactElement, useState } from 'react'
import { bytesToMegabytes } from '../../misc/Util.js'
import styles from './FileDownloadList.module.scss'

type FileDownloadListProps = {
  label: string | ReactElement
  files: Record<string, any>[]
  baseURL: string
} & Collapsible
type Collapsible =
  | {
      collapsible?: false
      defaultClosed?: never
    }
  | { collapsible?: true; defaultClosed?: boolean }

/**
 * Display a list of files that can be downloaded on click (opened in new tab)
 * @param label Optional: A label to display above the list
 * @param files The list of files
 * @param baseURL The base download URL to which file's ID param will be added
 * @param collapsible Optional: True if list should be collapsible via caret,
 * false otherwise; defaults to true
 * @param defaultClosed Optional: True if the list should be closed by default,
 * false if open; defaults to true
 */
export const FileDownloadList: FC<FileDownloadListProps> = ({
  label = null,
  files,
  baseURL,
  collapsible = true,
  defaultClosed = true,
}) => {
  const [open, setOpen] = useState<boolean>(!collapsible || !defaultClosed)
  if (files.length === 0) return null
  else
    return (
      <section className={styles.FileDownloadList}>
        {label !== null && (
          <Header {...{ label, open, setOpen, collapsible }} />
        )}
        {open && (
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
        )}
      </section>
    )
}

type HeaderProps = {
  label: string | ReactElement
  open: boolean
  setOpen: Function
  collapsible: boolean
}

/**
 * A header for a file download list, optionally collapsible.
 * @param param0 Parameters including the label content, whether the list is
 * collapsible, currently open, and the state setter for open/closed.
 * @returns A header for a file download list, optionally collapsible.
 */
const Header: FC<HeaderProps> = ({
  label,
  collapsible = true,
  open = false,
  setOpen,
}) => (
  <span className={styles.label} onClick={() => setOpen(!open)}>
    <div>{label}</div>
    {collapsible && <Caret {...{ open, setOpen }} />}
  </span>
)

/**
 * A caret (pointer) for collapsible lists and drawers.
 * @param param0 The parameters, currently only whether the caret is in the
 * open state or not.
 * @returns The caret
 */
const Caret: FC<{ open: boolean }> = ({ open }) => (
  <i className="material-icons">{open ? 'arrow_drop_up' : 'arrow_drop_down'}</i>
)

export default FileDownloadList

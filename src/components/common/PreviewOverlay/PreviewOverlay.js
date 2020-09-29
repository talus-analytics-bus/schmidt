// 3rd party components
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
// import axios from 'axios'

// local components
import { Ticker } from '../'

// local utility functions
// import ItemQuery from '../../components/misc/ItemQuery'
// import {
//   asBulletDelimitedList,
//   toggleFilter,
//   getHighlightSegments,
//   getTooltipTextFunc,
// } from '../../components/misc/Util'

// styles and assets
import styles from './previewoverlay.module.scss'

// constants
const API_URL = process.env.GATSBY_API_URL
const S3_URL = process.env.GATSBY_S3_URL

const PreviewOverlay = ({
  // id of item
  id,

  // files data
  files = [],

  // is this the current preview overlay?
  showPreview,
  setShowPreview,
}) => {
  // STATE
  // opacity of overlay
  const [opacity, setOpacity] = useState(0)

  // current file array element index
  const [curFileIdx, setCurFileIdx] = useState(0)

  // CONSTANTS
  const file = files[curFileIdx]

  // REFS
  // track overlay element so it can be dismissed if user clicks outside it
  const wrapperRef = useRef(null)

  // EFFECT HOOKS
  // fade in when loaded
  useEffect(() => {
    if (showPreview) setOpacity(1)
    else setOpacity(0)

    // define onclick listener to close overlay if clicked outside it
    const onClick = e => {
      if (typeof document !== 'undefined') {
        if (wrapperRef === null || wrapperRef.current === null) return
        const wrapper = wrapperRef.current
        if (wrapper && wrapper.contains(e.target)) {
          return
        } else {
          if (typeof window !== 'undefined') {
            window.removeEventListener('click', onClick)
            setShowPreview(false)
          }
        }
      }
    }

    // Close filter if user clicks outside it
    if (showPreview !== false) {
      if (typeof window !== 'undefined')
        window.addEventListener('click', onClick)
    }
    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [showPreview])

  // add listener to close overlay on esc key
  useEffect(() => {
    // close overlay on escape key
    const escFunctionPreview = e => {
      if (e.keyCode === 27) setShowPreview(false)
    }

    // assign listener
    document.addEventListener('keydown', escFunctionPreview, false)

    // remove listener on unmount
    return () => {
      document.removeEventListener('keydown', escFunctionPreview, false)
    }
  }, [])

  // JSX
  if (!showPreview)
    return (
      <div key={'previewOverlay-' + id} className={styles.previewOverlay}></div>
    )
  return (
    <div key={'previewOverlay-' + id} className={styles.previewOverlay}>
      <div
        style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'all' }}
        className={styles.container}
      >
        <div ref={wrapperRef} className={styles.content}>
          <div className={styles.titleAndCloseButton}>
            <div className={styles.title}>{file.filename}</div>
            <div
              onClick={() => setShowPreview(false)}
              className={styles.closeButton}
            >
              <i className={'material-icons'}>close</i>
            </div>
          </div>

          <div className={styles.currentFileWindow}>
            <iframe
              src={`${API_URL}/get/file/${file.filename.replace(
                /\?/g,
                ''
              )}?id=${file.id}`}
            ></iframe>
          </div>
          {files.length > 1 && (
            <div className={styles.fileTicker}>
              <Ticker
                {...{
                  items: files.map(({ id, filename, s3_filename }) => {
                    return {
                      id,
                      label: filename,
                      imgSrcUrl: `${S3_URL}/${s3_filename}_thumb`,
                    }
                  }),
                  curItemIdx: curFileIdx,
                  setCurItemIdx: setCurFileIdx,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreviewOverlay

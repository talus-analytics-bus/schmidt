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
  }, [showPreview])

  // on click anywhere but in menu, and menu is shown, close menu; otherwise
  // do nothing
  useEffect(() => {
    // if (opacity === 1 && typeof document !== 'undefined')
    document.getElementsByTagName('html')[0].onclick = e => {
      if (wrapperRef === null || wrapperRef.current === null) return
      const wrapper = wrapperRef.current
      if (wrapper && wrapper.contains(e.target)) return
      else {
        setShowPreview(false)
      }
    }
  }, [opacity])

  // JSX
  if (!showPreview)
    return (
      <div
        key={'previewOverlay-' + id}
        style={{ opacity: 0, pointerEvents: 'none', display: 'none' }}
        className={styles.previewOverlay}
      ></div>
    )
  return (
    <div
      key={'previewOverlay-' + id}
      style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'all' }}
      className={styles.previewOverlay}
    >
      <div className={styles.container}>
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

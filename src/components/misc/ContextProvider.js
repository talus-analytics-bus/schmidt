import React, { createContext, useEffect, useState } from 'react'
import { defaultContext } from './Util'
import BrowserDetection from 'react-browser-detection'
import Modal from 'reactjs-popup'
import classNames from 'classnames'
import styles from './contextprovider.module.scss'
export const appContext = createContext()

const ContextProvider = ({ children }) => {
  const [data, setData] = useState(defaultContext.data)
  const [modalShown, setModalShown] = useState(false)
  const initialContext = { data, setData }
  const close = () => {
    setModalShown(true)
  }
  // function to return modal content for unsupported browser modal
  const browserModal = browser => (
    <Modal
      position="top center"
      on="click"
      closeOnDocumentClick
      defaultOpen={true}
      className={'browser-modal'}
      modal
    >
      {close => (
        <div className={styles.container}>
          <div className={styles.body}>
            <h3 className={styles.header}>Please try a different browser</h3>
            <div className={styles.content}>
              <div className={styles.text}>
                <p>
                  Health Security Net was designed for Chrome, Firefox, and
                  Safari desktop browsers, but you seem to be using an
                  unsupported browser.
                </p>
                <p>
                  If this is correct, please open Health Security Net in Chrome,
                  Firefox, or Safari for desktop instead. Note that most Health
                  Security Net features are not optimized for mobile devices.
                </p>
              </div>
              <button className={classNames('button', 'modal')} onClick={close}>
                Continue
              </button>
            </div>
          </div>

          <div
            style={{ opacity: modalShown ? 0 : 0.5 }}
            className={styles.shadow}
          ></div>
        </div>
      )}
    </Modal>
  )

  // define which browsers should trigger a "please use a different browser"
  // modal, using a function that returns the modal content based on the
  // detected browser
  // TODO fix mobile detection
  const modalToShow = {
    chrome: () => null,
    firefox: () => null,
    safari: browser => null,
    edge: browser => browserModal('Edge'),
    ie: browser => browserModal('Internet Explorer'),
    opera: browser => browserModal('Opera'),
    default: () => null,
  }

  useEffect(() => {
    if (modalToShow === null) {
      setModalShown(true)
    }
  }, [modalShown])

  return (
    <appContext.Provider value={initialContext}>
      {!modalShown && <BrowserDetection>{modalToShow}</BrowserDetection>}
      {children}{' '}
    </appContext.Provider>
  )
}

export default ContextProvider

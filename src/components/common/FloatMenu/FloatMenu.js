/**
 * Menu that floats over the main DOM when its control component is activated
 */

// standard packages
import React, { useEffect, useState, useRef } from 'react'
import styles from './floatmenu.module.scss'

// 3rd party packages
import classNames from 'classnames'

// FUNCTION COMPONENT // ----------------------------------------------------//
const FloatMenu = ({
  children,
  control,
  customClose = false,
  setCustomClose = () => '',
  ...props
}) => {
  // STATE // ---------------------------------------------------------------//
  const [show, setShow] = useState(false)

  // CONSTANTS // -----------------------------------------------------------//
  // define wrapper reference to support detecting when user clicks outside of
  // the menu, triggering an auto close (see effect hooks below)
  let wrapperRef = useRef(null)

  // EFFECT HOOKS // --------------------------------------------------------//
  // on click anywhere but in menu, and menu is shown, close menu; otherwise
  // do nothing
  useEffect(() => {
    if (show && document !== undefined)
      document.getElementById('___gatsby').onclick = e => {
        if (wrapperRef === null || wrapperRef.current === null) return
        const wrapper = wrapperRef.current
        if (wrapper && wrapper.contains(e.target)) return
        else {
          setShow(false)
          setCustomClose(false)
        }
      }
  }, [show])

  // JSX // -----------------------------------------------------------------//
  // if control defined, use it, otherwise, use default
  if (control === undefined) {
    control = <button>{show ? 'hide' : 'show'}</button>
  } else control = control(show)
  return (
    <>
      <span
        className={styles.control}
        onClick={() => {
          setShow(!show)
          setCustomClose(false)
        }}
      >
        {control}
      </span>
      <span className={styles.wrapper} ref={wrapperRef}>
        <div
          className={classNames(styles.content, {
            [styles.show]: show && !customClose,
          })}
        >
          {children}
        </div>
      </span>
    </>
  )
}

export default FloatMenu

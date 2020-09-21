import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import styles from './radiotoggle.module.scss'
import { darkSelectedBlue } from '../../../assets/styles/vars.scss'
import { InfoTooltip } from '..'

/**
 * Generic radio toggle
 * @method RadioToggle
 */
const RadioToggle = ({
  choices,
  curVal,
  callback,
  onClick,
  label,
  className,
  ...props
}) => {
  // CONSTANTS
  const selectRef = useRef(null)

  useEffect(() => {
    if (props.selectpicker && selectRef.current !== null) {
      selectRef.current.value = curVal
    }
  }, [curVal])

  /**
   * When radio button changes, set current choice equal to its value.
   * @method onChange
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  const onChange = e => {
    e.stopPropagation()
    if (props.selectpicker) {
      callback(e.target.value)
    } else {
      const input = e.target.closest('label').querySelector('input')
      callback(input.value)
    }
  }

  if (onClick === undefined) onClick = (a, b) => b

  if (props.selectpicker) {
    return (
      <div
        className={classNames(
          className !== undefined ? className : '',
          styles.radioToggle,
          {
            [styles.disabled]: props.disabled === true,
          }
        )}
      >
        <div className={classNames(className !== undefined ? className : '')}>
          {label}
          {props.tooltip && (
            <InfoTooltip id={'tooltip-' + label} text={props.tooltip} />
          )}
        </div>
        <select ref={selectRef} onChange={callback ? onChange : undefined}>
          {choices.map(c => (
            <option
              value={c.value}
              key={c.value}
              checked={c.value === curVal ? 'checked' : ''}
            >
              {c.name || c.label}
            </option>
          ))}
        </select>
      </div>
    )
  } else {
    return (
      <div
        className={classNames(
          classNames(className !== undefined ? className : ''),
          styles.radioToggle,
          {
            [styles.disabled]: props.disabled === true,
            [styles.horizontal]: props.horizontal === true,
            [styles.right]: props.right === true,
            [styles.left]: props.left === true,
          }
        )}
      >
        <div role="label">{label}</div>
        <form>
          {choices.map(c => (
            <span key={c.value}>
              {onClick(
                c.value,
                <label
                  style={{
                    color:
                      curVal.toString() === c.value.toString()
                        ? darkSelectedBlue
                        : '',
                  }}
                  disabled={
                    props.disabled === true || c.disabled === true
                      ? 'disabled'
                      : ''
                  }
                  onClick={callback ? onChange : undefined}
                >
                  <input
                    disabled={
                      props.disabled === true || c.disabled === true
                        ? 'disabled'
                        : ''
                    }
                    type="radio"
                    name={c.name || c.label}
                    value={c.value}
                    checked={curVal.toString() === c.value.toString()}
                    readOnly
                  />
                  <span>
                    {getLabelJsx(c.name || c.label)}
                    {c.tooltip && (
                      <InfoTooltip
                        id={c.value}
                        text={c.tooltip}
                        setInfoTooltipContent={props.setInfoTooltipContent}
                      />
                    )}
                  </span>
                </label>
              )}
            </span>
          ))}
        </form>
      </div>
    )
  }
}

/**
 * Given plain text, convert to series of DOM lines separated by line breaks
 * with the defined character limit.
 * @method getLabelJsx
 * @param  {[type]}    text [description]
 * @return {[type]}         [description]
 */
const getLabelJsx = text => {
  const maxChars = 30
  const words = text.split(' ')
  let line = ''
  const lines = []

  words.forEach(word => {
    const possibleLine = line + ' ' + word
    if (possibleLine.length < maxChars) {
      line += ' ' + word
    } else if (line !== '') {
      const newLine = line
      lines.push(newLine.trim())
      line = word
    }
  })
  lines.push(line.trim())

  return lines.map((d, i) => (
    <React.Fragment key={d + '-' + i}>
      {d}
      {i !== lines.length - 1 && <br />}
    </React.Fragment>
  ))
}

export default RadioToggle

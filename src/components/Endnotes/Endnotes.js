import React from 'react'

import styles from './Endnotes.module.scss'

// USAGE
// import as:
//     import * as Endnotes from '../Endnotes/Endnotes

// Endnotes section must be enclosed by
//     <Endnotes.Provider offset={-100}></Endnotes.Provider>
// where the offset is the number of pixels the links
// should scroll to below the top of the screen
// the provider must be positioned so that it
// mounts and unmounts with the endnotes.

// Example note:
//     <Endnotes.Note>
//         Note JSX goes here
//     </Endnotes.Note>

// To add another note referencing an earlier note:
//     <Endnotes.Note number={1} />

// To render the endnotes:
//     <Endnotes.Endnotes />

const endNoteContext = React.createContext()

// the endnote provider manages shared
// state between the endnotes so that they
// can look up what order they live in
// and store the notes to render at the end
export const Provider = props => {
  const endNotesState = React.useState({})

  // This is a ref instead of state because
  // we don't want changes to the counter
  // to re-render components that have used it
  const endNotesCounter = React.useRef(1)

  const contextValue = {
    endNotesState,
    endNotesCounter,
    offset: props.offset,
  }

  return (
    <endNoteContext.Provider value={contextValue}>
      {props.children}
    </endNoteContext.Provider>
  )
}

export const Note = props => {
  const context = React.useContext(endNoteContext)
  const [notes, setNotes] = context.endNotesState
  const numberOverride = props.number

  // this ref stores this note's unique number, from
  // mount until unmount. The ref guarantees it will
  // stay constant even through subsequent renders
  // while counter.current increases
  const noteNumber = React.useRef(
    numberOverride || context.endNotesCounter.current
  )

  React.useEffect(() => {
    if (!numberOverride)
      setNotes(notes => ({ ...notes, [noteNumber.current]: props.children }))
  }, [numberOverride])

  // useEffect runs asynchronously after the components mount,
  // so updating this ref inside a useEffect will not pass the
  // updated value to subsequent as they mount, so I'm setting
  // it synchronously in the first render cycle and then using
  // the useEffect to stop it from running in subsequent cycles.
  const [firstRender, setFirstRender] = React.useState(true)
  if (firstRender && !numberOverride) context.endNotesCounter.current += 1

  React.useEffect(() => {
    setFirstRender(false)
  }, [])

  // This is the adjustment for the height of the navbar
  const anchorStyle = { position: 'relative', top: context.offset || 0 }

  return (
    <sup className={styles.note}>
      <span id={'note_' + noteNumber.current} style={anchorStyle} />
      <a
        href={`#endnote_${noteNumber.current}`}
        onClick={e => {
          e.preventDefault()
          document
            .getElementById(`endnote_${noteNumber.current}`)
            .scrollIntoView()
        }}
      >
        {noteNumber.current}
      </a>
    </sup>
  )
}

export const Endnotes = props => {
  const context = React.useContext(endNoteContext)
  const [notes] = context.endNotesState
  const anchorStyle = { position: 'relative', top: context.offset - 30 }

  const endNotesJSX = Object.entries(notes).map(([id, note]) => (
    <div key={id} className={styles.endnote}>
      <span id={`endnote_${id}`} style={anchorStyle} />
      <a
        className={styles.endnote}
        href={`#note_${id}`}
        onClick={e => {
          e.preventDefault()
          document.getElementById(`note_${id}`).scrollIntoView()
        }}
      >
        {id}
      </a>
      <div className={styles.endnoteParagraph}>{note}</div>
    </div>
  ))

  return <div className={styles.endnotes}>{endNotesJSX}</div>
}

import React, { createContext, useState } from 'react'

export const appContext = createContext()

const ContextProvider = ({ children }) => {
  const [data, setData] = useState({ key_topics: null })
  const initialContext = { data, setData }

  return (
    <appContext.Provider value={initialContext}>{children}</appContext.Provider>
  )
}

export default ContextProvider

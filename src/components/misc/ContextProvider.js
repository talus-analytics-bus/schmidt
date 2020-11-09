import React, { createContext, useState } from 'react'
import { defaultContext } from './Util'
export const appContext = createContext()

const ContextProvider = ({ children }) => {
  const [data, setData] = useState(defaultContext.data)
  const initialContext = { data, setData }

  return (
    <appContext.Provider value={initialContext}>{children}</appContext.Provider>
  )
}

export default ContextProvider

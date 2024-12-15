'use client'
import { createContext, useState, useContext} from 'react'

const ActivityContext = createContext()
export function useActivity() {
  return useContext(ActivityContext)
}

export function ActivityProvider({ children }) {
  const [muted, setMuted] = useState(true)

  const value = {
    muted,
    setMuted,
  }
  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}

import { useState, useEffect } from 'react'

export default function useWindowWidth(initialSize: number) {
  const [windowWidth, setWindowWidth] = useState(() => {
    // use a lazy initializer, which helps you have a cleaner
    // view into how this might be initialized in either CSR or SSR contexts
    return typeof window !== 'undefined' ? window.innerWidth : initialSize // start with state at zero if we are on the server
    // naturally you can change `0` to whatever you prefer, or suits your needs best
  })

  useEffect(() => {
    // inside useEffect, the window is always present
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth)
    }

    updateWindowSize() // as soon as we are on the client, run this handler

    window.addEventListener('resize', updateWindowSize) // works only on resize events

    return () => {
      window.removeEventListener('resize', updateWindowSize) // clean up
    }
  }, []) // attach this once

  return windowWidth
}

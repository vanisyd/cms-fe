import { createRef, useEffect } from "react"

const useClickOutside = <T extends HTMLElement>(callback: CallableFunction) => {
  const elem = createRef<T>()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (elem.current && !elem.current.contains(event.target as unknown as Node)) {
        // callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [elem])

  return elem
}

export default useClickOutside
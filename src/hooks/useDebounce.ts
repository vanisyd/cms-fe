import { useEffect, useRef } from "react";

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;

const useDebounce = <Func extends SomeFunction>(func: Func, delay = 1000) => {
  const timer = useRef<Timer>()

  useEffect(() => {
    return () => {
      if (!timer.current) return
      clearTimeout(timer.current)
    }
  }, [])

  const debouncedFunc = ((...args: any) => {
    const newTimer = setTimeout(() => {
      func(...args)
    }, delay)
    clearTimeout(timer.current ?? undefined)
    timer.current = newTimer
  })

  return debouncedFunc
}

export default useDebounce
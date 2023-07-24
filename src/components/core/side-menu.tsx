import { useEffect, useState } from "react"
import useClickOutside from "../../hooks/useClickOutside"

interface IProps {
  children: JSX.Element,
  isOpen: boolean,
  closed?: CallableFunction
}

const SideMenu: React.FC<IProps> = (props) => {
  const [opened, setOpened] = useState<boolean>(false)
  const { children, isOpen, closed } = props

  const elem = useClickOutside<HTMLDivElement>(() => {
    if (closed !== undefined) {
      closed()
    }
    setOpened(false)
  })

  useEffect(() => {
    setOpened(isOpen)
  }, [isOpen])

  if (opened) {
    return (
      <div
        ref={elem}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '30vw',
          backgroundColor: 'white',
          border: '1px solid #d3d3d3',
          boxShadow: '12px 0px 20px 0px',
          zIndex: '200'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '95%',
            height: '97%',
            padding: '1rem'
          }}
        >
          {children}
        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default SideMenu
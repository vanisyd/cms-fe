import Avatar from "@mui/material/Avatar"
import { useAppSelector } from "../../state/hook"

const Header: React.FC = () => {
  const userState = useAppSelector(state => state.user.user)

  return (
    <div
      style={{
        position: 'fixed',
        height: '4rem',
        width: '100%',
        backgroundColor: 'rgb(255 251 246)', // TODO: use theme
        boxShadow: '0px 7px 9px 0px',
        zIndex: '100',
        bottom: 0
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          alignItems: 'center',
          height: '100%',
          paddingLeft: '1rem'
        }}
      >
        <Avatar>{userState.name !== undefined && userState.name[0]}</Avatar>
        <span>{userState.name ?? ''}</span>
      </div>
    </div>
  )
}

export default Header
import { Outlet } from "react-router-dom"
import Header from "../../components/header"

const ClientLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default ClientLayout
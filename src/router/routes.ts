import { IRouteGroup, importModule } from "./utils"

const routes: IRouteGroup = {
  admin: {
    path: 'admin',
    layout: importModule(() => import('@/layouts/admin')),
    children: {
      auth: {
        path: 'login',
        element: importModule(() => import('@/pages/admin/auth'))
      },
      user: {
        path: 'user',
        element: importModule(() => import('@/pages/admin/user'))
      }
    }
  },
  client: {
    path: 'client',
    layout: importModule(() => import('@/layouts/client')),
    children: {
      accounts: {
        path: 'accounts',
        element: importModule(() => import('@/pages/client/accounts'))
      }
    }
  },
  register: {
    path: 'register',
    element: importModule(() => import('@/pages/register'))
  }
}

export default routes
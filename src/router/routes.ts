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
    path: '',
    layout: importModule(() => import('@/layouts/client'))
  },
  register: {
    path: 'register',
    element: importModule(() => import('@/pages/register'))
  }
}

export default routes
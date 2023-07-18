import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "./loadable";

const AdminLayout = Loadable(lazy(() => import('../layouts/admin/index')))
const UsersPage = Loadable(lazy(() => import('../pages/admin/user/index')))
const PostsPage = Loadable(lazy(() => import('../pages/admin/posts/index')))
const AuthPage = Loadable(lazy(() => import('../pages/admin/auth/index')))

const adminRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <AdminLayout />,
    children: [
      {
        path: '/dashboard/user',
        element: <UsersPage />,
      },
      {
        path: '/dashboard/posts',
        element: <PostsPage />
      }
    ]
  },
  {
    path: '/login',
    element: <AuthPage />
  }
]

export default adminRoutes
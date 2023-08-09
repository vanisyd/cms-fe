import { RouteObject, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import { IRouteGroup } from "./utils";

export const getRoute = (routeName: string): string => {
  let routePath = ''
  const routesObj = routes
  let nestedObj: any = null
  routeName.split('.').forEach((item: string, index: number) => {
    routePath += '/'
    if (index === 0) {
      routePath += routesObj[item].path
      nestedObj = routesObj[item].children
    } else {
      routePath += nestedObj[item].path
      nestedObj = nestedObj[item].children
    }
  })

  return routePath
}

const Router = () => {
  const getRoutes = () => {
    return buildRoutes(routes)
  }

  const buildRoutes = (routesObj: IRouteGroup, prefix?: string) => {
    let routeObjects: RouteObject[] = []

    for (const routeKey in routesObj) {
      let obj = routesObj[routeKey]
      let component: JSX.Element
      if (obj.layout !== undefined) {
        component = obj.layout
      } else if (obj.element !== undefined) {
        component = obj.element
      } else {
        continue
      }

      const routeObj: RouteObject = {
        path: (prefix !== undefined ? `/${prefix}` : '') + '/' + obj.path,
        element: component
      }
      if (obj.children !== undefined) {
        routeObj.children = buildRoutes(obj.children, obj.path)
      }

      routeObjects.push(routeObj)
    }

    return routeObjects
  }

  return createBrowserRouter(
    getRoutes()
  )
}

export default Router
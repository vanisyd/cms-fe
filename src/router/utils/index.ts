import { lazy } from "react"
import Loadable from "../loadable"

export interface IRouteGroup {
  [key: string]: IRoute
}

interface IRoute {
  path: string
  element?: JSX.Element
  layout?: JSX.Element
  children?: IRouteGroup
}

export const importModule = (
  component: () => Promise<{
    default: React.ComponentType<any>;
  }>
) => {
  return Loadable(lazy(component))({})
}
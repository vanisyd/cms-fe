import http from "../../../http"
import { IUserData } from "../../types/user"
import { IPaginatedResponse } from "../../types/core"
import { IQueryFilter } from "../../types/filter"
import { buildRoute } from "./base"
// TODO: use correct interfaces

const UserService = {
  route: '/user',
  getAll: (callback: CallableFunction, filter?: IQueryFilter) => {
    let routeURI = buildRoute(UserService.route)
    http.get<IPaginatedResponse<IUserData>>(routeURI, { params: filter }).then((response) => {
      callback(response.data)
    })
  },
  create: (payload: IUserData, callback?: CallableFunction) => {
    let routeURI = buildRoute(UserService.route)
    http.post<IUserData>(routeURI, payload).then((response: any) => {
      if (callback !== undefined) {
        callback(response.data)
      }
    })
  },
  update: (payload: IUserData, callback?: CallableFunction) => {
    let routeURI = buildRoute(`${UserService.route}/${payload.id}`)
    http.patch<IUserData>(routeURI, payload).then((response: any) => {
      if (callback !== undefined) {
        callback(response.data)
      }
    })
  },
  delete: (userId: number, callback?: CallableFunction) => {
    let routeURI = buildRoute(`${UserService.route}/${userId}`)
    http.delete(routeURI).then((response: any) => {
      if (callback !== undefined) {
        callback(response.data)
      }
    })
  }
}

export default UserService
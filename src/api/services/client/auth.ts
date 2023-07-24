import http from "../../../http";
import { IAuthData, IUserData } from "../../types/user";
import { IUserResponse } from "../../types/user";
import { buildRoute } from "./base";

const AuthService = {
  route: '/auth',
  auth: (payload: IAuthData, callback?: CallableFunction) => {
    let routeURI = buildRoute(AuthService.route + '/authenticate')
    http.post<IUserResponse>(routeURI, payload).then((response: any) => {
      if (callback !== undefined) {
        callback(response.data)
      }
    })
  },
  register: (payload: IUserData, callback?: CallableFunction) => {
    let routeURI = buildRoute(AuthService.route + '/register')
    http.post<IAuthData>(routeURI, payload).then((response: any) => {
      if (callback !== undefined) {
        callback(response.data)
      }
    })
  }
}

export default AuthService
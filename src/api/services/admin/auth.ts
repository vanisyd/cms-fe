import http from "../../../http";
import { IAuthData, IUserResponse } from "../../types/admin/user";
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
  }
}

export default AuthService
import http from "@/http"
import { buildRoute } from "./base"
import { IAccountResponse } from "@/api/types/user"

const AccountService = {
  route: '/client/account',
  getAccounts: (callback?: CallableFunction) => {
    let routeURI = buildRoute(AccountService.route)
    http.get<IAccountResponse>(routeURI).then((response: any) => {
      if (callback !== undefined) {
        callback(response.data)
      }
    })
  }
}

export default AccountService
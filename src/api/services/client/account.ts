import http from "@/http"
import { buildRoute } from "./base"
import { AccountData, AccountForm, IAccountResponse } from "@/api/types/user"

const AccountService = {
  route: '/client/account',
  getAccounts: (callback?: CallableFunction) => {
    let routeURI = buildRoute(AccountService.route)
    http.get<IAccountResponse>(routeURI).then((response: any) => {
      if (callback !== undefined) {
        callback(response.data)
      }
    })
  },
  create: (payload: AccountForm, callback?: CallableFunction) => {
    let routeURI = buildRoute(AccountService.route)
    http.post<IAccountResponse>(routeURI, payload).then((response: any) => {
      if (callback !== undefined) {
        callback(response.data)
      }
    })
  }
}

export default AccountService
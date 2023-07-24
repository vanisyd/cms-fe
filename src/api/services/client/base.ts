export const BaseService = {
  route: ''
}

export const buildRoute = (routeURI: string) => {
  if (routeURI[0] != '/') {
    routeURI = '/' + routeURI
  }
  return BaseService.route + routeURI
}
export const BaseService = {
  route: '/admin',
}

export const buildRoute = (routeURI: string) => {
  if (routeURI[0] != '/') {
    routeURI = '/' + routeURI
  }
  return BaseService.route + routeURI
}

export function changeRoutesBase(routes, base) {
  // 是否需要把routes深复制一次?
  for (const route of routes) {
    if (route.path && route.path[0] === '/') {
      route.path = base + route.path;
    }
    if (route.redirect) {
      if (typeof route.redirect === 'string' && route.redirect[0] === '/') {
        route.redirect = base + route.redirect;
      } else if (typeof route.redirect === 'function') {
        // redirect like (to: RouteLocation) => RouteLocationRaw
        // HELPME do fix function's return
        const redirectFunc = route.redirect;
        route.redirect = (to) => {
          return redirectFunc(to);
        };
      } else if (route.redirect.path && route.redirect.path[0] === '/') {
        route.redirect.path = base + route.redirect.path;
      }
    }
    if (route.children) {
      changeRoutesBase(route.children, base);
    }
  }
}

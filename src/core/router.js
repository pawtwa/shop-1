let _appMain;

const routes = {};

const currentRoute = {};

const hooks = {
    beforeOnNavigate: [],
    afterOnNavigate: []
};

const beforeOnNavigate = async (newView, newRouteMatched, newPathname) => {
    if (
        typeof currentRoute.view !== 'undefined'
    ) {
        await currentRoute.view.destroy(newView, newRouteMatched, newPathname);
    }
};

const afterOnNavigate = async (view, routeMatched, pathname) => {
    Object.assign(currentRoute, {view, routeMatched, pathname});
};

const setRouteContent = async (newView, routeMatched, pathname) => {
    if (_appMain && typeof _appMain.innerHTML !== 'undefined') {
        if (typeof newView !== 'undefined') {
            const rendered = await newView.render(routeMatched, pathname);
            if (rendered) {
                _appMain.innerHTML = rendered;
            }
            await newView.afterRender();
        } else if (typeof routes['**'] !== 'undefined') {
            routeMatched = '**';
            const rendered = await routes[routeMatched].render(routeMatched, pathname);
            if (rendered) {
                _appMain.innerHTML = rendered;
            }
            await routes['**'].afterRender();
        } else {
            _appMain.innerHTML = 'Not Found.';
        }
    } else {
        console.error('App root container is not set.');
    }
};

const matchRoute = (pathname) => {
    const params = {};
    const pathnameParts = pathname.split('/');
    let routeMatched = null;
    Object.keys(routes).forEach(route => {
        let routeMatch = false;
        const routeParts = route.split('/');
        if (routeParts.length === pathnameParts.length) {
            routeParts.forEach((part, index) => {
                if (part.length > 1 && part[0] === ':') {
                    const partDef = part.substr(1).split('|');
                    if (partDef.length === 2) {
                        switch (partDef[1]) {
                            case 'integer':
                                try {
                                    const value = parseInt(pathnameParts[index], 10);
                                    const value_1 = Math.floor(value);
                                    if (value === value_1 && (String(value) === String(pathnameParts[index]))) {
                                        routeMatch = true;
                                        params[partDef[0]] = value_1;
                                    } else {
                                        routeMatch = false;
                                    }
                                } catch {
                                    routeMatch = false;
                                }
                                break;
                            case 'any':
                                routeMatch = true;
                                params[partDef[0]] = pathnameParts[index];
                                break;
                            default:
                                routeMatch = false;
                                break;
                        }
                    } else {
                        routeMatch = partDef.length === 1;
                        if (routeMatch) {
                            params[partDef[0]] = pathnameParts[index];
                        }
                    }
                } else {
                    routeMatch = part === pathnameParts[index];
                }
                return routeMatch;
            });
        }
        if (routeMatch) {
            routeMatched = route;
        }
        return !routeMatch;
    });
    return {routeMatched, params}
};

let routerIsBusy = false;

const router = {
    addRoutes: (config) => {
        Object.assign(routes, config);
    },
    matchRouteView: (pathname) => {
        let routeMatched = pathname;
        let view = routes[!pathname.length ? '/' : pathname];
        if (typeof view === 'undefined') {
            const matchRouteData = matchRoute(pathname);
            if (matchRouteData.routeMatched) {
                routeMatched = matchRouteData.routeMatched;
                view = routes[routeMatched];
            } else {
                routeMatched = '**';
                view = routes[routeMatched];
            }
            if (view) {
                Object.assign(view.params, matchRouteData.params);
            }
        }
        return {view, routeMatched};
    },
    onNavigate: async (_pathname) => {
        const newPathname = _pathname.length > 1 ? (_pathname[_pathname.length - 1] === '/' ? _pathname.substr(0, _pathname.length - 1) : _pathname) : _pathname;
        const {view: newView, routeMatched: newRouteMatched} = router.matchRouteView(newPathname);
        if (
            routerIsBusy
            || (
                newPathname === window.location.pathname
                && typeof newView !== 'undefined'
                && newView.isRendered
                && newView.isRenderedDeepCheck(newRouteMatched, newPathname)
            )
        ) {
            return;
        }
        routerIsBusy = true;
        await beforeOnNavigate(newView, newRouteMatched, newPathname);
        for (let callback of hooks.beforeOnNavigate) {
            await callback(newView, newRouteMatched, newPathname);
        }
        window.history.pushState(
            {},
            newPathname,
            window.location.origin + newPathname
        );
        await setRouteContent(newView, newRouteMatched, newPathname);
        for (let callback of hooks.afterOnNavigate) {
            await callback(newView, newRouteMatched, newPathname);
        }
        await afterOnNavigate(newView, newRouteMatched, newPathname);
        routerIsBusy = false;
    },
    addRouterHook: async (type, callback) => {
        if (typeof hooks[type] !== 'object') {
            console.error(`Router plugin type '${type}' not exists.`);
            return;
        }
        if (typeof callback !== 'function') {
            console.error(`Router plugin callback for '${type}' is not a function.`, callback);
            return;
        }
        hooks[type].push(callback);
    },
    setAppMain: (appMain) => {
        _appMain = appMain;
    }
};

window['onAppNavigate'] = (element) => {
    router.onNavigate(element.getAttribute('data-href'));
    return false;
};

export default router;

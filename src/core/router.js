import logger from '../logger';

const appMain = document.getElementById('app-main');

const routes = {};

const hooks = {
    beforeOnNavigate: [],
    afterOnNavigate: []
};

const beforeOnNavigate = async () => {
    const pathname = window.location.pathname;
    if (
        typeof routes[pathname] !== 'undefined'
    ) {
        await routes[pathname]._before_destroy(() => {
            logger.addLog(`<strong>${pathname}</strong> before destroying!`);
        });
    }
};

let routerIsBusy = false;

const router = {
    addRoutes: (config) => {
        Object.assign(routes, config);
    },
    onNavigate: async (pathname) => {
        if (
            routerIsBusy
            || (
                pathname === window.location.pathname
                && typeof routes[pathname] !== 'undefined'
                && routes[pathname].isRendered
            )
        ) {
            return;
        }
        routerIsBusy = true;
        await beforeOnNavigate();
        for (let callback of hooks.beforeOnNavigate) {
            await callback(pathname);
        }
        window.history.pushState(
            {},
            pathname,
            window.location.origin + pathname
        );
        if (typeof routes[pathname] !== 'undefined') {
            appMain.innerHTML = await routes[pathname].render();
            await routes[pathname]._after_render(() => {
                logger.addLog(`<strong>${pathname}</strong> after rendering!`);
            });
        } else if (typeof routes['**'] !== 'undefined') {
            appMain.innerHTML = await routes['**'].render();
            await routes['**']._after_render(() => {
                logger.addLog(`<strong>${pathname}</strong> after rendering!`);
            });
        } else {
            appMain.innerHTML = 'Not Found.';
        }
        for (let callback of hooks.afterOnNavigate) {
            await callback(pathname);
        }
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
    }
};

window['onAppNavigate'] = (element) => {
    router.onNavigate(element.getAttribute('data-href'));
    return false;
};

export default router;

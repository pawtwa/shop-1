import logger from '../logger';

const appMain = document.getElementById('app-main');

const routes = {};

const plugins = {
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

const router = {
    addRoutes: (config) => {
        Object.assign(routes, config);
    },
    onNavigate: async (pathname) => {
        plugins.beforeOnNavigate.forEach(callback => callback(pathname));
        if (
            pathname === window.location.pathname
            && typeof routes[pathname] !== 'undefined'
            && routes[pathname].isRendered
        ) {
            return;
        }
        await beforeOnNavigate();
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
        plugins.afterOnNavigate.forEach(callback => callback(pathname));
    },
    addRouterPlugin: async (type, callback) => {
        if (typeof plugins[type] !== 'object') {
            console.error(`Router plugin type '${type}' not exists.`);
            return;
        }
        if (typeof callback !== 'function') {
            console.error(`Router plugin callback for '${type}' is not a function.`, callback);
            return;
        }
        plugins[type].push(callback);
    }
};

window['onAppNavigate'] = (element) => {
    router.onNavigate(element.getAttribute('data-href'));
    return false;
};

export default router;

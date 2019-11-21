import logger from './logger';

const rootApp = document.getElementById('app-root');

const routes = {};

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
        console.log('routes', routes);
    },
    onNavigate: async (pathname) => {
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
            rootApp.innerHTML = await routes[pathname].render();
            await routes[pathname]._after_render(() => {
                logger.addLog(`<strong>${pathname}</strong> after rendering!`);
            });
        } else if (typeof routes['**'] !== 'undefined') {
            rootApp.innerHTML = await routes['**'].render();
            await routes['**']._after_render(() => {
                logger.addLog(`<strong>${pathname}</strong> after rendering!`);
            });
        } else {
            rootApp.innerHTML = 'Not Found.';
        }
    }
};

window['onAppNavigate'] = (pathname) => {
    router.onNavigate(pathname);
    return false;
};

export default router;

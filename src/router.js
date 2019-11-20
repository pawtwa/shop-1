const rootApp = document.getElementById('app-root');

const appLogger = document.getElementById('app-logger');

const routes = {};

const beforeOnNavigate = async () => {
    const pathname = window.location.pathname;
    if (
        typeof routes[pathname] !== 'undefined'
        && typeof routes[pathname].before_destroy === 'function'
    ) {
        await routes[pathname].before_destroy(() => {
            appLogger.innerHTML += `<p>${appLogger.childNodes.length + 1}. <strong>${pathname}</strong> before destroying!</p>`;
        });
    }
};

const router = {
    addRoutes: (config) => {
        Object.assign(routes, config);
        console.log('routes', routes);
    },
    onNavigate: async (pathname) => {
        await beforeOnNavigate();
        window.history.pushState(
            {},
            pathname,
            window.location.origin + pathname
        );
        if (typeof routes[pathname] !== 'undefined') {
            rootApp.innerHTML = await routes[pathname].render();
            if (typeof routes[pathname].after_render === 'function') {
                await routes[pathname].after_render(() => {
                    appLogger.innerHTML += `<p>${appLogger.childNodes.length + 1}. <strong>${pathname}</strong> after rendering!</p>`;
                });
            }
        } else {
            rootApp.innerHTML = 'Page Not Found!';
        }
    }
};

window['onAppNavigate'] = (pathname) => {
    router.onNavigate(pathname);
    return false;
};

export default router;

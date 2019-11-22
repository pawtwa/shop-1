import router from "../core/router";
import loggerApi from "../logger";

const appHeader = document.getElementById('app-header');

const anchors = appHeader.querySelectorAll('a');

const navToggle = appHeader.querySelector('#nav-toggle');

router.addRouterHook('beforeOnNavigate', async (pathname) => {
    const prom = new Promise((resolve) => {
        loggerApi.addLog(`<strong>${pathname}</strong> FETCHING DATA...`);
        setTimeout(() => {
            resolve(pathname);
        },500);
    });
    await prom;
});

router.addRouterHook('afterOnNavigate', (pathname) => {
    anchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('data-href') === pathname) {
            anchor.classList.add('active');
        }
        navToggle.checked = false;
    });
});

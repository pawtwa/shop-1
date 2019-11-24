import router from "../core/router";
import loggerApi from "../services/logger";

const appHeader = document.getElementById('app-header');

const anchors = appHeader.querySelectorAll('a');

const navToggle = appHeader.querySelector('#nav-toggle');

router.addRouterHook('afterOnNavigate', (newView, routeMatched, pathname) => {
    anchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('data-href') === pathname) {
            anchor.classList.add('active');
        }
        navToggle.checked = false;
    });
});

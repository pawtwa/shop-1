import router from "../core/router";

const appHeader = document.getElementById('app-header');

const anchors = appHeader.querySelectorAll('a');

const navToggler = appHeader.querySelector('#nav-toggle');

router.addRouterPlugin('afterOnNavigate', (pathname) => {
    anchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('data-href') === pathname) {
            anchor.classList.add('active');
        }
        navToggler.checked = false;
    });
});

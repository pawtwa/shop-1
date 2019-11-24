import viewFactory from '../../factories/view';
import product from "./product";

const view = require('./home.html');

const home = viewFactory({
    name: 'home',
    path: '/',
    children: {
        [product.path]: product
    },
    view,
    after_render: async function () {
    },
    before_destroy: async function (newView, routeMatched, pathname) {
    }
});

export default home;

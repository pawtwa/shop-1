import viewFactory from '../../factories/view';

const view = require('./about.html');

const about = viewFactory({
    name: 'about',
    path: '/about',
    view,
    after_render: async function () {
    },
    before_destroy: async function (newView, routeMatched, pathname) {
    }
});

export default about;

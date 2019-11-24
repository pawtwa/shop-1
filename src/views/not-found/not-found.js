import viewFactory from '../../factories/view';

const view = require('./not-found.html');

const notFound = viewFactory({
    name: 'not-found',
    path: '**',
    view,
    after_render: async function () {
    },
    before_destroy: async function (newView, routeMatched, pathname) {
    }
});

export default notFound;

import viewFactory from '../factories/view';

const view = require('./not-found.html');

const notFound = viewFactory({
    path: '**',
    view,
    after_render: async function () {
    },
    before_destroy: async function () {
    }
});

export default notFound;

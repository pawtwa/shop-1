import viewFactory from '../../factories/view';

const view = require('./contact.html');

const contact = viewFactory({
    name: 'contact',
    path: '/contact',
    view,
    after_render: async function () {
    },
    before_destroy: async function (newView, routeMatched, pathname) {
    }
});

export default contact;

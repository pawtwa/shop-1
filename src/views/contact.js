import viewFactory from '../factories/view';

const view = require('./contact.html');

const contact = viewFactory({
    path: '/contact',
    view,
    after_render: async function () {
    },
    before_destroy: async function () {
    }
});

export default contact;

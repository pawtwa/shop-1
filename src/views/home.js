import viewFactory from '../factories/view';

const view = require('./home.html');

const home = viewFactory({
    path: '/',
    view,
    after_render: async function () {
    },
    before_destroy: async function () {
    }
});

export default home;

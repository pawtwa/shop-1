import viewFactory from '../factories/view';

const view = require('./about.html');

const about = viewFactory({
    path: '/about',
    view,
    after_render: async function () {
    },
    before_destroy: async function () {
    }
});

export default about;

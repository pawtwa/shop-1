import viewFactory from '../../factories/view';

const view = require('./product.html');

const product = viewFactory({
    name: 'product',
    path: ':productId|integer',
    rootId: 'products',
    isChild: true,
    view,
    after_render: async function () {
    },
    before_destroy: async function (newView, routeMatched, pathname) {
    }
});

export default product;

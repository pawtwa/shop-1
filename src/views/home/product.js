import viewFactory from '../../factories/view';
import {fetchProducts} from "./product-list";

const view = null;
const productView = require('./product.html');

let productsRoot;

const fetchProduct = async (id) => {
    return fetchProducts().then((products) => {
        let product = null;
        if (products && products.length) {
            product = products.find(item => item.id === id);
        }
        return product;
    })
};

const product = viewFactory({
    name: 'product',
    path: ':productId|integer',
    rootId: 'products',
    isChild: true,
    view,
    after_render: async function () {
        productsRoot = document.getElementById(this.rootId);
        if (this.params['productId']) {
            await fetchProduct(this.params['productId']).then(product => {
                productsRoot.innerHTML = '<div class="product"></div>';
                const view = document.createElement('div');
                view.innerHTML = `${productView}`;
                view.querySelector('.img').src = product.image;
                view.querySelector('.title').innerHTML = product.title;
                view.querySelector('.description').innerHTML = product.description;
                view.querySelector('.add-to-cart').setAttribute('data-product', JSON.stringify(product));
                productsRoot.querySelector('.product').append(view);
            });
        } else {
            productsRoot.querySelector('.product').innerHTML = '<h2>Product not exists.</h2>';
        }
    },
    before_destroy: async function (newView, routeMatched, pathname) {
    }
});

export default product;

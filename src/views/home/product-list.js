import viewFactory from '../../factories/view';
import appOverlayVisibility from "../../services/overlay";

const view = null;
const productsListItemView = require('./product-list-item.html');

let productsRoot;

const fetchProducts = async () => {
    appOverlayVisibility(true);
    return new Promise(async (resolve, reject) => {
        await fetch('/assets/stubs/products.json').then((response) => {
            return response.json();
        }).then((products) => {
            setTimeout(() => {
                resolve(products);
                appOverlayVisibility(false);
            }, 500);
        }, () => {
            reject();
        });
    });
};

const productList = viewFactory({
    name: 'productList',
    path: '',
    rootId: 'products',
    isChild: true,
    view,
    after_render: async function () {
        productsRoot = document.getElementById(this.rootId);
        await fetchProducts().then(async (data) => {
            this.data.products = data;
            productsRoot.innerHTML = '<div class="products-list"></div>';
            if (this.data.products && this.data.products.length) {
                this.data.products.forEach(product => {
                    const view = document.createElement('div');
                    view.innerHTML = `${productsListItemView}`;
                    view.querySelector('.img').src = product.image;
                    view.querySelector('.title').innerHTML = product.title;
                    view.querySelector('.description').innerHTML = product.description;
                    view.querySelector('.details').setAttribute('data-href', `/${product.id}`);
                    productsRoot.querySelector('.products-list').append(view);
                })
            }
        });
    },
    before_destroy: async function (newView, routeMatched, pathname) {
    }
});

export default productList;

export {fetchProducts};

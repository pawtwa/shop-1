import viewFactory from '../../factories/view';
import product from "./product";
import productList from "./product-list";

const view = require('./home.html');
const cartItemView = require('./cart-item.html');

let cartItems;

const home = viewFactory({
    name: 'home',
    path: '/',
    children: {
        [productList.path]: productList,
        [product.path]: product
    },
    view,
    after_render: async function () {
        cartItems = document.getElementById('cart').querySelector('.cart-items');
    },
    before_destroy: async function (newView, routeMatched, pathname) {
    }
});

window['addToCart'] = (element) => {
    if (cartItems) {
        const product = JSON.parse(element.getAttribute('data-product'));
        console.log('addToCart', product);
        const uniqueClass = `product-${product.id}`;
        let view = cartItems.querySelector(`.${uniqueClass}`);
        console.log('view', view);
        if (!view) {
            const view = document.createElement('div');
            view.classList.add(uniqueClass);
            view.innerHTML = `${cartItemView}`;
            view.querySelector('.title').innerHTML = product.title;
            const amountElement = view.querySelector('.amount');
            amountElement.innerHTML = 1 + (+amountElement.innerText);
            cartItems.append(view);
        } else {
            const amountElement = view.querySelector('.amount');
            amountElement.innerHTML = 1 + (+amountElement.innerText);
        }
    }
    return false;
};

export default home;

const view = require('./home.html');

const home = {
    path: '/',
    isRendered: false,
    render: async () => {
        return view;
    },
    after_render: async function (callback) {
        this.isRendered = true;
        if (typeof callback === 'function') {
            await callback();
        }
    },
    before_destroy: async function (callback) {
        if (!this.isRendered) {
            return;
        }
        if (typeof callback === 'function') {
            await callback();
        }
        this.isRendered = false;
    }
};

export default home;

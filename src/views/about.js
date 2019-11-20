const view = require('./about.html');

const about = {
    path: '/about',
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

export default about;

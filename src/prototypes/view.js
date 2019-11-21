const view = {
    path: '/',
    isRendered: false,
    view: '--- FILL IT ---',
    render: async function () {
        return `${this.view}`;
    },
    _after_render: async function (callback) {
        this.isRendered = true;
        if (typeof this['after_render'] === 'function') {
            await this['after_render']();
        }
        if (typeof callback === 'function') {
            await callback();
        }
    },
    _before_destroy: async function (callback) {
        if (!this.isRendered) {
            return;
        }
        if (typeof this['before_destroy'] === 'function') {
            await this['before_destroy']();
        }
        this.isRendered = false;
        if (typeof callback === 'function') {
            await callback();
        }
    }
};

export default view;

const view = `
    <section class="section section-about">
        <h1> About </h1>
        <ul></ul>
    </section>
`;

let isRendered = false;

const about = {
    path: '/about',
    render: async () => {
        return view
    },
    after_render: async (callback) => {
        isRendered = true;
        if (typeof callback === 'function') {
            callback();
        }
    },
    before_destroy: async (callback) => {
        if (!isRendered) {
            return;
        }
        if (typeof callback === 'function') {
            callback();
        }
        isRendered = false;
    }
};

export default about;

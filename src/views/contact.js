const view = `
    <section class="section section-contact">
        <h1> Contact </h1>
        <ul></ul>
    </section>
`;

const contact = {
    path: '/contact',
    isRendered: false,
    render: async () => {
        return view
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

export default contact;

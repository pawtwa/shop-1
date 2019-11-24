import logger from "../services/logger";

const view = {
    name: null,
    path: null,
    rootId: null,
    children: {},
    isChild: false,
    isRendered: false,
    params: {},
    view: '--- FILL IT ---',
    renderingParams: {},
    childrenNestedData: [],
    render: async function (routeMatched, pathname, parentPath) {
        this.setRenderingParams(routeMatched, pathname, parentPath);
        let view = null;
        if (!this.isRendered) {
            await logger.addLog(`VIEW <strong>${this.name}</strong> for path <strong>${this.renderingParams.pathname}</strong> as route <strong>${this.renderingParams.routeMatched}</strong> rendering!`);
            view = `${this.view}`;
        }
        await this.renderDeep(routeMatched, pathname, parentPath);
        return view;
    },
    renderDeep: async function (routeMatched, pathname, parentPath) {
        if (this.isChild) {
            return;
        }
        if (this.childrenNestedData && this.childrenNestedData.length) {
            for (let childNestedData of this.childrenNestedData.reverse()) {
                await childNestedData.view.render(routeMatched, pathname, parentPath);
            }
        }
    },
    isRenderedDeepCheck: function (routeMatched, pathname, parentPath) {
        if (this.isChild) {
            return true;
        }
        let isRenderedDeep = true;
        let childrenNestedData;
        if (!routeMatched || !pathname || !parentPath) {
            childrenNestedData = this.childrenNestedData;
        } else {
            childrenNestedData = this.getChildrenNestedData(routeMatched, pathname, parentPath)
        }
        if (childrenNestedData && childrenNestedData.length) {
            for (let childNestedData of childrenNestedData.reverse()) {
                if (!childNestedData.view.isRendered) {
                    isRenderedDeep = false;
                    return false;
                }
            }
        }
        return isRenderedDeep;
    },
    afterRender: async function () {
        await this.afterRenderDeep();
        if (!this.isRendered) {
            this.isRendered = true;
            if (typeof this['after_render'] === 'function') {
                await this['after_render']();
            }
        }
        await logger.addLog(`VIEW <strong>${this.name}</strong> for path <strong>${this.renderingParams.pathname}</strong> as route <strong>${this.renderingParams.routeMatched}</strong> after rendering!`);
    },
    afterRenderDeep: async function () {
        if (this.isChild) {
            return;
        }
        if (this.childrenNestedData && this.childrenNestedData.length) {
            for (let childNestedData of this.childrenNestedData.reverse()) {
                await childNestedData.view.afterRender();
            }
        }
    },
    destroy: async function (newView, newRouteMatched, newPathname) {
        await this.destroyDeep(newView, newRouteMatched, newPathname);
        if (this.isRendered && (this.isChild || !newView || this.name !== newView.name)) {
            if (typeof this['before_destroy'] === 'function') {
                await this['before_destroy'](newView, newRouteMatched, newPathname);
            }
            this.isRendered = false;
        }
        await logger.addLog(`VIEW <strong>${this.name}</strong> for path <strong>${this.renderingParams.pathname}</strong> as route <strong>${this.renderingParams.routeMatched}</strong> before destroying!`);
        this.renderingParams = {};
        this.childrenNestedData = [];
    },
    destroyDeep: async function (newView, newRouteMatched, newPathname) {
        if (this.isChild) {
            return;
        }
        if (this.childrenNestedData && this.childrenNestedData.length) {
            for (let childNestedData of this.childrenNestedData.reverse()) {
                await childNestedData.view.destroy(newView, newRouteMatched, newPathname);
            }
            this.injectParamsIntoChildrenNested(true);
        }
    },
    setRenderingParams: function (routeMatched, pathname, parentPath) {
        this.renderingParams = {...this.renderingParams, routeMatched, pathname, parentPath};
        this.childrenNestedData = this.getChildrenNestedData();
        this.injectParamsIntoChildrenNested();
    },
    injectParamsIntoChildrenNested: function (clear = false) {
        for (let childNestedData of this.childrenNestedData.reverse()) {
            childNestedData.view.params = clear ? {} : this.params;
        }
    },
    getChildrenNestedData: function (routeMatched, pathname, parentPath) {
        const childrenNestedData = [];
        routeMatched = routeMatched ? routeMatched : this.renderingParams.routeMatched;
        pathname = pathname ? pathname : this.renderingParams.pathname;
        parentPath = parentPath ? parentPath : this.renderingParams.parentPath;
        const childrenPaths = Object.keys(this.children);
        if (childrenPaths && childrenPaths.length) {
            parentPath = !parentPath ? this.path : parentPath;
            let childPath = routeMatched.substr(parentPath.length);
            if (childPath[0] === '/') {
                childPath = childPath.substr(1);
            }
            if (typeof this.children[childPath] !== 'undefined') {
                childrenNestedData.push({path: childPath, view: this.children[childPath]});
                const parentPathForChild = `${parentPath}${
                    parentPath[parentPath.length - 1] !== '/' ? '/' : ''
                }${childPath}`;
                const nested = this.children[childPath].getChildrenNestedData(pathname, routeMatched, parentPathForChild);
                if (nested && nested.length) {
                    childrenNestedData.push(...nested);
                }
            }
        }
        return childrenNestedData;
    },
};

export default view;

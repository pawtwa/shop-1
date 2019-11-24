import home from '../views/home/home';
import about from '../views/about/about';
import contact from '../views/contact/contact';
import notFound from '../views/not-found/not-found';

const addRoutes = (parentPath, endView, ...views) => {
    views.forEach(view => {
        let path = `${parentPath ? `${parentPath}${parentPath[parentPath.length - 1] !== '/' ? '/' : ''}${view.path}` : view.path}`;
        routes[path] = endView ? endView: view;
        if (typeof view.children === 'object') {
            addRoutes(path, view, ...Object.values(view.children))
        }
    });
};

const routes = {};

addRoutes(null, null, home, about, contact, notFound);

export default routes;

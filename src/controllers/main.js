import Router from '../core/router';
import routes from './../config/routes';
Router.addRoutes(routes);
Router.onNavigate(window.location.pathname);

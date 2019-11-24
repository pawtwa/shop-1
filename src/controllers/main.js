import Router from '../core/router';
import routes from './../config/routes';

Router.addRoutes(routes);
Router.setAppMain(document.getElementById('app-main'));
Router.onNavigate(window.location.pathname);

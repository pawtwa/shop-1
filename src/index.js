import "./assets/styles/main.scss";
import Router from './router';
import routes from './config/routes';
Router.addRoutes(routes);
Router.onNavigate(window.location.pathname);

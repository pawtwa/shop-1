import home from './../views/home';
import about from './../views/about';
import contact from './../views/contact';

const routes = {
    [home.path]: home,
    [about.path]: about,
    [contact.path]: contact,
};

export default routes;

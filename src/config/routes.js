import home from './../views/home';
import about from './../views/about';
import contact from './../views/contact';
import notFound from './../views/not-found';

const routes = {
    [home.path]: home,
    [about.path]: about,
    [contact.path]: contact,
    [notFound.path]: notFound
};

export default routes;

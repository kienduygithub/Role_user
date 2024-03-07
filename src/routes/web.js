import express from 'express';
import HomeController from '../controllers/HomeController';
const Router = express.Router();

const initWebRoutes = (app) => {
    Router.get('/user', HomeController.getUserPage);
    Router.post('/user/create-user', HomeController.postCreateUser);
    Router.post('/user/delete-user', HomeController.postDeleteUser);
    Router.get('/user/edit-user/:id', HomeController.getEditPage);
    Router.post('/user/update-user', HomeController.postUpdateUser);
    return app.use('/', Router);
}

export default initWebRoutes;

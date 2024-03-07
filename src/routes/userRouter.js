import express from 'express';
import {
    postLoginUser, postRegister, handleLogout,
    readAllUsers, createUser, updateUser,
    deleteUser, getUserAcountAfterReload
} from '../controllers/UserController';
import {
    checkUserJWT, checkUserPermission
} from '../middleware/jwtActions';
const Router = express.Router();


Router.all('*', checkUserJWT, checkUserPermission)

Router.post('/login', postLoginUser);
Router.post('/register', postRegister);
Router.get('/logout', handleLogout);
Router.get('/account', getUserAcountAfterReload);

Router.get('/user/read', checkUserJWT, checkUserPermission, readAllUsers);
Router.post('/user/create', createUser);
Router.put('/user/update', updateUser);
Router.delete('/user/delete', deleteUser)
module.exports = Router;
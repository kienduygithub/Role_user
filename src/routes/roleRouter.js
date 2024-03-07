import express from 'express';
import RoleController from '../controllers/RoleController';
import {checkUserJWT, checkUserPermission} from '../middleware/jwtActions';
const Router = express.Router();

Router.all("*", checkUserJWT, checkUserPermission);

Router.get('/role/read', RoleController.getAllRoles);
Router.post('/role/create', RoleController.createRole);
Router.put('/role/update', RoleController.updateRole);
Router.delete('/role/delete', RoleController.deleleRole);
Router.get('/role/by-group', RoleController.getRoleByGroup);
Router.post('/role/assign-to-group', RoleController.assignRoleToGroup)
module.exports = Router;
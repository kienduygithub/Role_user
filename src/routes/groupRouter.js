import express from "express";
import GroupController from '../controllers/GroupController';
const Router = express.Router();
import {
    checkUserJWT, checkUserPermission
} from '../middleware/jwtActions'
Router.all('*', checkUserJWT, checkUserPermission)

Router.get('/group/read', GroupController.readAllGroups)

module.exports = Router;
import RoleService from '../services/RoleService';

const getAllRoles = async (req, res) => {
    try {
        let {limit, page} = req.query;
        if (!limit && !page) {
            const response = await RoleService.getAllRoles();
            return res.status(200).json(response);
        } else {
            const response = await RoleService.getAllRolesPanigate(+req.query.page, +req.query.limit);
            return res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server...',
            EC: -1,
            DT: ''
        })
    }
};
const createRole = async (req, res) => {
    try {
        const response = await RoleService.createRoles(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server...',
            EC: -1,
            DT: ''
        })
    }
};
const updateRole = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server...',
            EC: -1,
            DT: ''
        })
    }
};

const deleleRole = async (req, res) => {
    try {
        const response = await RoleService.deleleRole(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server...',
            EC: -1,
            DT: ''
        })
    }
};

const getRoleByGroup = async (req, res) => {
    try {
        let groupId = req.query.id;
        const response = await RoleService.getRoleByGroup(groupId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server...',
            EC: -1,
            DT: ''
        })
    }
}
// ASSIGN ROLES TO GROUP
const assignRoleToGroup = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const response = await RoleService.assignRoleToGroup(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server...',
            EC: -1,
            DT: ''
        })
    }
};
module.exports = {
    getAllRoles,
    createRole,
    updateRole,
    deleleRole,
    getRoleByGroup,
    assignRoleToGroup
}
import db from "../models";
import _, {bind} from 'lodash';
const getAllRoles = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await db.Role.findAll({
                raw: true
            });
            if (roles.length === 0) {
                resolve({
                    EM: 'Nothing!',
                    EC: 1,
                    DT: []
                })
            } else {
                resolve({
                    EM: 'All roles',
                    EC: 0,
                    DT: roles
                })
            }
        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrong with service...',
                EC: -1,
                DT: ''
            })
        }
    })
};
const getAllRolesPanigate = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await db.Role.findAndCountAll({
                limit: +limit,
                offset: (+page) * limit,
                order: [['id', 'DESC']],
                attributes: ['id', 'url', 'description']
            });
            resolve({
                EM: 'Get roles panigate!',
                EC: 0,
                DT: {
                    totalPage: Math.ceil(roles.count / limit),
                    roles: roles.rows
                }
            })
        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrong with service...',
                EC: -1,
                DT: ''
            })
        }
    })
}

const createRoles = async (roles) => {
    return new Promise(async (resolve, reject) => {
        try {
            let currentRoles = await db.Role.findAll({
                attributes: ['url', 'description'],
                raw: true
            })
            const persists = roles.filter(({url: url_1}) => !currentRoles.some(({url: url_2}) => url_1 === url_2));

            if (persists.length === 0) {
                resolve({
                    EM: 'Nothing to create...',
                    EC: 1,
                    DT: []
                })
            } else {
                await db.Role.bulkCreate(persists)
                resolve({
                    EM: `Create roles succeeds: ${persists.length} roles...`,
                    EC: 0,
                    DT: persists
                })
            }
        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrong with service...',
                EC: -1,
                DT: ''
            })
        }
    })
};
const updateRole = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {

        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrong with service...',
                EC: -1,
                DT: ''
            })
        }
    })
};

const deleleRole = async (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await db.Role.destroy({
                where: {id: roleId}
            });
            resolve({
                EM: 'Delete role succeeds!',
                EC: 0,
                DT: role
            })
        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrong with service...',
                EC: -1,
                DT: ''
            })
        }
    })
};

const getRoleByGroup = (groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!groupId) {
                resolve({
                    EM: 'Not found any roles',
                    EC: 1,
                    DT: []
                })
            } else {
                let roles = await db.Group.findOne({
                    where: {id: groupId},
                    attributes: ['id', 'name', 'description'],
                    include: [{
                        model: db.Role, attributes: ['id', 'url', 'description'],
                        through: {attributes: []}
                    }],
                    nest: true
                })
                resolve({
                    EM: 'Get all roles succeeds!',
                    EC: 0,
                    DT: roles
                })
            }
        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrong with service...',
                EC: -1,
                DT: ''
            })
        }
    })
}
// ASSIGN ROLES TO GROUP
const assignRoleToGroup = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Group_Role.destroy({
                where: {groupId: +data.groupId}
            })
            let buildData = [];
            data.groupRoles && data.groupRoles.length > 0 &&
                data.groupRoles.map((role) => {
                    let object = {};
                    object.groupId = data.groupId;
                    object.roleId = +role.id;
                    buildData.push(object);
                })
            console.log(buildData);
            await db.Group_Role.bulkCreate(buildData);
            resolve({
                EM: 'Assign roles succeed!',
                EC: 0,
                DT: []
            })
        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrong with service...',
                EC: -1,
                DT: ''
            })
        }
    })
}
module.exports = {
    getAllRoles,
    createRoles,
    updateRole,
    deleleRole,
    getRoleByGroup,
    assignRoleToGroup,
    getAllRolesPanigate
}

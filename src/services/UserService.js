import { Op } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwtActions from '../middleware/jwtActions';
import jwtService from '../services/JWTService';
const salt = bcrypt.genSaltSync(10);

// LOGIN
const postLoginUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { valueLogin, password } = data;
            const user = await db.User.findOne({
                where: {
                    [ Op.or ]: [
                        { email: valueLogin },
                        { phone: valueLogin }
                    ]
                },
                raw: true
            })
            if (!user) {
                resolve({
                    EM: 'Wrong email or phone number!',
                    EC: 1,
                    DT: ''
                })
            } else {
                const isCorrect = bcrypt.compareSync(password, user.password);
                if (!isCorrect) {
                    resolve({
                        EM: 'Wrong email/phone or password!',
                        EC: 1,
                        DT: '2'
                    })
                } else {
                    delete user.password;
                    delete user.createdAt;
                    delete user.updatedAt;
                    let groupWithRoles = await jwtService.getGroupWithRole(user);
                    let payload = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        groupWithRoles: groupWithRoles
                    }
                    const access_token = jwtActions.createAccessToken(payload);
                    resolve({
                        EM: 'Login successfully!',
                        EC: 0,
                        DT: {
                            token: access_token,
                            groupWithRoles,
                            email: user.email,
                            username: user.username
                        }
                    })
                }
            }
        } catch (error) {
            reject({
                EM: 'Something wrongs in service...',
                EC: -2,
                DT: ''
            });
        }
    })
}
// REGISTER
const postRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, username, password, phone } = data;
            const user = await db.User.findOne({
                where: {
                    [ Op.or ]: [
                        { email: email },
                        { phone: phone }
                    ]
                }
            })
            if (user && user.email) {
                resolve({
                    EM: 'Email is already exist',
                    EC: 1,
                    DT: ''
                })
            } else if (user && user.phone) {
                resolve({
                    EM: 'Phone is already exist',
                    EC: 1,
                    DT: ''
                })
            } else {
                const hashedPassword = await handleHash(password);
                await db.User.create({
                    email: email,
                    phone: phone,
                    username: username,
                    password: hashedPassword,
                    groupId: 4
                })
                resolve({
                    EM: 'The user has been created successfully!',
                    EC: 0,
                    DT: ''
                })
            }
        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrong in service!',
                EC: -2,
                DT: ''
            });
        }
    })
}
const handleHash = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashed = await bcrypt.hashSync(password, salt);
            resolve(hashed);
        } catch (error) {
            reject(error);
        }
    })
}
// READ - CREATE - UPDATE - DELETE
const readAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                attributes: {
                    exclude: [ 'password', 'createdAt', 'updatedAt' ]
                },
                include: [
                    { model: db.Group, attributes: [ 'name', 'description' ] }
                ],
                nest: true
            })
            if (users) {
                resolve({
                    EM: 'Get all users',
                    EC: 0,
                    DT: users
                })
            } else {
                resolve({
                    EM: 'Get all users',
                    EC: 0,
                    DT: []
                })
            }
        } catch (error) {
            console.log(error);
            reject({
                EM: 'Something wrongs with service...',
                EC: -2,
                DT: ''
            })
        }
    })
}
const getUserPanigate = async (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAndCountAll({
                offset: (page - 1) * limit,
                limit: limit,
                attributes: {
                    exclude: [ 'password', 'createdAt', 'updatedAt' ]
                },
                include: {
                    model: db.Group, attributes: [ 'name', 'description' ]
                },
                nest: true
            })
            resolve({
                EM: 'Get users panigate!',
                EC: 0,
                DT: {
                    totalRecords: users.count,
                    totalPages: Math.ceil(users.count / limit),
                    users: users.rows
                }
            })
        } catch (error) {
            reject({
                EM: 'Something wrongs with service...',
                EC: -2,
                DT: ''
            })
        }
    })
}
const createUser = async (rawData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existedUser = await db.User.findOne({
                where: {
                    [ Op.or ]: [
                        { email: rawData.email },
                        { phone: rawData.phone }
                    ]
                }
            })
            if (existedUser) {
                resolve({
                    EM: 'Email/Phone already exist!',
                    EC: 1,
                    DT: 'email'
                })
            } else {
                const hashedPassword = await handleHash(rawData.password);
                await db.User.create({
                    email: rawData.email,
                    phone: rawData.phone,
                    username: rawData.username.length > 0 ? rawData.username : '',
                    password: hashedPassword,
                    address: rawData.address.length > 0 ? rawData.address : '',
                    sex: rawData.sex,
                    groupId: +rawData.groupId
                })
                resolve({
                    EM: 'User has been created successfully!',
                    EC: 0,
                    DT: ''
                })
            }
        } catch (error) {
            reject({
                EM: 'Error from service...',
                EC: -2,
                DT: ''
            })
        }
    })
}
const updateUser = async (rawData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: rawData.id }
            })
            if (user) {
                if (!rawData.groupId) {
                    resolve({
                        EM: 'Error with empty groupId!',
                        EC: 1,
                        DT: 'group'
                    })
                } else {
                    user.username = rawData.username;
                    user.address = rawData.address;
                    user.sex = rawData.sex;
                    user.groupId = +rawData.groupId;
                    await user.save();
                    resolve({
                        EM: 'Update user successfully!',
                        EC: 0,
                        DT: ''
                    })
                }
            } else {
                resolve({
                    EM: 'Not found user!',
                    EC: 2,
                    DT: ''
                })
            }
        } catch (error) {
            reject({
                EM: 'Error from service...',
                EC: -2,
                DT: ''
            })
        }
    })
}
const deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    EM: 'User not found',
                    EC: 1,
                    DT: ''
                })
            } else {
                await user.destroy();
                resolve({
                    EM: 'The user has been deleted!',
                    EC: 0,
                    DT: ''
                })
            }
        } catch (error) {
            reject({
                EM: 'Error from service...',
                EC: -2,
                DT: ''
            })
        }
    })
}

module.exports = {
    postLoginUser: postLoginUser,
    postRegister: postRegister,
    readAllUsers: readAllUsers,
    getUserPanigate: getUserPanigate,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}
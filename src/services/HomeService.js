import db from '../models';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}
const getUserList = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    hashPassword: hashPassword,
    getUserList: getUserList
}
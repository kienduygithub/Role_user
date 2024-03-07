import db from "../models";
import HomeService from '../services/HomeService';

const postCreateUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const createdUser = await db.User.create({
            email: email,
            password: HomeService.hashPassword(password),
            username: username
        })
        if (createdUser) {
            return res.redirect('/user');
        }
    } catch (error) {
        console.log(error);
    }
}
// GET USER LIST
const getUserList = async () => {
    try {
        // const newUser = await db.User.findOne({
        //     where: { id: 1 },
        //     attributes: {
        //         exclude: [ 'password', 'createdAt', 'updatedAt' ]
        //     },
        //     raw: true,
        //     nest: true,
        //     include: {
        //         model: db.Group,
        //         attributes: {
        //             exclude: [ 'createdAt', 'updatedAt' ]
        //         }
        //     }

        // })
        // console.log('>>> Check user: ', newUser);
        // const roles = await db.Role.findAll({
        //     attributes: [ 'url', 'description' ],
        //     include: { model: db.Group, where: { id: 1 }, attributes: [ 'name', 'description' ] },
        //     nest: true,
        //     raw: true
        // })
        // console.log('>>> Check role: ', roles);
        let response = [];
        response = await HomeService.getUserList();
        return response;
    } catch (error) {
        console.log(error);
    }
}
const getUserPage = async (req, res) => {
    const users = await getUserList();
    return res.render('user', { users: users });
}

const postDeleteUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        await db.User.destroy({
            where: { id: userId }
        })
        return res.redirect('/user');
    } catch (error) {
        console.log(error);
    }
}

const getEditPage = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await db.User.findOne({
            where: { id: userId },
            raw: true
        })
        return res.render('user-update', { user: user });
    } catch (error) {
        console.log(error);
    }
}

const postUpdateUser = async (req, res) => {
    try {
        const { email, username, userId } = req.body;
        const user = await db.User.findOne({
            where: { id: userId }
        })
        user.email = email;
        user.username = username;
        await user.save();
        return res.redirect('/user');
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getUserPage: getUserPage,
    postCreateUser: postCreateUser,
    getUserList: getUserList,
    postDeleteUser: postDeleteUser,
    getEditPage: getEditPage,
    postUpdateUser: postUpdateUser
}
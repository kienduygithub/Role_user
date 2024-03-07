import jwt from 'jsonwebtoken';
require('dotenv').config();
const createAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, {expiresIn: process.env.EXPIRES_ACCESS});
    return access_token;
}

const createRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, {expiresIn: process.env.EXPIRES_REFRESH});
    return refresh_token;
}

const verifyToken = (token) => {
    let keyToken = process.env.ACCESS_TOKEN;
    let decoded = null;
    try {
        decoded = jwt.verify(token, keyToken);
    } catch (error) {
        console.log(error);
    }
    return decoded;
}

const nonSecurePaths = ['/login', '/register', '/logout', '/role/create', '/role/read', '/role/update', '/role/delete', '/role/by-group', '/role/assign-to-group', '/group/read'];

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === 'Bearer') {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    let tokenFromHeaders = extractToken(req);
    if (tokenFromHeaders || cookies && cookies.token) {
        let token = tokenFromHeaders ? tokenFromHeaders : cookies.token;
        let decoded = verifyToken(token);
        if (decoded) {
            let user = decoded;
            req.user = user;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EM: 'Not authenticated the user!',
                EC: -1,
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EM: 'Not authenticated the user!',
            EC: -1,
            DT: ''
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            // Người dùng chưa được phân quyền nên 403
            return res.status(403).json({
                EM: `You don't have permission to access this resource`,
                EC: -1,
                DT: req.path
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EM: `You don't have permission to access this resource`,
                EC: -1,
                DT: req.path
            })
        }


    } else {
        return res.status(401).json({
            EM: 'Not authenticated the user!',
            EC: -1,
            DT: ''
        })
    }
}
module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyToken,
    checkUserJWT,
    checkUserPermission
}
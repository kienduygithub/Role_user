import customAxios from "../customize/axios";

export const createNewRoles = async (roles) => {
    try {
        const response = await customAxios.post('/role/create', roles);
        return response;
    } catch(error) {
        console.log(error);
    }
}

export const getAllRoles = async (limit, page) => {
    try {
        // console.log(limit, page);
        if(!limit && !page) {
            const response = await customAxios.get('/role/read');
            return response;
        } else {
            const response = await customAxios.get(`/role/read?page=${0}&limit=${3}`);
            return response;
        }
    } catch(error) {
        console.log(error);
    }
}

export const deleteRole = async (roleId) => {
    try {
        const response = await customAxios.delete(`/role/delete?id=${roleId}`);
        return response;
    } catch(error) {
        console.log(error);
    }
}

export const getRolesByGroupId = async (groupId) => {
    try {
        const response = await customAxios.get(`/role/by-group?id=${groupId}`);
        return response;
    } catch(error) {
        console.log(error);
    }
}

export const assignRoleToGroup = async (groupId, groupRoles) => {
    try {
        const response = await customAxios.post('/role/assign-to-group', {
            groupId: groupId,
            groupRoles: groupRoles
        })
        return response;
    } catch(error) {
        console.log(error);
    }
}
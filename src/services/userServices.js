import customAxios from '../customize/axios';

export const getAllUsers = async (page, limit) => {
    try {
        const response = await customAxios.get(`/user/read?page=${ page }&limit=${ limit }`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await customAxios.delete(`/user/delete?id=${ userId }`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const createUser = async (data) => {
    try {
        const response = await customAxios.post('/user/create', data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (data) => {
    try {
        const response = await customAxios.put('/user/update', data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getUserAccount = async () => {
    try {
        const response = await customAxios.get('/account');
        return response;
    } catch (error) {
        console.log(error);
    }
}
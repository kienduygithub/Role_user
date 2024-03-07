import axios from "axios";

export const handleLogin = async (data) => {
    try {
        const response = await axios.post(`${ process.env.REACT_APP_SERVER_URL }/login`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const handleRegister = async (data) => {
    try {
        const response = await axios.post(`${ process.env.REACT_APP_SERVER_URL }/register`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const handleLogout = async () => {
    try {
        const response = await axios.get(`${ process.env.REACT_APP_SERVER_URL }/logout`, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
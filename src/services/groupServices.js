import customAxios from "../customize/axios";

export const getAllGroups = async () => {
    try {
        const response = await customAxios.get('/group/read');
        return response;
    } catch (error) {
        console.log(error);
    }
}
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://identificationec.pockethost.io/api/collections/users', // Base URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loginUser = async (LoginUser) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiClient.post('/auth-with-password', LoginUser);
        return response.data; // Devuelve solo los datos
    } catch (error) {
        throw error;
    }
};

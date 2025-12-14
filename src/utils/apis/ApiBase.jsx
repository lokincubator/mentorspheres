import axios from 'axios';
import ENVIRONMENT from '../config';
import {logout, getToken, getTokenType} from "../auth";

export const API_URL = ENVIRONMENT.ENV_IP;

const handleErrors = async (err) => {
    if (err?.response?.status === 401) {
        logout();
        return Promise.reject(err);
    }

    if (err?.response?.status === 403) {
      return Promise.reject(err);
    }
    return Promise.reject(err);
};

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `${API_URL}`,
    timeout: 600000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        const tokenType = getTokenType();
        if (token) {
            config.headers.Authorization = `${tokenType} ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    (response) =>
        response,
        handleErrors
);

export default axiosInstance;




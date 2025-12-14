import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import ENVIRONMENT from '../config';
import { logout, getToken, getTokenType } from '../auth';

export const API_URL: string = ENVIRONMENT.ENV_IP;

const handleErrors = async (err: AxiosError): Promise<never> => {
    if (err?.response?.status === 401) {
        logout();
        return Promise.reject(err);
    }

    if (err?.response?.status === 403) {
        return Promise.reject(err);
    }

    return Promise.reject(err);
};

const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    timeout: 600000,
});

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        const token = getToken();
        const tokenType = getTokenType();

        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `${tokenType} ${token}`,
            };
        }

        return config;
    },
    (err: AxiosError) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    handleErrors
);

export default axiosInstance;

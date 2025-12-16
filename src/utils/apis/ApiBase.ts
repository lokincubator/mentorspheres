import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import ENVIRONMENT from '../config';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export const API_URL: string = ENVIRONMENT.ENV_IP;

const handleErrors = async (err: AxiosError): Promise<never> => {
    if (err?.response?.status === 401) {
        // If unauthorized, sign out locally to clear state
        try { await signOut(auth); } catch { /* noop */ }
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
    async (config: any): Promise<any> => {
        const user = auth.currentUser;
        if (user) {
            try {
                const token = await user.getIdToken();
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            } catch {
                // ignore token retrieval failures; request will proceed without auth header
            }
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

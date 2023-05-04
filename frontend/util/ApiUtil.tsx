import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: '/backend',
    withCredentials: true
})
import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: 'https://tjq8s66rpn.us-east-1.awsapprunner.com',
    withCredentials: true
})
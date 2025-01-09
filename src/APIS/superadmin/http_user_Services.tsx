import { VerticalAlignBottom } from '@mui/icons-material';
import axiosInstance from '../axios_instance_services';

const baseUrl = "http://localhost:1717/api";

const get = (url: string) => axiosInstance.get(`${baseUrl}${url}`);
const post = (url: string, data: any) => axiosInstance.post(`${baseUrl}${url}`, data);
const put = (url: string, data: any) => axiosInstance.put(`${baseUrl}${url}`, data);
const del = (url: string) => axiosInstance.delete(`${baseUrl}${url}`);

const HttpService = {
    get,
    del,
    post,
    put
};

export default HttpService;




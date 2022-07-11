import axios from "axios";


const token = localStorage.getItem('token');


const authAxios = axios.create({
    // baseURL: "http://127.0.0.1:8000",
    headers: {
        Authorization: `JWT ${token}`
    }
})


export default {
    get: axios.get,
    post: authAxios.post,
    put: authAxios.put,
    delete: authAxios.delete

}
import http from "./httpService";
import endPoint from './endPoint.json';
import axios from "axios";

const api = endPoint.apiUrl + "/users";

const jwt = localStorage.getItem('token');
const authAxios = axios.create({
    headers: {
        Authorization: `JWT ${jwt}`
    }
})

export function getUsers() {
    return http.get(api);
}
export function updateUser(data) {
    return http.put(api, data);
}

export function makeStaff(id, data) {
    const url = endPoint.apiUrl + `/users/${id}/`;
    return http.put(url, data);
}

export function getCustomUser(id) {
    return authAxios.get(api + `/${id}/`);
}
export function deleteUser(id) {
    const url = endPoint.apiUrl + `/users/${id}/`;
    return http.delete(url);
}

export function getLoggedUser() {
    const url = `${endPoint.apiUrl}/auth/users/me/`;
    return authAxios.get(url);

}
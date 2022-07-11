import jwtDecode from "jwt-decode";
import http from "./httpService";
import endPoint from "./endPoint.json";
import axios from "axios";

const api = endPoint.apiUrl + "/auth/jwt/";
const tokenKey = 'token'


export async function login(data) {
    const url = api + "create/";
    const { data: jwt } = await http.post(url, data);
    localStorage.setItem(tokenKey, jwt.access);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt.access);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export async function signup(data) {
    const url = `${endPoint.apiUrl}/auth/users/`;
    console.log(data);
    const { data: response } = await axios.post(url, data);
    if (response) {
        const details = {
            username: data.username,
            password: data.password
        }
        try {
            login(details)
            // window.location = '/';
        }
        catch (ex) {
            console.log(ex);
        }
    }

}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt,
    signup
}

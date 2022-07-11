import http from "./httpService";

const apiEndPoint = 'http://127.0.0.1:8000/students/'

export function getStudentList() {
    return http.get(apiEndPoint);
}

export function saveStudent(data) {
    return http.post(apiEndPoint, data);
}
export function getStudentDetail(id) {
    return http.get(apiEndPoint + id);
}
export function updateStudent(id, data) {
    const url = `${apiEndPoint}${id}/`;
    return http.put(url, data);
}
export function deleteStudent(id) {
    const url = `${apiEndPoint}${id}/`;
    return http.delete(url);
}

export default {
    getStudentList,
    saveStudent
}
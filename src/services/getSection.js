import http from "./httpService";
import endPoint from "./endPoint.json";
const newEndPoint = endPoint.apiUrl + "/sections/"

function movieUrl(id) {
    return `${newEndPoint}/${id}`;
}

export default function getSectionList() {
    return http.get(newEndPoint)
}

export function getSection(id) {
    return http.get(movieUrl(id));
}
export function getSectionWithGrade(id) {
    const url = `${endPoint.apiUrl}/grades/${id}/sections`;
    return http.get(url);
}
export function saveSection(name, grade) {
    const data = {
        name: name,
        grade: grade
    }
    return http.post(newEndPoint, data);
}
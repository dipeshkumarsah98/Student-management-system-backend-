import http from "./httpService";
import endPoint from "./endPoint.json";

const newEndPoint = endPoint.apiUrl + "/grades/"

export function gradeUrl(id) {
    return `${newEndPoint}/${id}`;
}

export default function getGradeList() {
    return http.get(newEndPoint)
}

export function newGrade(info) {
    const data = { name: info };
    return http.post(
        newEndPoint,
        data
    )


}
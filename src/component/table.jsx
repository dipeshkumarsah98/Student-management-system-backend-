import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteStudent, getStudentList } from '../services/getStudentList';


export const Table = () => {
    const [students, setStudents] = useState([])
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const { data } = await getStudentList();
            setStudents(data);
        }
        fetchData();
    }, [deleted])

    const handelDelete = async (id) => {
        try {
            await deleteStudent(id);
            deleted ? setDeleted(false) : setDeleted(true);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col">S.N</th>
                        <th className="col">Name</th>
                        <th className="col">Grade</th>
                        <th className="col">Section</th>
                        <th className="col"></th>
                        <th className="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index) => (
                            <tr key={index}>
                                <th scope="row">{student.id}</th>
                                <td>{student.name}</td>
                                <td>{student.Grade.name}</td>
                                <td>{student.Section === null ? 'none' : student.Section.name}</td>
                                <td><Link className="btn btn-primary" to={`${student.id}/update`}>Update</Link></td>
                                <td><button onClick={() => handelDelete(student.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

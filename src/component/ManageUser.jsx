import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers, makeStaff } from '../services/user';
import { Link, useNavigate } from 'react-router-dom';
export const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [doChange, setDoChange] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getUsers();
            setUsers(data);
        }
        fetchData();
    }, [doChange])

    const handelUpdate = async (userId) => {
        const custom = users.filter((u) => (u.id === userId));
        console.log(custom[0].username);
        const details = {
            username: custom[0].username,
            first_name: custom[0].first_name,
            last_name: custom[0].last_name,
            is_staff: custom[0].is_staff ? false : true,
        }
        try {

            await makeStaff(userId, details);
            doChange ? setDoChange(false) : setDoChange(true);
        } catch (ex) {
            console.log(ex);
        }
    }
    const handelDelete = async (userId) => {
        try {
            const { data } = await deleteUser(userId);
            console.log(data);
            doChange ? setDoChange(false) : setDoChange(true);

        } catch (ex) {
            console.log(ex);
        }
    }
    return (
        <div className='container'>
            {/* search box will be here */}

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Staff</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.username}</td>
                                <td>{user.first_name === '' ? '-' : user.first_name}</td>
                                <td>{user.last_name === '' ? '-' : user.last_name}</td>
                                <td>{user.is_staff ? 'Yes' : 'No'}</td>
                                <td><button onClick={() => handelUpdate(user.id)} className='btn btn-primary'>{user.is_staff ? 'remove from staff' : 'make staff'}</button></td>
                                <td><button onClick={() => handelDelete(user.id)} className='btn btn-danger'>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

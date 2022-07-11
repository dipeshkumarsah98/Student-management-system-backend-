import React, { useContext, useState, useEffect } from 'react';
import './css/home.css';
import { Link } from 'react-router-dom';
import UserContext from '../context/Context';
import { getLoggedUser } from '../services/user';
import { getCurrentUser } from '../services/authenticate';


export const Home = () => {
    const [user, setUser] = useState([]);
    const context = useContext(UserContext);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getLoggedUser();
            setUser(data);
        }
        if (!getCurrentUser()) {
            setUser({
                is_staff: null
            });
            return;
        }

        fetchData();
    }, [])

    return (
        <div className="home">
            <h2 className="display-2">Welcome to student management system</h2>
            <h5 className="display-5">Here are the list of task you can perform</h5>
            <div className="container">
                <div className="row m-3">

                    <div className="col-5">

                        <div className="list-group list-group-flush">
                            <Link to="student" className="list-group-item list-group-item-action p-3" aria-current="true">
                                Student List
                            </Link>
                            {
                                user.is_staff &&
                                <div>
                                    <Link to="new/student" className="list-group-item list-group-item-action p-3">Add New Student</Link>
                                    <Link to="new/grade" className="list-group-item list-group-item-action p-3">Add New Grade</Link>
                                    <Link to="new/section" className="list-group-item list-group-item-action p-3">Add New Section</Link>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">{context.info.title}</h4>
                            <p>{context.info.discription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

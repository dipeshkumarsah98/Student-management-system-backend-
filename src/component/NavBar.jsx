import React, { useEffect, useState } from 'react';
import './css/navbar.css';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../services/authenticate';
import { getLoggedUser } from '../services/user';



export const NavBar = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getLoggedUser();
            setUser(data);
        }
        if (!getCurrentUser()) {
            setUser(null);
            return;
        }

        fetchData();
    }, [])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" >
                <div className="container">
                    <NavLink className="navbar-brand" to="/">Digital Guide Nepal </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav">
                            <NavLink className="nav-item nav-link" to="/home">Home</NavLink>
                            {user && user.is_superuser && <NavLink className="nav-item nav-link" to="user">Manage User</NavLink>}

                            {
                                !getCurrentUser() &&
                                <NavLink className="nav-item nav-link" to="/login">login</NavLink>
                            }
                            {
                                !getCurrentUser() &&
                                <NavLink className="nav-item nav-link" to="/signup">sign up</NavLink>
                            }
                            {
                                getCurrentUser() &&
                                <NavLink className="nav-item nav-link" to="/logout">logout</NavLink>

                            }
                            {
                                user &&
                                <NavLink className="nav-item nav-link username" to="/me">{user.username}</NavLink>
                            }
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

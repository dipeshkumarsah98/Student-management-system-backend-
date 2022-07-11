import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import UserContext from '../context/Context';
import { Input } from './Input'
import { getCurrentUser, login } from '../services/authenticate';


export const Login = () => {
    const [errors, setErrors] = useState("");
    const context = useContext(UserContext);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (checkError(username, password)) {
            return
        }
        const detials = {
            username: username,
            password: password
        }
        try {

            await login(detials);
            window.location = '/';
            context.changeInfo({
                title: 'welcome',
                discription: `welcome back ${username}`
            });


        } catch (ex) {
            if (ex.response && ex.response.status === 401) {
                setErrors(ex.response.data.detail);
            }
        }
    }
    function checkError(username, password) {
        if (username === "" || password === "") {
            setErrors("username and password is required");
            return true
        }
        setErrors('');
        return;
    }
    if (getCurrentUser()) {
        return <Navigate to='/home' replace={true} />
    }

    return (

        <div className="container">
            <h3>{getCurrentUser()}</h3>
            <h3 className="display-3">Login here</h3>
            <form onSubmit={handelSubmit}>
                {errors && <div className="alert alert-danger disabled" role="alert">
                    {errors}
                </div>}
                <Input
                    label={'Username'}
                    name={'username'}
                />
                <Input
                    label={'password'}
                    name={'password'}
                    type={'password'}
                />
                <div className="row">
                    <div className="col-1">
                        <button className="btn btn-secondary btn-lg">Login</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

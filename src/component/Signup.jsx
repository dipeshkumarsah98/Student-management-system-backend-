import React, { useContext, useEffect, useState } from 'react'
import { signup } from '../services/authenticate'
import { getUsers } from '../services/user'
import { Input } from './Input';
import UserContext from "../context/Context";

export const Signup = () => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({ username: '', password: '' });
    const context = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const { data: user } = await getUsers(); //getting list of user array
            setUsers(user.map(u => u.username.toLowerCase())); //filtering list into only username array
        }
        fetchData();
    }, [])

    const checkUsername = (userId) => {
        const username = userId.toLowerCase()
        const isAvailable = users.includes(username);
        if (isAvailable) {
            const err = { ...errors };
            err.username = "Username Already exits";
            return setErrors(err); //checking if username already exits and setting errors
        }
        else {
            const err = { ...errors };
            err.username = '';
            setErrors(err);
        }
        return isAvailable;

    }

    const handelSubmit = (e) => {
        e.preventDefault();

        const username = e.target.username.value; //storing username value
        if (checkUsername(username)) return;

        const data = getData(e.target);

        try {
            signup(data);
            console.log('signup successful');
            window.location = '/';
            return context.login;
        } catch (ex) {

            if (ex.response && ex.response.status === 400) {
                setErrors(ex.response.data);
            }
        }

    }
    const getData = (target) => {
        const username = target.username.value;
        const firstName = target.firstName.value;
        const lastName = target.lastName.value;
        const email = target.email.value;
        const password = target.password.value;
        console.log(username, firstName, lastName, email, password);
        const details = {
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            email: email
        };
        return details;
    }
    return (
        <div className="container">
            <h3 className="display-3">Sign up new user</h3>
            <form onSubmit={handelSubmit}>
                {errors.username && <div className="alert alert-warning" role="alert">

                    {errors.username}
                </div>
                }
                <Input
                    label={'Username'}
                    name={'username'}
                    required={true}
                />
                <Input
                    label={'First Name'}
                    name={'firstName'}
                    required={true}
                />
                <Input
                    label={'Last Name'}
                    name={'lastName'}
                    required={true}
                />
                <Input
                    label={'Email'}
                    name={'email'}
                    type={'emil'}
                    required={true}
                />
                {errors.password && <div className="alert alert-warning" role="alert">
                    {errors.password}
                </div>
                }
                <Input
                    label={'Password'}
                    name={'password'}
                    type={'password'}
                    required={true}
                />
                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-secondary btn-lg">Sign up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

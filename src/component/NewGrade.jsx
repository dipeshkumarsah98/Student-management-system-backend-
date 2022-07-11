import React, { useContext, useState } from 'react'
import { Input } from './Input'
import { newGrade } from '../services/getGrade';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/Context';


export const NewGrade = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const context = useContext(UserContext);
    function handelSubmit(e) {
        e.preventDefault();
        const gradeName = e.target.name.value;
        if (gradeName === '') {
            return setErrors("Grade name can't be empty ");
        }
        sendData(gradeName);
        context.changeInfo("New grade alert", "New grade has been added successully");
        navigate("/home");
    }
    async function sendData(name) {
        const { data } = await newGrade(name);
        return data;
    }

    return (
        <div className="container">
            <h3 className="display-3">Add Grade</h3>
            <form onSubmit={handelSubmit}>
                {errors && <div className="alert alert-danger disabled" role="alert">
                    A simple danger alert—check it out!
                </div>}
                <Input
                    name={'name'}
                    label={"Name"}
                    type={'text'}

                />

                <div className="row">
                    <div className="col-2">
                        <button type="submit" className="btn btn-primary btn-lg">Add Grade</button>
                    </div>
                </div>
            </form>
        </div>
    )

}

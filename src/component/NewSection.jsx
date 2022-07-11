import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/Context';
import getGradeList from '../services/getGrade';
import { saveSection } from '../services/getSection';
import { Input } from './Input';


export const NewSection = () => {
    const [grades, setGrades] = useState([]);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const context = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            const { data } = await getGradeList();
            setGrades(data);
        }
        fetchData();
    }, []);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const grade = e.target.grade.value;
        const result = checkError(name, grade);
        if (result) return;
        try {

            saveSection(name, grade);
            context.changeInfo('New Section Alert', 'New Section Has been added successully');
            navigate('/home');
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                console.log(ex.response);
            }
        }


    }

    function checkError(name, grade) {
        if (name === '') {
            setErrors("Please enter name")
            return true

        }
        if (grade === 'Select Grade') {
            setErrors("Please select valid Grade");
            return true
        }
        setErrors('');
        return false;
    }
    return (
        <div className="container">
            <h3 className="display-3">New section</h3>
            <form onSubmit={handelSubmit}>
                {errors && <div className="alert alert-danger disabled" role="alert">
                    {errors}
                </div>}
                <Input
                    name={'name'}
                    label={"Name"}
                    type={'text'}
                />
                <div className="form-group col-md-6 mb-3">
                    <label htmlFor="inputState" className='form-control-lg'>Grade</label>
                    <select id="inputState" name='grade' className="form-control form-control-lg">
                        <option defaultValue={'select grade'}>Select Grade</option>
                        {
                            grades.map((grade) =>
                                <option value={grade.id} key={grade.id}>{grade.name}</option>
                            )
                        }

                    </select>
                </div>
                <div className="row">
                    <div className="col-2">
                        <button type="submit" className="btn btn-primary btn-lg">Add Section</button>

                    </div>
                </div>
            </form>
        </div>
    )

}

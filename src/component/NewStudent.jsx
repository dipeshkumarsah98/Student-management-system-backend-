import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import getGradeList from '../services/getGrade';
import getSectionList from '../services/getSection';
import { saveStudent } from '../services/getStudentList';
import UserContext from '../context/Context';
import { Input } from './Input';

export const NewStudent = () => {
    const [originalSection, setOriginalSection] = useState([]);
    const [sections, setSections] = useState([]);
    const [grade, setGrades] = useState([]);
    const [isSection, setIsSection] = useState(false);

    const context = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const { data: gradeList } = await getGradeList();
            const { data: sectionList } = await getSectionList();
            setGrades(gradeList);
            setOriginalSection(sectionList);

        }
        fetchData();
    }, [])

    const handelChange = async (target) => {
        const gradeId = target.value;

        const filter = [...originalSection];
        const filtered = filter.filter(
            (section) => {
                return section.grade == gradeId;
            }
        );
        setSections(filtered);
        if (filtered.length === 0) {
            return setIsSection(false);
        }
        setIsSection(true);

    }
    const handelSubmit = async (e) => {
        e.preventDefault();

        // creating disc for post method
        const details = getDetails(e.target);

        // calling api
        try {
            await saveStudent(details);
            context.changeInfo("New Student", "New Student has beeen added successfully");
            navigate('/studnet');
        } catch (ex) {
            console.log(ex);
        }
    }
    function getDetails(target) {
        const name = target.name.value;
        const email = target.email.value;
        const address = target.address.value;
        const contact = target.contact.value;
        const selectedGrade = target.grade.value;
        const section = isSection ? target.section.value : null;
        const data = {
            name: name,
            email: email,
            address: address,
            contact: contact,
            Grade: selectedGrade,
            Section: section
        }
        return data;
    }

    return (
        <div className="container">
            <h4 className="display-4">Add New Student</h4>
            <form onSubmit={handelSubmit}>
                <Input
                    name={'name'}
                    label={"Name"}
                    type={'text'}
                    required={true}
                />
                <Input
                    name={'email'}
                    label={"Email"}
                    type={'email'}
                    required={true}
                />
                <Input
                    name={'address'}
                    label={"Address"}
                    type={'text'}
                    required={true}
                />
                <Input
                    name={'contact'}
                    label={"Contact"}
                    type={'number'}
                    required={true}
                />
                <div className="form-group col-md-6 mb-3">
                    <label htmlFor="inputState" className='form-control-lg'>Grade</label>
                    <select id="inputState" name='grade' className="form-control form-control-lg" onChange={(e) => handelChange(e.target)}>
                        <option defaultValue='select'>Select Grade</option>
                        {
                            grade.map((grade, index) => (
                                <option value={grade.id} key={grade.id} >{grade.name}</option>
                            ))
                        }
                    </select>
                </div>{
                    isSection && <div className="form-group col-md-6 mb-3">
                        <label htmlFor="inputState" className='form-control-lg'>Section</label>
                        <select id="inputState" className="form-control form-control-lg" name='section'>
                            <option defaultValue='select'>Select section</option>
                            {
                                sections.map((section, index) => (
                                    <option value={section.id} key={index}>{section.name}</option>
                                ))
                            }
                        </select>
                    </div>
                }
                <div className="row">
                    <div className="col-2">
                        <button type="submit" className="btn btn-primary btn-lg">Add Student</button>
                    </div>
                </div>
            </form>
        </div>
    )

}
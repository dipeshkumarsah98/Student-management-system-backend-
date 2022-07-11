import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import getGradeList from '../services/getGrade';
import getSectionList from '../services/getSection';
import { getStudentDetail, updateStudent } from '../services/getStudentList';
import { Input } from './Input';



export const UpdateStudent = () => {
    const [student, setStudent] = useState([]);
    const [grades, setGrade] = useState([]);
    const [orginalSection, setOriginalSection] = useState([]);
    const [sections, setSection] = useState([]);
    const [isSection, setIsSection] = useState(true);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getStudentDetail(id);
                const { data: gradeList } = await getGradeList();
                const { data: sectionList } = await getSectionList();
                setStudent(data);
                setGrade(gradeList);
                setOriginalSection(sectionList);
                setSection(sectionList.filter((s) => {
                    return s.grade == data.Grade.id;
                }));
            } catch (ex) {
                console.log(ex.response);
            }
        }
        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const details = getDetials(e.target);
        try {
            await updateStudent(id, details);
            navigate('/student');
        } catch (ex) {
        }
    }
    const getDetials = (target) => {
        const name = target.name.value;
        const address = target.address.value;
        const email = target.email.value;
        const contact = target.contact.value;
        const grade = target.grade.value;
        const gradeSection = isSection ? target.section.value : null;

        const details = {
            name: name,
            address: address,
            email: email,
            contact: contact,
            Grade: grade,
            Section: isSection ? gradeSection : null
        }
        return details;
    }
    const handelChange = (target) => {
        const gradeId = target.value; //getting selected grade
        const clone = [...orginalSection];
        const filtered = clone.filter(section => { //getting the list of section available in grade
            return section.grade == gradeId;
        });
        if (filtered.length === 0) return setIsSection(false); //if there is no section then not rendering section
        setSection(filtered); //setting the filterd value of section
        setIsSection(true);
    }

    return (
        <div className="container">
            <h3 className='display-3'>Update student</h3>
            <form onSubmit={handleSubmit}>

                <Input
                    name={'name'}
                    label={"Name"}
                    type={'text'}
                    value={student.name}
                    required={true}
                />
                <Input
                    name={'address'}
                    label={"Address"}
                    type={'text'}
                    value={student.address}
                    required={true}
                />
                <Input
                    name={'email'}
                    label={"Email"}
                    type={'text'}
                    value={student.email}
                    required={true}
                />
                <Input
                    name={'contact'}
                    label={"Contact"}
                    type={'number'}
                    value={student.contact}
                    required={true}
                />
                <div className="form-group col-md-6 mb-3">
                    <label htmlFor="inputState" className='form-control-lg'>Grade</label>
                    <select id="inputState" name='grade' className="form-control form-control-lg" onChange={(e) => handelChange(e.target)}>
                        {
                            grades.map((grade) => (
                                (grade.id !== student.Grade.id ?
                                    <option
                                        value={grade.id}
                                        key={grade.id}
                                    >
                                        {grade.name}
                                    </option> :
                                    <option
                                        selected
                                        value={grade.id}
                                        key={grade.id}

                                    >
                                        {grade.name}
                                    </option>

                                )
                            ))
                        }

                    </select>
                </div>
                {isSection &&
                    <div className="form-group col-md-6 mb-3">
                        <label htmlFor="inputState" className='form-control-lg'>Section</label>
                        <select id="inputState" name='section' className="form-control form-control-lg">
                            {
                                sections.map((section) => (
                                    (section.id === student.Section.id ?
                                        <option
                                            value={section.id}
                                            key={section.id}
                                            selected
                                            disabled

                                        >
                                            {section.name}
                                        </option> :
                                        <option
                                            value={section.id}
                                            key={section.id}
                                        >
                                            {section.name}
                                        </option>

                                    )))
                            }

                        </select>
                    </div>
                }

                <div className="row">
                    <div className="col-2">
                        <button type="submit" className="btn btn-primary btn-lg">Update Student</button>

                    </div>
                </div>
            </form>
        </div>
    )
}

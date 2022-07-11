import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCustomUser } from '../services/user';
export const UpdateUser = () => {
    const [user, setUser] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        async function fetchData(id) {
            const { data } = await getCustomUser(id);
            setUser(data);
        }
        fetchData(id);
    }, [id])
    return (
        <div className='container'>
            <h4 className='display-4'>Update user {user.username}</h4>
            <form action="">
                <div className="row">
                    <div className="col-2">
                        <div className="form-check text-center">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Make Staff
                            </label>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

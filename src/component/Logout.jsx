import { useEffect, useContext } from 'react';
import { logout } from '../services/authenticate';
import UserContext from '../context/Context';

export const Logout = () => {
    const context = useContext(UserContext);
    useEffect(() => {
        logout();
        window.location = '/';
        return context.login;
    })
    return null;
}

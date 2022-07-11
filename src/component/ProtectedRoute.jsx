import { Navigate, Outlet } from 'react-router-dom'
import { getCurrentUser } from '../services/authenticate';
import { getLoggedUser, getUsers } from '../services/user'


const useAuth = () => {
    const user = { loggedIn: getCurrentUser() };
    return user && user.loggedIn;
};


const ProtectedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to='/' replace={true} />;

};

export default ProtectedRoute;

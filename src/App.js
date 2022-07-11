import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/collapse';
import { NavBar } from './component/NavBar';
import { Home } from './component/Home';
import { StudentList } from './component/StudentList';
import { Login } from './component/Login';
import { UpdateStudent } from './component/UpdateStudent';
import { Signup } from './component/Signup';
import { NewStudent } from './component/NewStudent';
import { NewGrade } from './component/NewGrade';
import { NewSection } from './component/NewSection';
import UserContext from './context/Context';
import { useState } from 'react';
import { Logout } from './component/Logout';
import { getLoggedUser } from './services/user';
import { useNavigate } from 'react-router-dom'
import { ManageUser } from './component/ManageUser';
import { UpdateUser } from './component/UpdateUser';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [info, setInfo] = useState({ title: 'Welcome', discription: 'Welcome to sms!!' });

  const navigate = useNavigate();
  const loggedIn = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  }


  const changeInfo = (title, discription) => {
    setInfo({
      title: title || "Welcome",
      discription: discription || 'Welcome to sms!!'
    });
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ status: isLoggedIn, login: loggedIn, info, changeInfo }}>
        <NavBar />
        <div className="container-flude">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='new/student' element={<NewStudent />} />
              <Route path='new/grade' element={<NewGrade />} />
              <Route path='new/section' element={<NewSection />} />
              <Route path='student/:id/update' element={<UpdateStudent />} />
              <Route path='student' element={<StudentList />} />
              <Route path='user/:id/update' element={<UpdateUser />} />
              <Route path='user' element={<ManageUser />} />
              <Route path='logout' element={<Logout />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;

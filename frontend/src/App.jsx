import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/login/Login'
import AdminDashboard from './pages/dashboard/Admin'
import ManageFaculty from './pages/manage/Faculty'
import ManageStudents from './pages/manage/Student'
import Home from './pages/Home'
import ManageClass from './pages/manage/Class'
import RegisterFaculty from './pages/register/Faculty'
import RegisterStudent from './pages/register/Student'
import RegisterClass from './pages/register/Class'
import StudentDashboard from './pages/dashboard/Student'
import FacultyDashboard from './pages/dashboard/Faculty'
import Attendance from './pages/Attendance'

function App() {

  return (
    <>
      <NavBar />
      {/* <ToastContainer>   */}
        <Router>
          <div className="container">
            <Routes>
              
              <Route index element={ <Home /> } />
              
              <Route path='login'>
                <Route index element={ <Login loginAs={'admin'} /> } />
                <Route path='admin' element={ <Login loginAs={'admin'} /> } />
                <Route path='faculty' element={ <Login loginAs={'faculty'} /> } />
                <Route path='student' element={ <Login loginAs={'student'} /> } />
              </Route>
              
              <Route path='admin'>
                <Route index element={ <AdminDashboard /> } />
                <Route path='faculty'>
                  <Route index element={ <ManageFaculty /> } />
                  <Route path='new' element={ <RegisterFaculty /> } />
                </Route>
                <Route path='student'>
                  <Route index element={ <ManageStudents /> } />
                  <Route path='new' element={ <RegisterStudent /> } />
                </Route>
                <Route path='class'>
                  <Route index element={ <ManageClass /> } />
                  <Route path='new' element={ <RegisterClass /> } />
                </Route>
              </Route>

              <Route path='faculty'>
                <Route index element={ <FacultyDashboard /> } />
                <Route path='me' element={ <></> } />
                <Route path='attendance' element={ <Attendance /> } />
              </Route>

              <Route path='student'>
                <Route index element={ <StudentDashboard /> } />
                <Route path='me' element={ <></> } />
              </Route>
              
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      <Footer />
    </>
  )
}

export default App
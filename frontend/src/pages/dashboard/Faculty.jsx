import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'

function FacultyDashboard() {

    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const [info, setInfo] = useState({})
    const [classInfo, setClassInfo] = useState({})

    useEffect(() => {
        if (!user || user.type !== 'faculty') {
            navigate('/login')
        }

        async function getInfo() {
            
            let response = await axios.get('http://localhost:8000/users/faculty/me', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            setInfo(response.data)

            try {
                response = await axios.get('http://localhost:8000/users/faculty/class', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                setClassInfo(response.data)
                console.log(response.data.students)
            } catch (err) {

            }
        }

        getInfo()
        
    }, [user, navigate])

    return <>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                <div className="card">
                    <div className="card-header text-center">Faculty Information</div>
                    <div className="card-body">
                        <h5 className="card-title mb-3">{info.fullName}</h5>
                        <p className="card-text">
                            <strong>ID:</strong> {info._id}
                        </p>
                        <p className="card-text">
                            <strong>Department:</strong> {info.department}
                        </p>
                        <p className="card-text">
                            <strong>Email:</strong> {info.universityEmail}
                        </p>
                    </div>
                </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">Class</div>
                        {/* <div className="card-body">
                            <h5 className="card-title">{info.class.name}</h5>
                            <p className="card-text">
                                <strong>Section:</strong> {info.class.section}
                            </p>
                            <p className="card-text">
                                <strong>Number of Students:</strong>{" "}
                                {info.class.students}
                            </p>
                        </div> */}
                        {classInfo ? (
                            <>
                                <div className="card-body">
                                    <h5 className="card-title">{classInfo.name}</h5>
                                    <Button href='/faculty/attendance' variant='outline-success' size='lg'>Take Attendance</Button>
                                    {/* {classInfo.students.forEach(student => (
                                        <strong>{student.fullName}</strong>
                                    ))} */}
                                </div>
                            </>
                        )
                        : 
                        (<>
                            You do not belong to any class
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    </>
    
}

export default FacultyDashboard

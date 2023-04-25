import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function StudentDashboard() {

    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const [info, setInfo] = useState({})

    useEffect(() => {
        if (!user || user.type !== 'student') {
            navigate('/login')
        }

        async function getInfo() {
            const response = await axios.get('http://localhost:8000/users/student/me', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            setInfo(response.data)
        }

        getInfo()
        
    }, [user, navigate])

    console.log(info)

    return <>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                <div className="card">
                    <div className="card-header">Student Information</div>
                    <div className="card-body">
                    <h5 className="card-title mb-3">{info.fullName}</h5>
                    <p className="card-text">
                        <strong>ID:</strong> {info._id}
                    </p>
                    <p className="card-text">
                        <strong>Registration Number:</strong> {info.registrationNumber}
                    </p>
                    <p className="card-text">
                        <strong>Total Classes:</strong> {info.classesConducted}
                    </p>
                    <p className="card-text">
                        <strong>Attended:</strong> {info.classesAttended}
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
    
}

export default StudentDashboard

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import StudentCard from '../../components/StudentCard'

const ManageStudents = () => {

    const [students, setStudents] = useState([])
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate(`/login`)
        }

        async function getStudents() {
            const response = await axios.get('http://localhost:8000/users/student/all', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            setStudents(response.data)
        }

        getStudents()
        
    }, [user, navigate])

    const handleDelete = async (id) => {
        await axios.delete('http://localhost:8000/users/student/delete', {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            data: {
                id
            }
        })      
    }

    return (
        <>
            {students.length > 0 ?
            (
                <div className="container mt-5 mb-5">
                    <div className="d-flex justify-content-between mb-3">
                        <h1>Student Management Portal</h1>
                        <Button href='/admin/student/new' variant="outline-success" className="mb-3">
                            Register new Student
                        </Button>
                    </div>
                    {students.map(student => (
                        <div className="my-4">
                            <StudentCard className='m-3' key={student._id} student={student} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            )
            :
            (<>
                <p>
                    No students in the Database
                </p>
            </>)}
        </>
    )
    
}

export default ManageStudents
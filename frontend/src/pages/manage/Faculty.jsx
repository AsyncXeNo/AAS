import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import FacultyCard from '../../components/FacultyCard'
import { Button } from 'react-bootstrap'

const ManageFaculty = () => {

    const [faculty, setFaculty] = useState([])
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate(`/login`)
        }

        async function getFaculty() {
            const response = await axios.get('http://localhost:8000/users/faculty/all', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            setFaculty(response.data)
        }

        getFaculty()
        
    }, [user, navigate])

    const handleDelete = async (id) => {
        await axios.delete('http://localhost:8000/users/faculty/delete', {
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
            {faculty.length > 0 ?
            (
                <div className="container mt-5">
                    <div className="d-flex justify-content-between mb-3">
                        <h1>Faculty Management Portal</h1>
                        <Button href='/admin/faculty/new' variant="outline-success" className="mb-3">
                            Register new Faculty
                        </Button>
                    </div>
                    {faculty.map(fac => (
                        <div className="my-4">
                            <FacultyCard className='m-3' key={fac._id} faculty={fac} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            )
            :
            (<>
                <p>
                    No faculty in the Database
                </p>
            </>)}
        </>
    )
    
}

export default ManageFaculty
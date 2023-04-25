import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify' 

function RegisterClass() {

    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [students, setStudents] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const [faculty, setFaculty] = useState([])
    
    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate('/login')
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

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate('/login')
        }
    }, [user, navigate])
    
    const [name, setName] = useState('');
    const [teacher, setTeacher] = useState('');
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleTeacherChange = (event) => {
        setTeacher(event.target.value);
    }

    const handleAddStudent = (event) => {
        const studentName = event.target.value;
        setStudents([...students, studentName]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const classData = {
            name,
            classTeacher: faculty,
            students
        }
        try {
            await axios.post('http://localhost:8000/class/register', classData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success('Class registered successfully')
            navigate('/admin')
        } catch (err) {
            toast.error('Something went wrong')
            navigate('/admin')
        }
    }

    console.log(students);

    return <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            flexDirection: 'column'
        }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className='mb-4'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} />
                </Form.Group>

                <Form.Group controlId="teacher" className='mb-4'>
                    <Form.Label>Class Teacher</Form.Label>
                    <Form.Control as="select" value={teacher} onChange={handleTeacherChange}>
                    <option>Select a teacher</option>
                    {
                        faculty.forEach(fac => (
                            <>
                                <option>{fac.username}</option>
                            </>
                        ))
                    }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="students" className='mb-4'>
                    <Form.Label>Students</Form.Label>
                    <Form.Control as="select" multiple onChange={handleAddStudent}>
                    <option>Select students</option>
                    {
                        students.forEach(student => {
                            <option>{student.fullName}</option>
                        })
                    }
                    </Form.Control>
                </Form.Group>

                <Button variant="outline-success" type="submit">Register</Button>
            </Form>
        </div>
    </>
    
}

export default RegisterClass
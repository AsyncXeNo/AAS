import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

function Attendance() {

    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [name, setName] = useState('')
    const [students, setStudents] = useState([])
    const [attendance, setAttendance] = useState({})

    const faceio = new faceIO('fioab305')

    useEffect(() => {

        if (!user || user.type !== 'faculty') {
            navigate('/login')
        }

        async function getInfo() {
            const response = await axios.get('http://localhost:8000/users/faculty/class', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            setName(response.data.name)
            setStudents(response.data.students)
        }

        getInfo()

        async function authenticateUser() {
            const userData = faceio.authenticate({
                'locale': 'auto',
            })
            console.log(userData)
        }

        authenticateUser()

    }, [user, navigate])

    const handleSubmit = (e) => {
        navigate('/faculty')
        toast.success('Attendance Submitted')
    }

    const handleAttendanceChange = (e, student) => {

    }

    console.log(students)

    return (
        <>
            <div id="faceio-modal"></div>
            <Container className="mt-5">
                <Row>
                    <Col className="text-center">
                        <h2>Mark Attendance ({name})</h2>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={{ span: 6, offset: 3 }}>
                        <ul className="list-group">
                            <li
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                Kavya Aggarwal
                                <input
                                    type="checkbox"
                                    checked={false}
                                />
                            </li>
                            <li
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                Gaurav Gusain
                                <input
                                    type="checkbox"
                                    checked={false}
                                />
                            </li>
                            <li
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                Imon Banerjee
                                <input
                                    type="checkbox"
                                    checked={false}
                                />
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
    
}

export default Attendance
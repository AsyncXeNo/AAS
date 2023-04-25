import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'

function RegisterFaculty() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [universityEmail, setUniversityEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [fullName, setFullName] = useState('')
    const [personalEmail, setPersonalEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate('/login')
        }
    }, [user, navigate])

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Passwords do not match')
        }

        const userInformation = {
            username,
            password,
            universityEmail,
            department,
            fullName,
            personalEmail,
            phone: [phone],
            address: [addressLine1, addressLine2]
        }

        try {
            await axios.post('http://localhost:8000/users/faculty/register', userInformation, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            
            navigate('/admin/faculty')

            toast.success('Faculty successfully registered')
        } catch (err) {
            navigate('/admin/faculty/')

            toast.error(err.response.data.message)      
        }
    }

    return <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            flexDirection: 'column'
        }}>
            <h1 className='mb-4 mt-3'>
                Register Faculty
            </h1>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className='mb-3'>
                    <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="password" className='mb-3'>
                            <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="confirmPassword" className='mb-3'>
                            <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>  
                    </Col>
                </Row>

                <Form.Group controlId="universityEmail" className='mb-3'>
                    <Form.Control
                    type="email"
                    placeholder="Enter university email"
                    value={universityEmail}
                    onChange={(e) => setUniversityEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="personalEmail" className='mb-3'>
                    <Form.Control
                    type="email"
                    placeholder="Enter personal email"
                    value={personalEmail}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="department" className='mb-3'>
                    <Form.Control
                    type="text"
                    placeholder="Enter department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="phone" className='mb-3'>
                    <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="fullName" className='mb-3'>
                    <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="addressLine1" className='mb-3'>
                    <Form.Control
                    type="text"
                    placeholder="Enter address line 1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="addressLine2" className='mb-5'>
                    <Form.Control
                    type="text"
                    placeholder="Enter address line 2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    />
                </Form.Group>

                <div className='text-center'>
                    <Button variant="primary" type="submit" style={{
                        width: '30%'
                    }}>
                        Register
                    </Button>
                </div>
                
            </Form>
        </div>
    </>

}

export default RegisterFaculty
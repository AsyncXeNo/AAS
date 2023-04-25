import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { reset, login } from '../../features/auth/authSlice'
import { Card, Form, Button } from 'react-bootstrap'
import { FaUser, FaLock } from 'react-icons/fa'

function Login({ loginAs }) {
    const [as, setAs] = useState(loginAs)

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { username, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(reset())
    }, [])

    useEffect(() => {
        
        if (isError) {
            toast.error(message)
        }
        
        if (user) {
            navigate(`/${user.type}`)
        }

        dispatch(reset())

        setFormData({
            username: '',
            password: ''
        })
        
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleAsChange = (e) => {
        setAs(e.target.value)
        setFormData({
            username: '',
            password: ''
        })

        dispatch(reset())

        navigate(`/login/${e.target.value}`)
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        
        e.preventDefault()

        const userData = {
            as, username, password
        }

        dispatch(login(userData))

    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            flexDirection: 'column'
        }}>
            <Card className='p-1' style={{
                width: '40%'
            }}>
                <Card.Header>
                    <Card.Title className="text-center">Login</Card.Title>
                    
                </Card.Header>
                <Form className='text-center mt-4 mb-1'>
                    <Form.Check
                        inline
                        type='radio'
                        label='Admin'
                        name='radiobutton'
                        id='option1'
                        value='admin'
                        checked={ as === 'admin' }
                        onChange={handleAsChange}
                    />
                    <Form.Check
                        inline
                        type='radio'
                        label='Faculty'
                        name='radiobutton'
                        id='option2'
                        value='faculty'
                        checked={ as === 'faculty' }
                        onChange={handleAsChange}
                    />
                    <Form.Check
                        inline
                        type='radio'
                        label='Student'
                        name='radiobutton'
                        id='option3'
                        value='student'
                        checked={ as === 'student' }
                        onChange={handleAsChange}
                    />
                </Form>
                <Form onSubmit={onSubmit}>
                <Card.Body>                    
                        <Form.Group controlId="formUsername" className='mb-3'>
                            <Form.Label>Username</Form.Label>
                            <div className="input-group">
                                
                                <Form.Control type="text" placeholder="Enter username" name='username' value={username} onChange={handleChange} />
                            </div>
                        </Form.Group>
            
                        <Form.Group controlId="formPassword" className='mb-2'>
                            <Form.Label>Password</Form.Label>
                            <div className="input-group">
                                
                                <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={handleChange} />
                            </div>
                        </Form.Group>
                    
                </Card.Body>
                <Card.Footer>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Card.Footer>
                </Form>
            </Card>
        </div>
    )
}

export default Login
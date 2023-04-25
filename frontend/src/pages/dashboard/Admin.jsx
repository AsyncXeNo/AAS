import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'

function AdminDashboard() {

    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate('/login')
        }
    }, [user, navigate])

    return <>
        <Container>
            <Row className="mt-5">
                <Col>
                    <h1>Welcome to Admin Dashboard</h1>
                    <p className='small'>You are currently logged in as <span style={{
                        color: 'grey',
                        textDecoration: 'underline'
                    }}>{user.username}</span></p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <Card.Title className='m-auto text-center p-2'>Manage Students</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                You can perform the following actions
                                
                                <li>
                                    Register students
                                </li>
                                <li>
                                    Remove students
                                </li>
                                
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className='text-center'>
                            <Button href='/admin/student' variant='outline-primary' size='' className='m-2' style={{
                                width: '40%'
                            }}>
                                Proceed
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <Card.Title className='m-auto text-center p-2'>Manage Faculty</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                You can perform the following actions
                                
                                <li>
                                    Register faculty
                                </li>
                                <li>
                                    Remove faculty
                                </li>
                                
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className='text-center'>
                            <Button href='/admin/faculty' variant="outline-primary" size='' className='m-2' style={{
                                width: '40%'
                            }}>
                                Proceed
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <Card.Title className='m-auto text-center p-2'>Manage Classes</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                You can perform the following actions
                                
                                <li>
                                    Register classes
                                </li>
                                <li>
                                    Remove classes
                                </li>
                                
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className='text-center'>
                            <Button href='/admin/class' variant='outline-primary' size='' className='m-2' style={{
                                width: '40%'
                            }}>
                                Proceed
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            </Container>
    </>
    
}

export default AdminDashboard

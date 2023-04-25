import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ClassCard from '../../components/ClassCard'
import { Button } from 'react-bootstrap'

const ManageClass = () => {

    const [classes, setClasses] = useState([])
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user || user.type !== 'admin') {
            navigate(`/login`)
        }

        async function getClasses() {
            const response = await axios.get('http://localhost:8000/class/all', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            setClasses(response.data)
        }

        getClasses()
    }, [user, navigate])

    const handleDelete = async (id) => {
        await axios.delete('http://localhost:8000/class/delete', {
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
            {classes.length > 0 ?
            (
                <div className="container mt-5">
                    <div className="d-flex justify-content-between mb-3">
                        <h1>Class Management Portal</h1>
                        <Button href='/admin/class/new' variant="outline-success" className="mb-3">
                            Create new Class
                        </Button>
                    </div>
                    {classes.map(_class => (
                        <div className="my-4">
                            <ClassCard className='m-3' key={_class._id} _class={_class} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            )
            :
            (<>
                <p>
                    No classes in the Database
                </p>
            </>)}
        </>
    )

}

export default ManageClass
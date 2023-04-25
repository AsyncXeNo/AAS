import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            navigate(`/${user.type}`)
        } else {
            navigate(`/login`)
        }
    }, [user, navigate])
    
}

export default Home
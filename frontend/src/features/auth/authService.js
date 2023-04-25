import axios from 'axios'

const API_URL = 'http://localhost:8000'

const login = async (user) => {

    console.log(user)
    
    const response = await axios.post(`${API_URL}/users/${user.as}/login`, user)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    login,
    logout
}

export default authService
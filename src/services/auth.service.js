import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

export default function authService() {
    const login = (email, password) => {
        return axios.post(API_URL + 'signin', { email, password })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }
    const register = (firstName, lastName, email, password) => {
        return axios.post(API_URL + 'signup', {firstName, email, lastName, password} );
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    }

    return {
        login, logout, register, getCurrentUser
    }
    
}
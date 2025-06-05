import axios from "axios";

export const getUser = (userId) => {
    return axios.get(`http://localhost:3000/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
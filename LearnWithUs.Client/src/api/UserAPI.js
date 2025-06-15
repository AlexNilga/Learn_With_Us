import axios from "axios";

export const getUserData = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/user/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return {
            status: response.status,
            success: true,
            message: "Success",
            data: response.data
        }
    } catch (error) {
        return {
            status: error.response?.status,
            success: false,
            message: error.response?.data?.error || "An error occurred",
            data: null
        }
    }
}

export async function registerUser(formData) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/user`,
            formData,
            {headers: {'Content-Type': 'application/json'}}
        );

        return {
            status: response.status,
            success: true,
            message: "Success"
        }
    } catch (error) {
        return {
            status: error.response.status,
            success: false,
            message: error.response.data.error
        }
    }
}

export async function loginUser(formData) {

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/user/login`,
            formData,
            {headers: {'Content-Type': 'application/json'}}
        );
        return {
            status: response.status,
            success: true,
            message: "Success",
            token: response.data.token
        }
    } catch (error) {
        return {
            status: error.response.status,
            success: false,
            message: error.response.data.error
        }
    }
}
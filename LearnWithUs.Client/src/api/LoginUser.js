import axios from "axios";

export async function loginUser(formData) {

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/user/login`,
            formData,
            {headers: {'Content-Type': 'application/json'}}
        );
        localStorage.setItem("token", response.data.token);
        return {
            status: response.status,
            success: true,
            message: "Success",
        }
    } catch (error) {
        return {
            status: error.response.status,
            success: false,
            message: error.response.data.error
        }
    }
}
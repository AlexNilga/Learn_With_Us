import axios from "axios";

export async function loginUserAPI(formData) {

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
import axios from "axios";

export async function registerUserAPI(formData) {
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

import axios from "axios";

export async function getCategories() {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/category/`,
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
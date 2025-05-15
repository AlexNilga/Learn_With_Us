import axios from "axios";

export async function getCategories(parentId) {
    try {
        const token = localStorage.getItem("token");
        const params = {};
        if(parentId === null) {
            params.parentId = 'null';
        }
        else if (parentId !== undefined) {
            params.parentId = parentId
        }
        console.log(params);

        let config = {
            params: params,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        console.log(config);

        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/category`,
            {
                params: params,
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



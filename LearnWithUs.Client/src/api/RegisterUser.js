import axios from "axios";

export async function registerUser(formData) {
    const orderedRegData = {
        username: formData.username,
        password: formData.password,
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastName
    };

    try{
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/user`,
            orderedRegData,
            {headers: {'Content-Type': 'application/json'}}
        );

        return {
            status: response.status,
            success: true,
            message: "Success"
        }
    }catch(error){
        return {
            status: error.response.status,
            success: false,
            message: error.response.data.error
        }
    }
}

export async function loginUser(formData) {
    const orderedLogData = {
        username: formData.username,
        password: formData.password,
    };

    console.log(orderedLogData);
    try {
        const {data} = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/user/login`,
            orderedLogData,
            {headers: {'Content-Type': 'application/json'}}
        );
        console.log('Success:', data);
        localStorage.setItem("token", data.token);
    } catch (error) {
        console.error('Submission error:', error.response || error);
    }
}

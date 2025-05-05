import axios from "axios";

export async function registerUser(formData) {
    const orderedRegData = {
        username: formData.username,
        password: formData.password,
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastName
    };

    console.log(orderedRegData);
    try {
        const {data} = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/user`,
            orderedRegData,
            {headers: {'Content-Type': 'application/json'}}
        );
        console.log('Success:', data);
    } catch (error) {
        console.error('Submission error:', error.response || error);
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
    } catch (error) {
        console.error('Submission error:', error.response || error);
    }
}

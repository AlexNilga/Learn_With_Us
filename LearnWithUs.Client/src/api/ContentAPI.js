import axios from "axios";

export async function getContent(categoryId) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/content`,
            {
                params: {categoryId: categoryId},
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

export async function downloadFile(fileId) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/content/${fileId}/file`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
            }
        );

        const contentDisposition = response.headers['content-disposition'];

        const raw = contentDisposition
            ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
            : `file-${fileId}`;

        const fileName = decodeURIComponent(raw).trim();


        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        return {
            status: response.status,
            success: true,
            message: "File downloaded successfully",
            data: null
        }
    } catch (error) {
        return {
            status: error.response?.status,
            success: false,
            message: error.response?.data?.error || "Failed to download file",
            data: null
        }
    }
}

export async function deleteFile(fileId) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
            `${process.env.REACT_APP_API_BASE_URL}/content/${fileId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return {
            status: response.status,
            success: true,
            message: "File deleted successfully",
            data: null
        }
    } catch (error) {
        return {
            status: error.response?.status,
            success: false,
            message: error.response?.data?.error || "Failed to delete file",
            data: null
        }
    }
}

export async function uploadFile(categoryId, description, file) {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("categoryId", categoryId);
        formData.append("description", description);

        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/content`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            }
        );

        return {
            status: response.status,
            success: true,
            message: "File uploaded successfully",
            data: response.data,
        };
    } catch (error) {
        return {
            status: error.response?.status,
            success: false,
            message: error.response?.data?.error || "Failed to upload file",
            data: null,
        };
    }
}
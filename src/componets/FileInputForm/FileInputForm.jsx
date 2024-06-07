import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
export default function FileInputForm({categoryId}) {
    const url = `http://localhost:5281/${categoryId}/1/content`
    const [files, setFiles] = useState([])
    const changeFiles = (e) => {
        setFiles(e.target.files)
    }
    const uploadFiles = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        for(const file of files){
            formData.append('file', file)
            console.log("file:", formData)

        }

        axios.post(url, formData, {
            headers:{
                "Content-Type": "multipart/form-data",
            },
        }).then((response) =>{
            console.log("response", response.data)
        })
    }

    return (<div>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Завантажте свій файл</Card.Title>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Виберіть файл</Form.Label>
                        <Form.Control onChange={changeFiles} type="file" size="md"/>
                    </Form.Group>
                    <Button onClick={uploadFiles} variant="primary">Завантажити</Button>
                </Card.Body>

            </Card>


        </div>
    )
}


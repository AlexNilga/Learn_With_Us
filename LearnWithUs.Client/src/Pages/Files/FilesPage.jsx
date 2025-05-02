import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import SubjectUI from "../../componets/Subjects/SubjectUI";
import {useParams} from "react-router-dom";
import File from "../../componets/File/File";
import FileInputForm from "../../componets/FileInputForm/FileInputForm";

export default function FilesPage() {
    let {subjectId} = useParams();
    const url = `http://localhost:5281/category/${subjectId}`
    const [files, setFiles] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json()

                setFiles(data.content)
            } catch (e) {
                console.error('Error fetching posts:', e);
            }

        }
        fetchPosts()
    });

    return (
        <>
            <FileInputForm categoryId={subjectId}/>
            <Row xs={1} md={5} className="g-5 p-5 ">
                {files.map((file) => (
                    <Col key={file.name}>
                        <File fileName={file.name} subjectId={subjectId}>
                        </File>
                    </Col>
                ))}
            </Row>

        </>
    )
}



import React, {useEffect, useState} from "react"
import SubjectUI from "../../componets/Subjects/SubjectUI";
import {Col, Row} from "react-bootstrap";

function SubjectsPage() {
    const URL = 'http://localhost:5281/category'

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await fetch(URL)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const posts = await response.json()
            // console.log(posts)
            setSubjects(posts)
        } catch (e) {
            console.error('Error fetching posts:', e);
        }

    }
    fetchPosts()
    });

    return (
        <>
            <Row xs={1} md={5} className="g-4 p-5 ">
                {subjects.map((subject) => (
                    <Col key={subject.id}>
                        <SubjectUI data={subject}>
                        </SubjectUI>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default SubjectsPage
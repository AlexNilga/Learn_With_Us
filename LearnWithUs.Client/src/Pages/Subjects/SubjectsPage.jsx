import React, {useEffect, useState} from "react"
import SubjectUI from "../../componets/Subjects/SubjectUI";
import {Col, Row} from "react-bootstrap";

function SubjectsPage() {

    const [subjects, setSubjects] = useState([])


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
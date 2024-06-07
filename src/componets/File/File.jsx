import React from "react";
import ListGroup from "react-bootstrap";


export default function File({fileName, subjectId}) {
    const url = `http://localhost:5281/category/${subjectId}/content/${fileName}`
    return (<>
        <img src={"../../../public/wordIcon.png"} alt={"..."} />
        <a href={url} download={fileName}>{fileName}</a>
        </>
    )
}
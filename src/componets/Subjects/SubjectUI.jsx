import "./SubjectUI.css"
import React, {useState} from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";

function SubjectUI(props) {

    const subject = props.data

    return (
        <Link to={`${subject.id}`} className="link-unstyled link-unstyled:link link-unstyled:hover">
        <MDBCard className='h-100'>
            <MDBCardImage className='resized-img'
                          src="https://flomaster.top/o/uploads/posts/2024-02/1708543841_flomaster-top-p-serii-abstraktnii-fon-vkontakte-risunok-2.jpg"
                          alt='...'
                          position='top'
            />
            <MDBCardBody>
                <MDBCardTitle>{subject.name}</MDBCardTitle>
                <MDBCardText>
                    {subject.description}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
        </Link>

        //TODO: "Make it work with admin rules"

        // <Subjects>
        //     <Subjects.Img variant="top" src="holder.js/100px180?text=Image cap" />
        //     <Subjects.Body>
        //         <Subjects.Title>Subjects Title</Subjects.Title>
        //         <Subjects.Text>
        //             Some quick example text to build on the card title and make up the
        //             bulk of the card's content.
        //         </Subjects.Text>
        //     </Subjects.Body>
        //     <ListGroup className="list-group-flush">
        //         <ListGroup.Item>Cras justo odio</ListGroup.Item>
        //         <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        //         <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        //     </ListGroup>
        //     <Subjects.Body>
        //         <Subjects.Link href="#">Subjects Link</Subjects.Link>
        //         <Subjects.Link href="#">Another Link</Subjects.Link>
        //     </Subjects.Body>
        // </Subjects>
    )
}

export default SubjectUI



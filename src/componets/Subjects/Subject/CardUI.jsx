import "./CardUI.css"
import React from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";

function CardUI(props) {
    const data = props.data
    return (
        <Link to="/subjects/materials" className="link-unstyled link-unstyled:link link-unstyled:hover">
        <MDBCard className='h-100'>
            <MDBCardImage className='resized-img'
                          src={data.img}
                          alt='...'
                          position='top'
            />
            <MDBCardBody>
                <MDBCardTitle>{data.name}</MDBCardTitle>
                <MDBCardText>
                    {data.bio}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
        </Link>

        //TODO: "Make it work with admin rules"

        // <Subject>
        //     <Subject.Img variant="top" src="holder.js/100px180?text=Image cap" />
        //     <Subject.Body>
        //         <Subject.Title>Subject Title</Subject.Title>
        //         <Subject.Text>
        //             Some quick example text to build on the card title and make up the
        //             bulk of the card's content.
        //         </Subject.Text>
        //     </Subject.Body>
        //     <ListGroup className="list-group-flush">
        //         <ListGroup.Item>Cras justo odio</ListGroup.Item>
        //         <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        //         <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        //     </ListGroup>
        //     <Subject.Body>
        //         <Subject.Link href="#">Subject Link</Subject.Link>
        //         <Subject.Link href="#">Another Link</Subject.Link>
        //     </Subject.Body>
        // </Subject>
    )
}

export default CardUI



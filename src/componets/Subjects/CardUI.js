import "./CardUI.css"
import {Card, ListGroup} from "react-bootstrap";
import React from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

function CardUI(props) {
    const data = props.data
    return (
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





        //TODO: "Make it work with admin rules"

        // <Card>
        //     <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        //     <Card.Body>
        //         <Card.Title>Card Title</Card.Title>
        //         <Card.Text>
        //             Some quick example text to build on the card title and make up the
        //             bulk of the card's content.
        //         </Card.Text>
        //     </Card.Body>
        //     <ListGroup className="list-group-flush">
        //         <ListGroup.Item>Cras justo odio</ListGroup.Item>
        //         <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        //         <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        //     </ListGroup>
        //     <Card.Body>
        //         <Card.Link href="#">Card Link</Card.Link>
        //         <Card.Link href="#">Another Link</Card.Link>
        //     </Card.Body>
        // </Card>
    )
}

export default CardUI



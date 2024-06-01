import React from "react"
import CardUI from "./CardUI";
import {Col, Row} from "react-bootstrap";

function CardGrid(props) {
    const data = props.data
        return(
            <Row xs={1} md={5} className="g-4 p-5 ">
                {Array.from(data).map((_, idx) => (
                    <Col key={idx}>
                        <CardUI data = {data[idx]}>
                        </CardUI>
                    </Col>
                ))}
            </Row>
        )
}

export default CardGrid
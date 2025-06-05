import React, {useContext} from "react";
import './WelcomePage.css';
import {Spinner} from "react-bootstrap";
import {AuthContext} from "../../../api/AuthContext";



function WelcomePage() {
    const {role} = useContext(AuthContext);
    return (
        <div className="App">
           <p>Will be soon</p>
            <p>Your role {role} </p>
            <Spinner animation="border" />
        </div>
    )
}

export default WelcomePage;

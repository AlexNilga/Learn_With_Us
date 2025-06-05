import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBIcon
} from 'mdb-react-ui-kit';
import {AuthContext} from '../../../api/AuthContext';
import {getUser} from "../../../api/UserAPI";

export default function PersonalProfile() {
    const navigate = useNavigate();
    const {logout, } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <section className="vh-100" style={{backgroundColor: '#f4f5f7'}}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{borderRadius: '.5rem'}}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-dark py-5 px-4"
                                        style={{borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
                                    <MDBCardImage
                                        src=""
                                        alt="Avatar" className="my-5" style={{width: '170px'}} fluid/>
                                    <MDBTypography tag="h5">some text</MDBTypography>
                                    <MDBCardText>Web Developer</MDBCardText>
                                    <MDBIcon far icon="edit mb-5"/>
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4"/>
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">First Name</MDBTypography>
                                                <MDBCardText className="text-muted">Name example</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Second Name</MDBTypography>
                                                <MDBCardText className="text-muted">Second name example</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4"/>
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">oleksii.nilha@nure.ua</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Account</MDBTypography>
                                                <MDBCardText
                                                    className="text-muted"
                                                    onClick={handleLogout}
                                                    style={{cursor: 'pointer', color: '#000000'}}
                                                >
                                                    LogOut
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        {/*<div className="d-flex justify-content-start">*/}
                                        {/*    <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg"/></a>*/}
                                        {/*    <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg"/></a>*/}
                                        {/*    <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg"/></a>*/}
                                        {/*</div>*/}
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
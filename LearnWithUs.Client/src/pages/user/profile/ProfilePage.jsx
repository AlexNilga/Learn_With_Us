import React, {useContext, useState, useEffect} from 'react';
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
    MDBBtn
} from 'mdb-react-ui-kit';
import {AuthContext} from '../../../api/AuthContext';
import adminAvatar from '../../../icons/admin-picture.png';
import userAvatar from '../../../icons/user-picture.jpg';
import {getUserData} from "../../../api/UserAPI";

export default function PersonalProfile() {
    const navigate = useNavigate();
    const {logoutContext, getId} = useContext(AuthContext);
    const userId = getId();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;
            try {
                const response = await getUserData(userId);
                if (response.success) {
                    setUserData(response.data);
                } else {
                    console.error("API error:", response.message);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        console.log("userData:", userData);
    }, [userData]);


    const handleLogout = () => {
        logoutContext();
        navigate('/');
    };

    function getIcon() {
        if (userData.role === 'Admin') {
            return adminAvatar;
        }
        return userAvatar;
    }

    if (!userData) {
        return (
            <section className="vh-100 d-flex justify-content-center align-items-center">
                <p>Loading profile…</p>
            </section>
        );
    }

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
                                        src={getIcon()}
                                        alt="Avatar" className="my-2" style={{width: '100px'}} fluid/>
                                    <MDBTypography tag="h5">Роль</MDBTypography>
                                    <MDBCardText>{userData.role}</MDBCardText>
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Інформація про користувача</MDBTypography>
                                        <hr className="mt-0 mb-4"/>
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography className="text-muted" tag="h6">Ім'я</MDBTypography>
                                                <MDBCardText>{userData.firstName}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography className="text-muted" tag="h6">Фамілія</MDBTypography>
                                                <MDBCardText>{userData.lastName}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr className="mt-0 mb-4"/>
                                        <MDBRow className="pt-1">
                                            <MDBCol size="8" className="mb-3">
                                                <MDBTypography className="text-muted" tag="h6">Email</MDBTypography>
                                                <MDBCardText>{userData.username}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <div className="d-flex justify-content-end mt-3">
                                            <MDBBtn color="dark" onClick={handleLogout}>
                                                Вийти
                                            </MDBBtn>
                                        </div>

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

// <MDBCol size="6" className="mb-3">
//     <MDBTypography tag="h6">Account</MDBTypography>
//     <MDBCardText
//         className="text-muted"
//         onClick={handleLogout}
//         style={{cursor: 'pointer', color: '#000000'}}
//     >
//         LogOut
//     </MDBCardText>
// </MDBCol>
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

export default function PersonalProfile() {
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
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
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                        style={{borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
                                    <MDBCardImage
                                        src="https://lh3.googleusercontent.com/pw/AP1GczP18t9vxYb11wJuylaGnhP4wadxikt_NNfTXFzMiIGW1c259iEApueCo6wm5Db1fiLIdmYBS6N5JsCc-5Nly7xSvG3Y0iXuyRawPz7dQHhruJ2vdIsjUzKaJedrIM9-4XtkjGEpa5Y9Gj0-KQi4FNDFUP-4D9iVHA5jhV1FN-Fzrz_9JkBA9sWXSD4JD9RlUkpMb3hT21m8B8ks-4gGRdjTStAs4i4WBFx5nLcIhbPKG4Sp8acX4uNTM-QwzNtn_-pqe-NaBEysoPCreH0y1qndy0_TNXoD6jsJosbuOh9wGbFLcTPYBEAMZf0SPUnT91_sImdLyM9xGAnyZjKi1amvAPiryoiWl3CmbvYuAlcDUgvtVKE9mAiIu7wIlOoLmIHiTKCeytW0wekwN2NXgDypiNqXXeMYtFQgwiyRfcjWna-ZqXxhB1HkPIwqt7O0JTR5Mo-m3F73GMI3i4tt84pdUpu9Ra8A-9n8dpmfjoUDbs8z1xFMM8cATJvK97ykv5d51j1-mO1HRD2aXmhh7ula2CnTY-OqFwirAT2xd1YVjzVCY8r2HJhUwRPh9TiGZbkDWWTPisWVX8lRkOxcYltSwLdSS56RFsY0_At4aqK2LY1eVyYHQWRyiWu9x9H8YIEhD8WxBeQBqVBHKkUEmyFF8UKvgVIbPs9W3r65tlpuDa-eyhJEW3PER6_5aGIz5C76HmNHZta-jIU0Q9qTgmKO-JaKIlLncxdcd8DkwNDVVdWhY4IyxZCz4X4qs0UOARaySFSVi6j9w6fGrmk1nv8oI5Ssu_QmOQJNKfivgPkttlU_W1rHzf2NGA7QqqkmhSJhrLO4yk54kudE14VvezTQlGB8-Dj_4KaKLFbvZo7JRwlgKNihP3eT4KMakezolY6VktrIHlhXrmDszqqZZHgVv7JcYQKPi1F3t8oCQSccFtWToAqjf0RvBSWHiY0zQGAewSoojMDUe3eP2jRJJJhd-LEy5ZDo7lYb=w678-h904-s-no-gm?authuser=0"
                                        alt="Avatar" className="my-5" style={{width: '170px'}} fluid/>
                                    <MDBTypography tag="h5">Alex Nilga</MDBTypography>
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
                                                    style={{cursor: 'pointer', color: '#dc3545'}}
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
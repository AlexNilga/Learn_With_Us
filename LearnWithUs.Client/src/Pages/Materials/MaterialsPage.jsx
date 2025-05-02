import './MaterialsPage.css'
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
import {Link, useParams} from "react-router-dom";

export default function MaterialsPage() {
    const params = useParams()
    return (
        <>
            <p className="text-center fs-1 mt-5">Учбові матеріали.</p>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4 p-5 align-items-center '>
                <MDBCol>
                    <Link to={`materials`} className="link-unstyled link-unstyled:link link-unstyled:hover">
                        <MDBCard className='h-100'>
                            <MDBCardImage
                                className='resized-img'
                                src='https://ua.kursoviks.com.ua/thumb/2/dyH-JsbR1C201ZuE8A2D-w/r/d/%D0%BF%D1%96%D0%B4%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B0_%D0%B4%D0%BE_%D0%BB%D0%B5%D0%BA%D1%86%D1%96%D1%97.jpg'
                                alt='...'
                                position='top'
                            />
                            <MDBCardBody>
                                <MDBCardTitle>Лекції</MDBCardTitle>
                                <MDBCardText>
                                    Цей розділ містить в собі лекції та інші текстові матеріали
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </Link>
                </MDBCol>
                <MDBCol>
                        <MDBCard className='h-100'>
                            <MDBCardImage
                                className='resized-img'
                                src='https://www.voxco.com/wp-content/uploads/2022/02/Research-Methodology-A-Guide-for-Beginners1.png'
                                alt='...'
                                position='top'
                            />
                            <MDBCardBody>
                                <MDBCardTitle>Методичні вказівки</MDBCardTitle>
                                <MDBCardText>
                                    Цей розділ містить в собі пояснення для виконня лабораторних робіт
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                </MDBCol>
                <MDBCol>
                        <MDBCard className='h-100'>
                            <MDBCardImage
                                className='resized-img'
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0mautYzihp0yy5QbzHSNQUj-HyPP3CDfHOQ&s'
                                alt='...'
                                position='top'
                            />
                            <MDBCardBody>
                                <MDBCardTitle>Записи Лекцій</MDBCardTitle>
                                <MDBCardText>
                                    Цей розділ містить в собі записи лекцій та інші відеоматеріали
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                </MDBCol>
            </MDBRow>
        </>
    )
}
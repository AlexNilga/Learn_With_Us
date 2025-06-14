import React, {useContext} from "react";
import './MainPage.css';
import {AuthContext} from "../../../api/AuthContext";


function MainPage() {
    const {role} = useContext(AuthContext);

    const courses = [
        {
            id: 1,
            title: "React",
            description: "Матеріали що стосуються курсу React."
        },
        {
            id: 2,
            title: "JavaScript",
            description: "Матеріали що стосуються курсу JavaScript."
        },
        {
            id: 3,
            title: "Node.js",
            description: "Основи Node.js та як з ним працювати"
        }]

    const files = [
        {
            id: 1,
            name: "Лекція 1. Основи React.pdf",
            description: "Вводна лекція",
            course: "React"
        },
        {
            id: 2,
            name: "Лекція 1. Основи JavaScript.pdf",
            description: "Продовження курсу JavaScript",
            course: "JavaScript"
        },
        {
            id: 3,
            name: "Лекція 2. Основи JavaScript.pdf",
            description: "Опис функцій JavaScript.",
            course: "JavaScript"
        },
        {
            id: 4,
            name: "Лекція 3. Основи JavaScript.pdf",
            description: "Опис методів JavaScript.",
            course: "JavaScript"
        }];
    return (
        <div className="welcome-page container py-4">
            <h1 className="mb-4">Привіт, Олексій</h1>

            <section className="mb-5">
                <h2>Нещодавно переглянуті курси</h2>
                <div className="d-flex flex-wrap">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <div key={course.id} className="card m-2" style={{width: "18rem"}}>
                                <div className="card-body">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <a href={`/courses/${course.id}`} className="btn btn-primary">
                                        Перейти до курсу
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">You have no recently accessed courses.</p>
                    )}
                </div>
            </section>

            <section>
                <h2>Нещодавно завантажені файли</h2>
                {files.length > 0 ? (
                    <ul className="list-group">
                        {files.map(file => (
                            <li key={file.id}
                                className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    {file.name}
                                </div>
                                <small className="text-muted">{file.course}</small>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">You have no recently accessed files.</p>
                )}
            </section>
        </div>
    );
}


export default MainPage;

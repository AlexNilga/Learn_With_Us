import React, {useEffect, useState} from "react"
import SubjectUI from "../../componets/Subjects/SubjectUI";

import { getCategories } from "../../api/CategoryAPI";
import "./Categories.css"



function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState("");

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true);
            const result = await getCategories();
            if (result.success) {
                setCategories(result.data);
            } else {
                setError(result.message || "Failed to load categories");
            }
            setLoading(false);
        }

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-5">
                <spinner animation="border" role="status" />
            </div>
        );
    }

    if (error) {
        return (
            <alert variant="danger" className="my-5">
                {error}
            </alert>
        );
    }

    return (
        // <Row xs={1} md={5} className="g-4 p-5">
        //     {categories.map((category) => (
        //         <Col key={category.id}>
        //             <SubjectUI data={category} />
        //         </Col>
        //     ))}
        // </Row>

        <div className="category-cards">
            {categories.map((category) => (
                <article key={category.id} className="information category-card">
                    <span className="tag">Subject</span>
                    <h2 className="title">{category.name}</h2>
                    <p className="info">{category.description}</p>
                    <button className="button">
                        <span>Learn more</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                             fill="none">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor"/>
                        </svg>
                    </button>
                </article>
            ))}
        </div>
    );
}

export default CategoriesPage;

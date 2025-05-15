import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";

import "./Categories.css"
import {getCategories} from "../../api/CategoryAPI";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [parentId, setParentId] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchCategories(id) {
        setError("");
        setLoading(true);

        const result = await getCategories(id);
        if (result.success) {
            setCategories(result.data);
        } else {
            setError(result.message || "Failed to load categories");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCategories(parentId)
    }, [parentId]);

    const handleLearnMore = async categoryId => {
        const category = categories.find(c => c.id === categoryId);
        console.log(category);
        setParentId(categoryId);
    };

    if (loading) {
        return (
            <div className="loading">
                <spinner animation="border" role="status"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                {error}
            </div>
        );
    }

    return (
        <div className="category-cards">
            {categories.map((category) => (
                <article key={category.id} className="information category-card">
                    <span className="tag">Subject</span>
                    <h2 className="title">{category.name}</h2>
                    <p className="info">{category.description}</p>
                    <button className="button" onClick={() => handleLearnMore(category.id)}>
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

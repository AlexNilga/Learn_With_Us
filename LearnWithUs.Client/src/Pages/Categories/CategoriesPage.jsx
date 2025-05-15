import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";

import "./Categories.css"
import {getCategories} from "../../api/CategoryAPI";
import {getContent} from "../../api/ContentAPI";
import {logDOM} from "@testing-library/react";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState([]);
    const [parentId, setParentId] = useState(null)

    const [loading, setLoading] = useState(true);
    const [errorCategories, setErrorCategories] = useState("");
    const [errorContent, setErrorContent] = useState("");

    async function fetchCategories(id) {
        setErrorCategories("");
        setLoading(true);

        const result = await getCategories(id);
        if (result.success) {
            setCategories(result.data);
        } else {
            setErrorCategories(result.message || "Failed to load categories");
        }
        setLoading(false);
    }

    async function fetchContent(id) {
        setErrorContent("");
        setLoading(true);

        const result = await getContent(id);
        console.log(result);
        if (result.success) {
            setContent(result.data);
        } else {
            setErrorContent(result.message || "Failed to load categories");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCategories(parentId)
        fetchContent(parentId)
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

    if (errorCategories || errorContent) {
        return (
            <div className="error">
                {errorCategories}
                {errorContent}
            </div>
        );
    }

    return (<div>
            {
                content ? (
                        <div className="content-card-container">
                            {content.map((file) =>
                                <div key={file.id} className="content-card">
                                    <div className="content-name">{file.name}</div>
                                    <div className="content-description">{file.description}</div>
                                    <button className="download-file">download</button>
                                </div>
                            )}
                        </div>
                    )
                    : (
                        <div className="no-content">No content available.</div>
                    )
            }
            {
                categories ? (
                    <div className="category-cards">
                        {categories.map((category) =>
                            <article key={category.id} className="information category-card">
                                <span className="tag">Subject</span>
                                <h2 className="title">{category.name}</h2>
                                <p className="info">{category.description}</p>
                                <button className="button" onClick={() => handleLearnMore(category.id)}>
                                    <span>Learn more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                                         width="24px"
                                         fill="none">
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor"/>
                                    </svg>
                                </button>
                            </article>
                        )}
                    </div>
                ) : (
                    <div className="no-categories">No categories available.</div>
                )}
        </div>
    );
}

export default CategoriesPage;

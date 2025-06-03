import React, {useEffect, useState} from "react"

import "./CategoriesPage.css"
import {getCategories} from "../../../api/CategoryAPI";
import {getContent} from "../../../api/ContentAPI";
import Content from "../../../components/content/Content";
import Categories from "../../../components/сategories/Categories";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState([]);
    const [parentId, setParentId] = useState(0)

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
        console.log("fetchContent:", result);
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
                loading
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

    return (
        <>
            <div className="main-content">
                {
                    categories.length > 0 ? (
                        <Categories
                            categories={categories}
                            onLearnMore={handleLearnMore}
                            loading={loading}
                        />
                    ) : (
                        <div className="no-categories">No categories available.</div>
                    )}
                {
                    content.length > 0 ? (
                            <Content
                                content={content}
                                loading={loading}/>
                        )
                        : (
                            <div className="no-content">No content available.</div>
                        )
                }
            </div>
        </>
    );
}

export default CategoriesPage;

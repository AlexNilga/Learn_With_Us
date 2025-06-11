import React, {useEffect, useState} from "react"

import "./CoursesPage.css"
import {getCategories, getCategoryById} from "../../../api/CategoryAPI";
import {getContent} from "../../../api/ContentAPI";
import Content from "../../../components/content/Content";
import Categories from "../../../components/сategories/Categories";
import {useNavigate, useParams} from "react-router-dom";

function CoursesPage() {
    const navigate = useNavigate();

    const {parentId = "0"} = useParams();
    const pid = Number(parentId);

    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState([]);
    const [currentCategoryName, setCurrentCategoryName] = useState("Доступні курси");

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
        async function fetchCategoryName() {
            if (pid === 0) {
                setCurrentCategoryName("Доступні курси");
            } else {
                const result = await getCategoryById(pid);
                if (result.success) {
                    setCurrentCategoryName(result.data.name);
                } else {
                    setCurrentCategoryName("Доступні курси");
                }
            }
        }

        fetchCategoryName();
    }, [pid]);

    useEffect(() => {
        fetchCategories(pid)
        fetchContent(pid)
    }, [pid]);

    const handleLearnMore = categoryId => {
        navigate(`/categories/${categoryId}`);
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
            <h2 className="current-category-title">{currentCategoryName}</h2>
            <div className="main-content">
                {
                    categories.length > 0 ? (
                        <Categories
                            categories={categories}
                            onLearnMore={handleLearnMore}
                            loading={loading}
                        />
                    ) : (
                        <div className="no-categories"></div>
                    )}
                {
                    content.length > 0 ? (
                            <Content
                                content={content}
                                pid={pid}
                                loading={loading}/>
                        )
                        : (
                            <div className="no-content"></div>
                        )
                }
            </div>
        </>
    );
}

export default CoursesPage;
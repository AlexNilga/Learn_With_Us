import React, {useEffect, useState} from "react"

import "./CategoriesPage.css"
import {getCategories} from "../../api/CategoryAPI";
import {getContent} from "../../api/ContentAPI";
import Content from "../../components/Content/Content";
import Categories from "../../components/Categories/Categories";

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
        // // <main className="bg-light rounded shadow-sm ">
        //     <div className="container p-lg-2 bg-danger">
        //         <div className="row p-lg-1">
        //             <div className="col-3 p-1 bg-info">
        //                 {
        //                     categories.length > 0 ? (
        //                         <Categories
        //                             categories={categories}
        //                             onLearnMore={handleLearnMore}
        //                             loading={loading}
        //                         />
        //                     ) : (
        //                         <div className="no-categories">No categories available.</div>
        //                     )}
        //             </div>
        //             <div className="col-9 p-1 bg-success">
        //                 {
        //                     content.length > 0 ? (
        //                             <Content
        //                                 content={content}
        //                                 loading={loading}/>
        //                         )
        //                         : (
        //                             <div className="no-content">No content available.</div>
        //                         )
        //                 }
        //             </div>
        //         </div>
        //     </div>
        //     <div class="card border-success mb-3" style="max-width: 18rem;">
        //         <div class="card-header bg-transparent border-success">Header</div>
        //         <div class="card-body text-success">
        //             <h5 class="card-title">Success card title</h5>
        //             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
        //         </div>
        //         <div class="card-footer bg-transparent border-success">Footer</div>
        //     </div>
        //     </main>
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

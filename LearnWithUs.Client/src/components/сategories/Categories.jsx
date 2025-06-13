import React, {useContext, useEffect, useState} from 'react';
import './Categories.css';
import {AuthContext} from "../../api/AuthContext";


const Categories = ({categories, onLearnMore, loading}) => {
    const {role} = useContext(AuthContext);

    // // keep a local copy so we can append new ones immediately
    // const [localCategories, setLocalCategories] = useState(categories);
    // useEffect(() => {
    //     setLocalCategories(categories);
    // }, [categories]);
    //
    // // new category form state
    // const [newName, setNewName] = useState('');
    // const [newDescription, setNewDescription] = useState('');
    // const [creating, setCreating] = useState(false);
    //
    // const handleCreate = async () => {
    //     if (!newName.trim()) {
    //         alert('Please enter a category name');
    //         return;
    //     }
    //     setCreating(true);
    //     const result = await createCategory({ name: newName, description: newDescription });
    //     setCreating(false);
    //     if (result.success) {
    //         setLocalCategories(prev => [...prev, result.data]);
    //         setNewName('');
    //         setNewDescription('');
    //     } else {
    //         alert(result.message || 'Failed to create category');
    //     }
    // };

    if (loading) {
        return (
            <div className="loading">
                loading
            </div>
        );
    }

    if (categories.length === 0) {
        return <div className="no-categories">No categories available.</div>;
    }

    //an expandable text component
    function ExpandableCategoryDescription({ text }) {
        const [expandedDescription, setExpandedDescription] = useState(false);

        // split on punctuation followed by space
        const sentences = text.split(/(?<=[.?!])\s+/);
        const first = sentences[0] || "";

        return (
            <p
                className="info"
                style={{ cursor: sentences.length > 1 ? 'pointer' : 'default' }}
                onClick={() => {
                    if (sentences.length > 1) setExpandedDescription(e => !e);
                }}
            >
                {expandedDescription ? text : first + (sentences.length > 1 ? '...' : '')}
                {sentences.length > 1 && (
                    <span className="toggle">
          {expandedDescription ? ' Read less' : ' Read more'}
        </span>
                )}
            </p>
        );
    }

    return (
        <>
            <hr/>
            <details className="category-block" open>
                <summary className="category-header">Курси</summary>
                <div className="category-cards">
                    {categories.map(category => (
                        <article key={category.id} className="category-card">
                            <div className="card-info">
                                <i className="fas fa-folder-open"></i>
                                <div>
                                    <h2 className="name">{category.name}</h2>
                                    <ExpandableCategoryDescription text={category.description} />
                                </div>
                            </div>
                            <div className="actions">
                                <button
                                    className="learn-button"
                                    onClick={() => onLearnMore(category.id)}
                                >
                                    Відкрити
                                </button>
                                {role === 'Admin' && (
                                    <div className="icons-container">
                                        <button className="icon-button">
                                            <i className="fas fa-pencil-alt fa-sm"></i>
                                        </button>
                                        <button className="icon-button">
                                            <i className="fas fa-trash-alt fa-sm"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </details>
            <hr/>
        </>
    );
};

export default Categories;
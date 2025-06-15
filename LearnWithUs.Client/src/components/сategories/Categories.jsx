import React, {useContext, useEffect, useMemo, useState} from 'react';
import './Categories.css';
import {AuthContext} from "../../api/AuthContext";


const Categories = ({categories, onLearnMore, loading}) => {
    const {role} = useContext(AuthContext);

    const [sortOption, setSortOption] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);  //toggle state


// derive a sorted list based on sortOption
    const sortedCategories = useMemo(() => {
        const arr = [...categories];
        switch (sortOption) {
            case 'alpha':
                return arr.sort((a, b) => a.name.localeCompare(b.name));
            case 'alphaReverse':
                return arr.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return arr;
        }
    }, [categories, sortOption]);

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
    function ExpandableCategoryDescription({text}) {
        const [expandedDescription, setExpandedDescription] = useState(false);

        // split on punctuation followed by space
        const sentences = text.split(/(?<=[.?!])\s+/);
        const first = sentences[0] || "";

        return (
            <p
                className="info"
                style={{cursor: sentences.length > 1 ? 'pointer' : 'default'}}
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
                <summary className="category-header">
                    Курси
                    <select
                        className="sort-select"
                        value={sortOption}
                        onChange={e => setSortOption(e.target.value)}
                    >
                        <option value="">Сортувати</option>
                        <option value="alpha">За назвою ↑</option>
                        <option value="alphaReverse">За назвою ↓</option>
                    </select>
                </summary>
                <div className="category-cards">
                    {role === 'Admin' && (
                        <div className="admin-add-toggle">
                            {/** only show the “open form” button when the form is closed */}
                            {!showAddForm && (
                                <button
                                    className="btn btn-success add-btn"
                                    onClick={() => setShowAddForm(true)}
                                >
                                    Додати категорію
                                </button>
                            )}

                            {showAddForm && (
                                <div className="category-add-form">
                                    <input
                                        type="text"
                                        placeholder="Назва категорії"
                                        className="category-input"
                                    />
                                    <textarea
                                        placeholder="Опис катогорії"
                                        className="category-textarea"
                                        rows="3"
                                    />

                                    {/** wrap cancel + submit in a row */}
                                    <div className="form-actions">
                                        <button
                                            className="btn btn-danger cancel-btn"
                                            onClick={() => setShowAddForm(false)}
                                        >
                                            Відмінити
                                        </button>
                                        <button className="btn btn-success category-submit-btn">
                                            Додати категорію
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    )}

                    {sortedCategories.map(category => (
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
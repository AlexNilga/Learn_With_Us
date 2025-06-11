import React, {useContext} from 'react';
import './Categories.css';
import {AuthContext} from "../../api/AuthContext";


const Categories = ({categories, onLearnMore, loading}) => {
    const {role} = useContext(AuthContext);

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
                                    <p className="info">{category.description}</p>
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
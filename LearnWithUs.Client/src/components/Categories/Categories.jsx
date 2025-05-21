import React from 'react';
import './Categories.css';
const Categories = ({categories, onLearnMore, loading}) => {
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

    return (<>
        <div className="category-header">Предмети</div>
        <div className="category-cards">

            {categories.map((category) => (
                <article key={category.id} className="information category-card">
                    <span className="tag">Subject</span>
                    <h2 className="title">{category.name}</h2>
                    <p className="info">{category.description}</p>
                    <button className="button" onClick={() => onLearnMore(category.id)}>
                        <span>Learn more</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                             width="24px"
                             fill="none">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor"/>
                        </svg>
                    </button>
                </article>
            ))}
        </div>
            <hr/>
        </>
    );
};

export default Categories;
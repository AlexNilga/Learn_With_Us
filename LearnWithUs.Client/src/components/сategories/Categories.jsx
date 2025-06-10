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
            <details className="category-block" open>
                <summary className="category-header">Курси</summary>
                <div className="category-cards">
                    {categories.map(cat => (
                        <article key={cat.id} className="category-card">
                            <div className="card-info">
                                <i className="fas fa-folder-open"></i>
                                <div>
                                    <h2 className="name">{cat.name}</h2>
                                    <p className="info">{cat.description}</p>
                                </div>
                            </div>
                            <div className="actions">
                                <button
                                    className="learn-button"
                                    onClick={() => onLearnMore(cat.id)}
                                >
                                    Learn more
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
            <hr />
        </>





        // <>
        //     <div className="category-header">Предмети</div>
        //     <div className="category-cards">
        //         {categories.map((category) => (
        //             <article key={category.id} className="information category-card">
        //                 <span className="tag">Subject</span>
        //                 <h2 className="title">{category.name}</h2>
        //                 <p className="info">{category.description}</p>
        //                 <button className="button" onClick={() => onLearnMore(category.id)}>
        //                     <span>Learn more</span>
        //                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
        //                          width="24px"
        //                          fill="none">
        //                         <path d="M0 0h24v24H0V0z" fill="none"/>
        //                         <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor"/>
        //                     </svg>
        //                 </button>
        //
        //                 {role === "Admin" && (
        //                     <div className="icons-container">
        //                         <button className="icon-button">
        //                             <i className="fas fa-pencil-alt fa-sm"></i>
        //                         </button>
        //                         <button className="icon-button">
        //                             <i className="fas fa-trash-alt fa-sm"></i>
        //                         </button>
        //                     </div>
        //                 )}
        //
        //             </article>
        //         ))}
        //     </div>
        //     <hr/>
        // </>
    );
};

export default Categories;
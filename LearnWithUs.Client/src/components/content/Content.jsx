import React, {useContext} from 'react';
import './Content.css';
import {downloadFile} from "../../api/ContentAPI";
import {AuthContext} from "../../api/AuthContext";

const Content = ({content, loading}) => {
    const {role} = useContext(AuthContext);

    if (loading) {
        return (
            <div className="loading">
                loading
            </div>
        );
    }

    return (<>
            <details className="content-block" open>
                <summary className="content-header">Матеріали</summary>
                <div className="content-cards">
                    {content.map(file => (
                        <article key={file.id} className="content-card">
                            <div className="file-info">
                                <i className="fa fa-file"/>
                                <div>
                                    <h2 className="name">{file.name}</h2>
                                    <p className="info">{file.description}</p>
                                </div>
                            </div>
                            <div className="actions">
                                <button
                                    className="download-button"
                                    onClick={() => downloadFile(file.id)}
                                >
                                    Download
                                </button>
                                {role === 'Admin' && (
                                    <div className="icons-container">
                                        <button className="icon-button">
                                            <i className="fas fa-pencil-alt fa-sm"/>
                                        </button>
                                        <button className="icon-button">
                                            <i className="fas fa-trash-alt fa-sm"/>
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

export default Content;
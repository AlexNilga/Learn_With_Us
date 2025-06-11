import React, {useContext, useEffect, useState} from 'react';
import {deleteFile, downloadFile} from "../../api/ContentAPI";
import {AuthContext} from "../../api/AuthContext";

import './Content.css';

const Content = ({content, loading}) => {
    const {role} = useContext(AuthContext);
    const [files, setFiles] = useState(content);

    useEffect(() => {
        setFiles(content);
    }, [content]);

    const handleDelete = async (fileId) => {
        const result = await deleteFile(fileId);
        if (result.success) {
            // filter out the deleted file
            setFiles((prev) => prev.filter((f) => f.id !== fileId));
        } else {
            alert(result.message || 'Failed to delete file');
        }
    };

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
                    {files.map(file => (
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
                                        <button
                                            className="icon-button"
                                            onClick={() => handleDelete(file.id)}
                                        >
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
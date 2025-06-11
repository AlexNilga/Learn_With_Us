import React, {useContext, useEffect, useState} from 'react';
import {deleteFile, downloadFile, uploadFile} from "../../api/ContentAPI";
import {AuthContext} from "../../api/AuthContext";

import './Content.css';

const Content = ({content, pid, loading}) => {
    const {role} = useContext(AuthContext);
    const [files, setFiles] = useState(content);
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');


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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0] || null);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }
        const result = await uploadFile(pid, description, selectedFile);
        if (result.success) {
            setFiles(prev => [...prev, result.data]);
            setSelectedFile(null);
        } else {
            alert(result.message);
        }
    };

    // TODO: replace with real comments UI (modal, side-panel, etc.)
    const handleShowComments = (fileId) => {
        console.log(`Show comments for file ${fileId}`);
    };


    if (loading) {
        return (
            <div className="loading">
                loading
            </div>
        );
    }
    // NEW: an expandable text component
    function ExpandableDescription({ text }) {
        const [expanded, setExpanded] = useState(false);

        // split on punctuation followed by space
        const sentences = text.split(/(?<=[.?!])\s+/);
        const first = sentences[0] || "";

        return (
            <p
                className="info"
                style={{ cursor: sentences.length > 1 ? 'pointer' : 'default' }}
                onClick={() => {
                    if (sentences.length > 1) setExpanded(e => !e);
                }}
            >
                {expanded ? text : first + (sentences.length > 1 ? '...' : '')}
                {sentences.length > 1 && (
                    <span className="toggle">
          {expanded ? ' Read less' : ' Read more'}
        </span>
                )}
            </p>
        );
    }


    return (<>
            <details className="content-block" open>
                <summary className="content-header">Матеріали</summary>

                <div className="content-cards">

                    {role === 'Admin' && (
                        <article className="content-card upload-card">
                            <div className="file-info">
                                <i className="fa fa-upload upload-icon"/>
                                <div>
                                    <h2 className="name">Новий файл</h2>
                                </div>
                            </div>
                            <div className="actions upload-actions">
                                <input
                                    type="text"
                                    className="upload-description"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                                <input
                                    type="file"
                                    className="upload-file"
                                    onChange={handleFileChange}
                                />
                                <button
                                    className="upload-button"
                                    onClick={handleUpload}
                                    disabled={!selectedFile}
                                >
                                    Завантажити
                                </button>
                            </div>
                        </article>
                    )}


                    {files.map(file => (
                        <article key={file.id} className="content-card">
                            <div className="file-info">
                                <i className="fa fa-file"/>
                                <div>
                                    <h2 className="name">{file.name}</h2>
                                    <ExpandableDescription text={file.description} />
                                </div>
                            </div>
                            <div className="actions">
                                <button
                                    className="download-button"
                                    onClick={() => downloadFile(file.id)}
                                >
                                    Загрузити
                                </button>
                                {/* new comments button */}
                                <button
                                    className="comments-button"
                                    onClick={() => handleShowComments(file.id)}
                                >
                                    <i className="fas fa-comments"/> Коментарі
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
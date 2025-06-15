import React, {useContext, useEffect, useState} from 'react';
import {deleteFile, downloadFile, uploadFile} from "../../api/ContentAPI";
import {AuthContext} from "../../api/AuthContext";
import './Content.css';
import Comments from "../comments/Comments";

const Content = ({content, pid, loading}) => {
    const {role} = useContext(AuthContext);
    const [files, setFiles] = useState(content);
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [visibleCommentsId, setVisibleCommentsId] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);

    useEffect(() => {
        setFiles(content);
    }, [content]);

    const sortedFiles = React.useMemo(() => {
        const arr = [...files];
        switch (sortOption) {
            case 'alpha':
                return arr.sort((a, b) => a.name.localeCompare(b.name));
            case 'alphaReverse':
                return arr.sort((a, b) => b.name.localeCompare(a.name));
            case 'type':
                return arr.sort((a, b) => {
                    const extA = a.name.split('.').pop().toLowerCase();
                    const extB = b.name.split('.').pop().toLowerCase();
                    return extA.localeCompare(extB);
                });
            case 'typeReverse':
                return arr.sort((a, b) => {
                    const extA = a.name.split('.').pop().toLowerCase();
                    const extB = b.name.split('.').pop().toLowerCase();
                    return extB.localeCompare(extA);
                });
            default:
                return arr;
        }
    }, [files, sortOption]);

    const handleDelete = async (fileId) => {
        const result = await deleteFile(fileId);
        if (result.success) {
            setFiles(prev => prev.filter(f => f.id !== fileId));
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
            setDescription('');
            setShowUploadForm(false);
        } else {
            alert(result.message);
        }
    };

    function ExpandableContentDescription({text}) {
        const [expandedContent, setExpandedContent] = useState(false);
        const sentences = text.split(/(?<=[.?!])\s+/);
        const first = sentences[0] || "";
        return (
            <p
                className="info"
                style={{cursor: sentences.length > 1 ? 'pointer' : 'default'}}
                onClick={() => {
                    if (sentences.length > 1) setExpandedContent(e => !e);
                }}
            >
                {expandedContent ? text : first + (sentences.length > 1 ? '...' : '')}
                {sentences.length > 1 && (
                    <span className="toggle">
                        {expandedContent ? ' Read less' : ' Read more'}
                    </span>
                )}
            </p>
        );
    }

    const handleCommentsClick = (fileId) => {
        setVisibleCommentsId(prev => (prev === fileId ? null : fileId));
    };

    return (
        <>
            <details className="content-block" open>
                <summary className="content-header">
                    Матеріали
                    <div className="sort-container">
                        <select
                            value={sortOption}
                            onChange={e => setSortOption(e.target.value)}
                        >
                            <option value="">Сортувати</option>
                            <option value="alpha"> За назвою ↑</option>
                            <option value="alphaReverse">За назвою ↓</option>
                            <option value="type">Тип файлу ↑</option>
                            <option value="typeReverse">Тип файлу ↓</option>
                        </select>
                    </div>
                </summary>
                <div className="content-cards">
                    {role === 'Admin' && !showUploadForm && (
                        <button
                            className="btn btn-success add-file-button"
                            onClick={() => setShowUploadForm(true)}
                        >
                            Додати файл
                        </button>
                    )}
                    {role === 'Admin' && showUploadForm && (
                        <article className="content-card upload-card">
                            <div className="file-info">
                                <i className="fa fa-upload upload-icon"/>
                                <div>
                                    <h2 className="name">Новий файл</h2>
                                </div>
                            </div>
                            <div className="actions upload-actions">
                                <textarea
                                    rows="3"
                                    className="upload-description"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="upload-file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="file-upload" className="upload-file-label">
                                    <i className="fa fa-paperclip"></i> Вибрати файл
                                </label>
                                <button
                                    className="upload-button"
                                    onClick={handleUpload}
                                    disabled={!selectedFile}
                                >
                                    Загрузити
                                </button>
                                <button
                                    className="cancel-upload-button"
                                    onClick={() => setShowUploadForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </article>
                    )}
                    {sortedFiles.map(file => (
                        <div key={file.id}>
                            <article className="content-card">
                                <div className="file-info">
                                    <i className="fa fa-file"/>
                                    <div>
                                        <h2 className="name">{file.name}</h2>
                                        <ExpandableContentDescription text={file.description}/>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button
                                        className="download-button"
                                        onClick={() => downloadFile(file.id)}
                                    >
                                        Завантажити
                                    </button>
                                    <button
                                        className="comments-button"
                                        onClick={() => handleCommentsClick(file.id)}
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
                                                onClick={() => {
                                                    if (window.confirm(`Ви впевнені що ви хочете видалити цей файл? ${file.name}`)) {
                                                        handleDelete(file.id);
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-trash-alt fa-sm"/>
                                            </button>

                                        </div>
                                    )}
                                </div>
                            </article>
                            {visibleCommentsId === file.id && <Comments/>}
                        </div>
                    ))}
                </div>
            </details>
            <hr/>
        </>
    );
};

export default Content;
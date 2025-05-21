import React from 'react';
import './Content.css';

const Content = ({content, loading}) => {
    if (loading) {
        return (
            <div className="loading">
                loading
            </div>
        );
    }

    return (<>
            <div className="content-header">Матеріали</div>
            <div className="content-card-container">
                {content.map((file) =>
                    <div key={file.id} className="content-card">
                        <div className="content-name">{file.name}</div>
                        <div className="content-description">{file.description}</div>
                        <button className="download-file">download</button>
                    </div>
                )}
            </div>
            <hr/>
        </>
    );
};

export default Content;
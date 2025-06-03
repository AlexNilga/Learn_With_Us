import React from 'react';
import './Content.css';
import {downloadFile} from "../../api/ContentAPI";

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
            <div className="content-cards">
                {content.map((file) =>
                    <article key={file.id} className="information content-card">
                        {/*<i className="fa fa-file"></i>*/}
                        <h2 className="name">{file.name}</h2>
                        {/*<p className="info">{file.description}</p>*/}
                        <button className="button" onClick={() => downloadFile(file.id)}>
                            <span>download</span>
                        </button>
                    </article>
                )}
            </div>
            <hr/>
        </>
    );
};

export default Content;
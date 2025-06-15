import React, {useContext} from 'react';
import {AuthContext} from '../../api/AuthContext';
import './Comments.css';
// static comments to display
const staticComments = [
    {id: 1, author: 'Марія Шевченко', text: 'Дуже цікавий урок, але хотіла б більше дізнатись про цю тему'},
    {id: 2, author: 'Степан Котов', text: 'Як на мене забагато приділено уваги не тим речам'},
    {id: 3, author: 'Євген Вілкінс', text: 'Я вважаю що це один з кращіх уроків'}
];
const Comments = () => {
    const {role} = useContext(AuthContext);

    return (
        <div className="comments-container">
            <h4>Коментарі</h4>
            <div className="comment-form">
                <textarea
                    className="comment-input"
                    placeholder="Напишіть коментар..."
                />
                <button
                    type="button"
                    className="comment-submit-button"
                >
                    Додати коментар
                </button>
            </div>

            {staticComments.map(c => (
                <div key={c.id} className="comment">
                    <strong>{c.author}</strong>
                    <p>{c.text}</p>
                    {role === 'Admin' && (
                        <button className="delete-comment-button" title="Delete comment">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Comments;
import React, {useState} from 'react';
import './UsersPage.css';

const initialUsers = [
    {id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com'},
    {id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com'},
    {id: 3, firstName: 'Carol', lastName: 'Williams', email: 'carol@example.com'},
];

export default function UsersList() {
    const [users, setUsers] = useState(initialUsers);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({firstName: '', lastName: '', email: ''});

    const startEdit = (user) => {
        setEditingId(user.id);
        setEditData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({firstName: '', lastName: '', email: ''});
    };

    const saveEdit = (id) => {
        setUsers(users.map(u =>
            u.id === id ? {...u, ...editData} : u
        ));
        cancelEdit();
    };

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
            if (editingId === id) cancelEdit();
        }
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditData(prev => ({...prev, [name]: value}));
    };

    return (
        <div className="users-list">
            <h2>Users</h2>
            <ul className="users-list__list">
                {users.map(user => (
                    <li key={user.id} className="users-list__item">
                        {editingId === user.id ? (
                            <div className="users-list__edit-form">
                                <input
                                    name="firstName"
                                    value={editData.firstName}
                                    onChange={handleChange}
                                    placeholder="First name"
                                />
                                <input
                                    name="lastName"
                                    value={editData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last name"
                                />
                                <input
                                    name="email"
                                    value={editData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                <button
                                    className="btn--save"
                                    onClick={() => saveEdit(user.id)}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn--cancel"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="users-list__info">
                  <span className="users-list__name">
                    {user.firstName} {user.lastName}
                  </span>
                                    <span className="users-list__email">
                    {user.email}
                  </span>
                                </div>
                                <div className="users-list__actions">
                                    <button
                                        className="icon-button"
                                        onClick={() => startEdit(user)}
                                    >
                                        <i className="fas fa-pencil-alt fa-sm"></i>
                                    </button>
                                    <button
                                        className="icon-button"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        <i className="fas fa-trash-alt fa-sm"></i>
                                    </button>
                                </div>

                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

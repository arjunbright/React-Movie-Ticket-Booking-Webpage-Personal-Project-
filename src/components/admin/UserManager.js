// UserManager.js (fixed to use sessionStorage, no axios)
import React, { useEffect, useState } from "react";
import "./UserManager.css";

const UserManager = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem("users")) || [];
        setUsers(stored);
    }, []);

    return (
        <div className="user-manager">
            <h3>User Management</h3>
            <ul className="user-list">
                {users.map((user, index) => (
                    <li key={index}>
                        {user.firstName} {user.lastName} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManager;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://nestadminbackend.onrender.com/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Users</h1>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">Email: {user.email}</p>
                        <p className="text-gray-600">Username: {user.username}</p>
                        <p className="text-gray-600">Role: {user.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
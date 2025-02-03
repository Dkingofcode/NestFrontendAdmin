import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminFeatures = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Features</h2>
            <ul className="list-disc list-inside">
                <li className="mb-2">User Management</li>
                <li className="mb-2">System Settings</li>
                <li className="mb-2">Reports</li>
                <li className="mb-2">Logs</li>
            </ul>
        </div>
    );
};

const AdminPanel = () => {
    const { user } = useContext(AuthContext);

    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <AdminFeatures />
        </div>
    );
};

export default AdminPanel;

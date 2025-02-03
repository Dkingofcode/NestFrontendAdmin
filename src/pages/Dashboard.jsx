import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Dashboard = () => {
    const [user, setUser] = useState({ name: '', role: 'Intern', id: '' }); // Default user state
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]); // Dummy tasks state
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode.decode(token); // Decode token
            return decodedToken ? decodedToken.userId : null; // Extract user ID from token
        }
        return null;
    };

     // Dummy tasks for demonstration
     const fetchTasks = () => {
        const dummyTasks = [
            { id: 1, title: 'Complete project report', status: 'In Progress', description: 'Work on the final report for the current project.' },
            { id: 2, title: 'Attend team meeting', status: 'Completed', description: 'Participate in the team meeting to discuss project updates.' },
            { id: 3, title: 'Fix bug in dashboard', status: 'Pending', description: 'Resolve the issue where data is not rendering correctly in the dashboard.' },
            { id: 4, title: 'Code review for feature A', status: 'In Progress', description: 'Review code for feature A implementation.' },
            { id: 5, title: 'Test new feature', status: 'Pending', description: 'Test the newly implemented feature for any issues.' },
        ];
        setTasks(dummyTasks);
    };
    
    
    const userId = getUserIdFromToken();
    
//    const userId = 'c99f49d1-842b-43b1-8a90-f12e990b3613'; // Replace this with dynamic user ID logic (e.g., from local storage or auth context)

    useEffect(() => {
        // Fetch user details based on user ID dynamically
        fetchTasks();
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`https://nestadminbackend.onrender.com/api/users/${userId}`); // Fetch user details with dynamic ID
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]); // Fetch user details when userId changes
    
    
    const handleUsers = () => {
        navigate('/users');
    };

    const handleAdmin = () => {
        navigate("/admin");
    };

    const handleAnalytics = () => {
        navigate("/analytics");
    };

    const renderContent = () => {
        switch (user.role) {
            case 'ADMIN':
                return <div>Welcome, Admin! Here you can manage users and view analytics.</div>;
            case 'ENGINEER':
                return <div>Welcome, Engineer! You have access to development resources and tasks.</div>;
            case 'INTERN':
            default:
                return <div>Welcome, Intern! You can view your learning progress and tasks.</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <nav className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-center font-bold text-xl border-b border-gray-700">
                    Dashboard
                </div>
                <div className="flex-1 p-4">
                    <ul>
                        {user.role === 'ADMIN' && (
                            <li className="mb-4" onClick={handleUsers}>
                                <a href="#" className="block p-2 rounded hover:bg-gray-700">Users</a>
                            </li>
                        )}
                        <li className="mb-4" onClick={handleAdmin}>
                            <a href="#" className="block p-2 rounded hover:bg-gray-700">Admin Panel</a>
                        </li>
                        <li className="mb-4" onClick={handleAnalytics}>
                            <a href="#" className="block p-2 rounded hover:bg-gray-700">Analytics</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <div className="text-lg font-medium">{user.name ? `Hello, ${user.name}` : 'Hello, User'}</div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                </header>
                <div className="p-6 bg-white rounded-md shadow-md">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Role: {user.role}</h2>
                        <p className="text-sm text-gray-600">Here's a personalized experience just for you!</p>
                    </div>
                    <div className="text-lg">{renderContent()}</div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div key={task.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
                                    <h3 className="text-xl font-semibold">{task.title}</h3>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                    <div className={`mt-2 p-2 inline-block rounded-full text-white ${
                                        task.status === 'In Progress' ? 'bg-yellow-500' :
                                        task.status === 'Completed' ? 'bg-green-500' :
                                        'bg-gray-500'}`}>
                                        {task.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

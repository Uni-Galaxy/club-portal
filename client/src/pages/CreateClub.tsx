import React, { useState, useEffect } from 'react';

function CreateClub() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        logo_url: '',
        club_email: '',
        president: '',
        president_email: '',
        president_phone: '',
        membership_form_url: '',
        accepting_members: true,
        website_url: '',
        club_account_id: '',
    });

    // Fetch users from /users/ endpoint
    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
        if (token) {

            fetch(`${import.meta.env.VITE_API_URL}/users/`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                },
            })
                .then((response) => response.json())
                .then((data) => setUsers(data))
                .catch((error) => console.error('Error fetching users:', error));
        }
    }, []);

    // Handle input changes
    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken'); // Get the token again for submission
        if (token) {
            fetch(`${import.meta.env.VITE_API_URL}/clubs/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Club created:', data);
                    // Reset form or show success message
                })
                .catch((error) => console.error('Error creating club:', error));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6">Create a New Club</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                    <input
                        type="text"
                        name="logo_url"
                        value={formData.logo_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Club Email</label>
                    <input
                        type="email"
                        name="club_email"
                        value={formData.club_email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">President</label>
                    <input
                        type="text"
                        name="president"
                        value={formData.president}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">President Email</label>
                    <input
                        type="email"
                        name="president_email"
                        value={formData.president_email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">President Phone</label>
                    <input
                        type="text"
                        name="president_phone"
                        value={formData.president_phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Membership Form URL</label>
                    <input
                        type="text"
                        name="membership_form_url"
                        value={formData.membership_form_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Accepting Members</label>
                    <input
                        type="checkbox"
                        name="accepting_members"
                        checked={formData.accepting_members}
                        onChange={handleChange}
                        className="mt-1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Website URL</label>
                    <input
                        type="text"
                        name="website_url"
                        value={formData.website_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Club Account ID</label>
                    <select
                        name="club_account_id"
                        value={formData.club_account_id}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.google_id} value={user.google_id}>
                                {user.email}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
                    >
                        Create Club
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateClub;

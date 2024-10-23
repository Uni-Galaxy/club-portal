import { useEffect, useState } from "react";

const AddMembers = () => {
    const [members, setMembers] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [allUsersLoading, setAllUsersLoading] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [showUserSelection, setShowUserSelection] = useState(false); // Toggle user selection table

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/clubs/members`;
                const response = await fetch(url, {
                    method: "GET",
                    headers,
                });
                const data = await response.json();
                setMembers(data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/users`;
                const response = await fetch(url, {
                    method: "GET",
                    headers,
                });
                const data = await response.json();
                setAllUsers(data);
            } catch (err) {
                console.log(err);
            } finally {
                setAllUsersLoading(false);
            }
        };
        fetchAllUsers();
    }, []);

    const handleAddMembers = async () => {
        if (selectedUsers.length === 0) return alert("Please select at least one user to add!");

        try {
            const token = localStorage.getItem("authToken");
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers['Authorization'] = token;
            }
            const url = `${import.meta.env.VITE_API_URL}/clubs/members`;
            const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify({ userIds: selectedUsers }),
            });

            if (response.ok) {
                const newMember = await response.json();
                setMembers((prevMembers) => [...prevMembers, ...newMember]);
                alert("Member(s) added successfully!");
            } else {
                throw new Error("Failed to add member(s)");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteMember = async (memberId: any) => {
        try {
            const token = localStorage.getItem("authToken");
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = token;
            }
            const url = `${import.meta.env.VITE_API_URL}/clubs/members/${memberId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers,
            });

            if (response.ok) {
                // setMembers(members.filter((member) => member.id !== memberId));
                alert("Member removed successfully!");
            } else {
                throw new Error("Failed to delete member");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const toggleUserSelection = () => {
        setShowUserSelection(!showUserSelection);
    };

    const handleUserCheckboxChange = (userId: any) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter((id) => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    if (loading || allUsersLoading) {
        return <div className="text-center text-xl font-bold">Loading...</div>;
    }

    return (
        <div className="p-6 w-screen md:w-[calc(100vw-207px)]">
            <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3 mb-6">
                <h1 className="text-slate-700 text-3xl font-bold">Add Members to Club</h1>
            </div>

            {/* Toggle button for showing/hiding user selection */}
            <button
                onClick={toggleUserSelection}
                className="bg-blue-500 text-white px-6 py-2 mb-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                {showUserSelection ? "Close User Selection" : "Show User Selection"}
            </button>

            {/* User selection table with checkboxes */}
            {showUserSelection && (
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Select</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => {
                                                handleUserCheckboxChange(user.id);
                                                console.log(user.id);
                                            }}
                                        />
                                    </td>
                                    <td className="px-4 py-2 border">{user.first_name} {user.last_name}</td>
                                    <td className="px-4 py-2 border">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={handleAddMembers}
                        className="bg-green-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Add Selected Members
                    </button>
                </div>
            )}

            {/* Display the list of existing members in a table */}
            <h2 className="text-2xl font-semibold mb-4">Current Members</h2>
            {members.length === 0 ? (
                <p className="text-gray-500">No members found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Profile Picture</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">
                                        <img
                                            src={member.profile_picture_url}
                                            alt="Profile"
                                            className="h-10 w-10 rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border">{member.first_name} {member.last_name}</td>
                                    <td className="px-4 py-2 border">{member.email}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleDeleteMember(member.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AddMembers;

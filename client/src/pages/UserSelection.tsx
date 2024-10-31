import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSelection = () => {
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allUsersLoading, setAllUsersLoading] = useState(true);
    const navation = useNavigate()

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const headers: HeadersInit = {};
                if (token) headers['Authorization'] = token;

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

    const handleUserCheckboxChange = (userId: any) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter((id) => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    const handleAddMembers = async () => {
        if (selectedUsers.length === 0) return alert("Please select at least one user to add!");

        try {
            const token = localStorage.getItem("authToken");
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            if (token) headers['Authorization'] = token;

            const url = `${import.meta.env.VITE_API_URL}/clubs/members`;
            const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify({ userIds: selectedUsers }),
            });

            if (response.ok) {
                navation("/addMembers")
                toast.success("Member added Successfully", {
                    theme: "light"
                });
            } else {
                toast.error("Fail to add Member", {
                    theme: "light"
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const filteredUsers = allUsers.filter(
        (user) =>
            user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (allUsersLoading) {
        return <div className="text-center text-xl font-bold">Loading...</div>;
    }

    return (
        <div className="p-6 w-screen md:w-[calc(100vw-207px)]">
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded-md w-full"
            />

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
                        {filteredUsers.map((user) => (
                            <tr key={user.google_id} className="hover:bg-gray-100" id={user.id}>
                                <td className="px-4 py-2 border text-center" >
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.google_id)}
                                        onChange={() => handleUserCheckboxChange(user.google_id)}
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
        </div>
    );
};

export default UserSelection;

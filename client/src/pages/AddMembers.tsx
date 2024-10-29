import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMembers = () => {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                setMembers(members.filter((member) => member.id !== memberId));
                alert("Member removed successfully!");
            } else {
                throw new Error("Failed to delete member");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const goToUserSelection = () => {
        navigate("/user-selection");
    };

    if (loading) {
        return <div className="text-center text-xl font-bold">Loading...</div>;
    }

    return (
        <div className="p-6 w-screen md:w-[calc(100vw-207px)]">
            <div className="w-full bg-[#f6f7f9] rounded-[6px] p-3 mb-6">
                <h1 className="text-slate-700 text-3xl font-bold">Manage Members</h1>
            </div>

            <button
                onClick={goToUserSelection}
                className="bg-blue-500 text-white px-6 py-2 mb-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Add New Members
            </button>

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
                                    <td className="px-4 py-2 border ">
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

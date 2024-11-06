import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUserTie, FaExternalLinkAlt } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

interface Club {
    club_id: number;
    name: string;
    description?: string;
    logo_url?: string;
    club_email: string;
    president: string;
    president_email: string;
    membership_form_url?: string;
    accepting_members: boolean;
    website_url?: string;
    created_at: string;
    updated_at: string;
}

const Club = () => {
    const [clubData, setClubData] = useState<Club | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const clubName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = token ? { 'Authorization': token } : {};
                const url = `${import.meta.env.VITE_API_URL}/clubs/${clubName}`;
                const response = await fetch(url, { method: 'GET', headers });
                if (!response.ok) throw new Error("Failed to fetch club data");

                const data = await response.json();
                setClubData(data);
            } catch (err) {
                setError("Error loading club data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClubData();
    }, [clubName]);

    if (loading) return <p className="flex justify-center items-center h-screen text-lg">Loading club data...</p>;
    if (error) return <p className="text-red-600 text-center mt-4">{error}</p>;

    return (
        <div className="flex justify-center items-center bg-gray-50 w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] p-6">
            {clubData ? (
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 md:flex md:p-8 relative">
                    <button
                        onClick={() => navigate(`/`)}
                        className="absolute top-4 left-4 flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
                    >
                        <BiArrowBack size={20} className="mr-2" />
                        Go Home
                    </button>
                    <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6 w-full mt-10">
                        <img
                            src={clubData.logo_url || "/default-logo.png"}
                            alt={`${clubData.name} Logo`}
                            className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0 md:w-40 md:h-40"
                        />
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{clubData.name}</h1>
                            <p className="text-sm text-gray-500 mb-4">
                                Founded on: {new Date(clubData.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Description:</strong> {clubData.description || "No description available"}
                            </p>
                            <div className="flex items-center text-gray-700 mb-2">
                                <FaUserTie className="mr-2 text-blue-500" size={18} />
                                <span className="font-semibold mr-1">President:</span> {clubData.president}
                            </div>
                            <div className="flex items-center text-gray-700 mb-4">
                                <FaEnvelope className="mr-2 text-blue-500" size={18} />
                                <span className="font-semibold mr-1">Email:</span> {clubData.club_email}
                            </div>

                            {clubData.website_url && (
                                <a
                                    href={clubData.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-500 mb-4"
                                >
                                    <FaExternalLinkAlt className="mr-2" size={16} />
                                    Visit Website
                                </a>
                            )}
                            {clubData.membership_form_url && (
                                <a
                                    href={clubData.membership_form_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-green-500 mb-4"
                                >
                                    <FaExternalLinkAlt className="mr-2" size={16} />
                                    Membership Form
                                </a>
                            )}
                            <div className="text-gray-600 text-sm mt-6">
                                <span>Last updated: {new Date(clubData.updated_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Club data not found.</p>
            )}
        </div>
    );
};

export default Club;

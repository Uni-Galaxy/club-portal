import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const ClubProfileEdit = () => {
    const [clubProfileData, setClubProfileData] = useState();
    const [loading, setLoading] = useState(true);
    const [clubEditData, setClubEditData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const data = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/clubs/profile`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setClubProfileData(data)
                setClubEditData(data)
                setLoading(false)

            } catch (err) {
                console.log(err);
            }
        }
        data();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClubEditData({
            ...clubEditData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        delete clubEditData.created_at
        delete clubEditData.updated_at
        delete clubEditData.president_phone
        delete clubEditData.name
        delete clubEditData.club_email
        delete clubEditData.club_account_id

        try {
            const token = localStorage.getItem('authToken');
            const headers = {};
            if (token) {
                headers['Authorization'] = token;
                headers['Content-Type'] = "application/json";
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs`, {
                method: "PATCH",
                headers,
                body: JSON.stringify(clubEditData)
            });

            if (response.ok) {
                console.log(response.ok)
                toast.success("Club Info Modify successfully!", {
                    theme: "light"
                });
                navigate("/clubProfile")
            } else {
                toast.error("Failed to Modify Club Info", {
                    theme: "light"
                });
            }

        } catch (err) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex justify-center items-center w-screen md:w-[calc(100vw-207px)] bg-gray-100 p-4 ">
            <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-5xl mx-4">
                <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Modify Club Info </h2>
                <h4 className="text-xl font-bold text-gray-600 mb-8 text-center"> {clubProfileData?.name} </h4>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <h3 className='text-xl font-bold text-gray-700'> Club Account Info </h3>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Club Logo (URL)</label>
                        <input
                            type="text"
                            name="logo_url"
                            value={clubEditData?.logo_url}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                        <div className='flex p-1 justify-center content-center items-center'>
                            <p>Get <span className='text-xl font-bold'>Direct link</span> for IMG from -= </p>
                            <button
                                type="button"
                                className="w-fit bg-indigo-600 text-white px-2 py-1 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                                onClick={() => window.open('https://postimages.org/')}
                            >
                                Get IMG Link
                            </button>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Club Description</label>
                        <textarea
                            name="description"
                            value={clubEditData?.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        ></textarea>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Club Website</label>
                        <input
                            type="text"
                            name="website_url"
                            value={clubEditData?.website_url}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    <h3 className='text-xl font-bold text-gray-700'> Club president Info </h3>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">President Name</label>
                        <input
                            type="text"
                            name="president"
                            value={clubEditData?.president}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">President Email</label>
                        <input
                            type="text"
                            name="president_email"
                            value={clubEditData?.president_email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    <h3 className='text-xl font-bold text-gray-700'> Club Membership Info </h3>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Membership From Link</label>
                        <input
                            type="text"
                            name="membership_form_url"
                            value={clubEditData?.membership_form_url}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 border-[1px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                            required
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Accepting New Members</label>
                        <div className="mt-1 flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="accepting_members"
                                    value="true"
                                    checked={clubEditData?.accepting_members === 'true'}
                                    onChange={handleChange}
                                    className="form-radio h-4 w-4 text-indigo-600"
                                />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="accepting_members"
                                    value="false"
                                    checked={clubEditData?.accepting_members === 'false'}
                                    onChange={handleChange}
                                    className="form-radio h-4 w-4 text-indigo-600"
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Modify Club Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ClubProfileEdit


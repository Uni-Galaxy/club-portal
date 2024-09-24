import { Link } from "react-router-dom"
import CoverImg from "../assets/ru_cover.jpeg";
import { useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    setIsLogin: (item: boolean) => void
    setUser: (item: string) => void
}

const HomePage = ({ setIsLogin, setUser }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")

    useEffect(() => {
        setIsLoading(true)
        if (localStorage.getItem("authToken") != null) {
            const token = localStorage.getItem("authToken")
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = token;
            }
            fetch(`${import.meta.env.VITE_API_URL}/check`, {
                method: 'GET',
                headers
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Token is valid') {
                        console.log('Token verified:', data.decoded);
                        setUser(data.decoded.google_id)
                        setIsLogin(true);
                    } else {
                        console.error('Token is invalid:', data);
                        setIsLogin(false);
                        localStorage.removeItem('authToken');
                    }
                })
                .catch(error => {
                    console.error("Error fetching check status:", error);
                    setIsLogin(false);
                });
        } else {
            setIsLoading(false)
        }
    }, [setIsLogin]);

    // Basic email validator
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleNewsletterSubmit = () => {
        if (email.trim() === "") {
            toast.error("Email address cannot be empty!", {
            });
        } else if (!validateEmail(email)) {
            toast.error("Please enter a valid email address!", {
            });
        } else {
            // Simulate newsletter sign-up logic
            toast.success("Successfully signed up for club updates and events!", {
            });
            setEmail(""); // Clear the input field after submission
        }
    }

    if (isLoading) {
        return (
            <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
                <h1>Loading..</h1>
                <DNA
                    visible={true}
                    height="50%"
                    width="50%"
                    ariaLabel="dna-loading"
                    wrapperClass="dna-wrapper"
                />
            </div>
        )
    } else {
        return (
            <div className="h-[100vh] w-[100vw] p-6 md:pt-4">
                {/* Nav */}
                <div className="w-full container mx-auto">
                    <div className="w-full flex items-center justify-between">
                        <a
                            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                            href="#"
                        >
                            Uni
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                                Galaxy
                            </span>
                        </a>
                        <div className="flex w-1/2 justify-end content-center">
                            <Link
                                className="bg-pink-500 inline-block text-blue-300 no-underline hover:text-pink-500 hover:bg-blue-300 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out rounded-xl"
                                to="/signin"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Main */}
                <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    {/* Left Col */}
                    <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                        <h1 className="my-4 text-3xl md:text-5xl text-black opacity-75 font-bold leading-tight text-center md:text-left">
                            Welcome to
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                                UniGalaxy
                            </span>
                        </h1>
                        <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                            Your one-stop portal for all club events and activities! Explore, engage, and immerse yourself in a vibrant community of students and clubs.
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleNewsletterSubmit();
                            }}
                            className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-blue-300 py-2 font-bold mb-2"
                                    htmlFor="emailaddress"
                                >
                                    Signup for the latest club updates and events
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                    id="emailaddress"
                                    type="text"
                                    placeholder="you@somewhere.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <button
                                    className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Right Col */}
                    <div className="w-full xl:w-3/5 p-12 overflow-hidden">
                        <img
                            className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
                            src={CoverImg}
                            alt="Cover"
                        />
                    </div>
                    {/* Footer */}
                    <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                        <a className="text-gray-500 no-underline hover:no-underline" href="#">
                            © September 2024
                        </a>
                        - Created by Yash Lunawat {' '}
                        <span className="text-gray-500 no-underline hover:no-underline">
                            Under - UniGalaxy Team
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;

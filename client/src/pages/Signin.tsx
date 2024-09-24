import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/Colour01.png';
import { FaGoogle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

interface Props {
    setIsLogin: (item: boolean) => void
    setUser: (item: string) => void
}

const Signin = ({ setIsLogin, setUser }: Props) => {

    const router = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
        fetch(`${import.meta.env.VITE_API_URL}/check`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Token is valid') {
                    console.log('Token verified:', data.decoded);
                    localStorage.setItem('authToken', token);
                    setUser(data.decoded.google_id)
                    setIsLogin(true);
                    router('/')
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
        setIsLogin(false);
    }

    const handleGoogleLogin = async () => {
        try {
            // Redirect to the backend Google Auth route
            window.location.href = `http://localhost:3001/auth/google`;
        } catch (error) {
            console.error(error);
            toast.error("Google login failed", {
                theme: "light"
            });
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-[100vh] w-[100vw]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-20 w-auto"
                    src={Logo}
                    alt="Rishihood University Logo"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-3 gap-2"
                    onClick={handleGoogleLogin}
                >
                    <FaGoogle />
                    Login with Google
                </button>
                <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 gap-2"
                    onClick={() => {
                        router('/');
                    }}
                >
                    <FaArrowLeft />
                    Back to Home
                </button>
            </div>
        </div>
    )
}

export default Signin;

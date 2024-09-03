import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/Colour01.png';
import { FaGoogle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

interface Props {
    setIsLogin: (item: boolean) => void
}

const Signin = ({ setIsLogin }: Props) => {

    const router = useNavigate();

    const auth = getAuth();

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            localStorage.setItem("firebaseUser", JSON.stringify(auth));
            setIsLogin(true);
            router("/");
            toast.success("Accounte Loged In Successfully!", {
                theme: "light"
            });
        } catch (error) {
            console.error(error);
            toast.error("Invalid email or password", {
                theme: "light"
            });
        }

    }
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

export default Signin
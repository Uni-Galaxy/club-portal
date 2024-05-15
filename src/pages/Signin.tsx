import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = ({setIsLogin}) => {

    const router = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const auth = getAuth();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log(result.user);
            setIsLogin(true)
            router("/")
            toast.success("Accounte created Successfully!", {
                theme: "dark"})
        } catch (error) {
            console.error(error);
        }
    }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
            setIsLogin(true)
            router("/")
        } catch (error) {
            console.error(error);
        }
    }
        return (
            <div>
                <h1>Sign In</h1>
                <input
                    type="text"
                    className=""
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="password"
                    className=""
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                /> <Link to={"/forgetpass"}>forget password ? </Link>
                <br />
                <button type="submit" onClick={handleSubmit}>Sign In</button>
                <br />
                Didn't have any account <Link to="/signup">Create new!</Link>
                <br />
                <button type="submit" onClick={handleGoogleLogin}>Login with Google</button>
            </div>
        )
    }

export default Signin
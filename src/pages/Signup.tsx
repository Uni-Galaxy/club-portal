import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {

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
            const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log(result.user);
        } catch (error) {
            console.error(error);
        }
    }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <h1>Sign Up</h1>
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
            /> 
            <br />
            <button type="submit" onClick={handleSubmit}>Create a New Account</button>
            <br />
            Already have An Account <Link to="/signin">Log In!</Link>
            <br />
            <button type="submit" onClick={handleGoogleLogin}>Create Account with Google</button>
        </div>
    )
}

export default Signup

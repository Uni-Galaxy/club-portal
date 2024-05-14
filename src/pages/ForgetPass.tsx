import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

const ForgetPass = () => {

    const [getEmail, setGetEmail] = useState("");

    const auth = getAuth();

    const sendemail = () => {
        try {const result = sendPasswordResetEmail(auth, getEmail);
        console.log(result);} 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            Enter your email:  
            <input 
            type = "email"
            name = "email"
            value = {getEmail}
            onChange = {(e) => setGetEmail(e.target.value)}
            />
            <br />
            <button onClick={sendemail}>Send Email</button>
        </div>
    )
}

export default ForgetPass
